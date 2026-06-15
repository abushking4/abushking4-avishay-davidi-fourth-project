from typing import cast
from fastapi import HTTPException, status
from openai import OpenAI
from sqlalchemy import func, text
from models.conversation_model import ConversationModel, ConversationSchema
from models.message_model import MessageModel, MessageSchema
from models.user_enum import UserEnum
from utils.app_config import AppConfig
from utils.dal import dal


class GptService:

    def __init__(self) -> None:
        self.session = dal.create_session()
        # print("Session opened")

    def create_new_conversation(self, conversation_schema: ConversationSchema):
        # Ensure title fits DB column: truncate to 40 (schema) and fallback if DB rejects
        title = (conversation_schema.title or "").strip()[:40]
        conversation_schema.title = title
        conversation = ConversationModel(**conversation_schema.model_dump())
        from sqlalchemy.exc import DataError
        try:
            self.session.add(conversation)
            self.session.commit()
        except DataError:
            # DB column may be shorter than 40; retry with a shorter truncated title
            self.session.rollback()
            short_title = title[:20]
            conversation.title = short_title  # type: ignore
            self.session.add(conversation)
            self.session.commit()
        self.session.refresh(conversation)
        return conversation

    def generate_conversation_title(self, user_text: str) -> str:
        # Mock mode: simple deterministic title
        if AppConfig.chat_mock_mode:
            t = user_text.strip()[:40]
            if len(t) < 3:
                return "שיחה חדשה"
            return t

        api_key = AppConfig.api_key.strip()
        if not api_key:
            raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, "Chat API is not configured. Set a valid API_KEY or enable CHAT_MOCK_MODE.")
        try:
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "Provide a short title (3-40 characters) for a conversation based on the user's message. Return only the title."},
                    {"role": "user", "content": user_text},
                ],
            )
            content = response.choices[0].message.content
            if not content:
                raise HTTPException(status.HTTP_502_BAD_GATEWAY, "Title generation returned an empty response.")
            title = content.strip()[:40]
            if len(title) < 3:
                raise HTTPException(status.HTTP_502_BAD_GATEWAY, "Generated title too short.")
            return title
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(status.HTTP_502_BAD_GATEWAY, "Title generation failed. Please try again later.")

    def process_user_message(self, conversation_id: int | None, user_text: str) -> tuple[ConversationModel, MessageModel]:
        # If no conversation_id provided, create a new conversation with generated title
        if conversation_id is None:
            title = self.generate_conversation_title(user_text)
            conversation = self.create_new_conversation(ConversationSchema(title=title))
            conversation_id = conversation.conversation_id # type: ignore
        else:
            if not self.session.get(ConversationModel, conversation_id):
                raise HTTPException(status.HTTP_404_NOT_FOUND, "Sorry):\nThis conversation not found")
            conversation = self.session.get(ConversationModel, conversation_id)

        max_seq = (
            self.session.query(func.max(MessageModel.sequence_number))
            .filter(MessageModel.conversation_id == conversation_id)
            .scalar()
        )
        seq = (max_seq or 0) + 1

        user_message = MessageModel(
            conversation_id=conversation_id,
            sequence_number=seq,
            sender_type=UserEnum.user,
            message_text=user_text,
        )
        self.session.add(user_message)
        self.session.flush()

        db_messages = self.get_messages_for_conversation(conversation_id) # type: ignore
        openai_messages = self.build_openai_messages(db_messages)
        reply_text = self.call_openai(openai_messages)

        chat_message = MessageModel(
            conversation_id=conversation_id,
            sequence_number=seq + 1,
            sender_type=UserEnum.chat,
            message_text=reply_text,
        )
        self.session.add(chat_message)
        self.session.commit()
        self.session.refresh(chat_message)
        return conversation, chat_message

    def get_all_conversations(self):
        return self.session.query(ConversationModel).all()

    def get_one_conversation(self, conversation_uuid: str):
        statement = text(
            """
            select c.conversation_id, c.conversation_uuid, m.*
            from conversations as c
            inner join messages as m
            on c.conversation_id=m.conversation_id
            where c.conversation_uuid = :conversation_uuid
            order by m.sequence_number
            """
        )
        result = self.session.execute(statement, {"conversation_uuid": conversation_uuid})
        db_conversation = result.mappings().all()
        # db_conversation = self.session.get(ConversationModel, conversation_uuid)
        if not db_conversation: raise HTTPException(status.HTTP_404_NOT_FOUND, "Sorry):\nThis conversation not found")
        return db_conversation

    def get_conversation_by_uuid(self, conversation_uuid: str) -> ConversationModel:
        conversation = (self.session.query(ConversationModel).filter(ConversationModel.conversation_uuid == conversation_uuid).first())
        if not conversation:  raise HTTPException(status.HTTP_404_NOT_FOUND, "Sorry):\nThis conversation not found")
        return conversation

    def get_messages_for_conversation(self, conversation_id: int) -> list[MessageModel]:
        return (self.session.query(MessageModel).filter(MessageModel.conversation_id == conversation_id).order_by(MessageModel.sequence_number).all())

    def get_conversation_title_by_uuid(self, conversation_uuid: str) -> str:
        conversation = self.get_conversation_by_uuid(conversation_uuid)
        return conversation.conversation_title

#   openai related functions
    def build_openai_messages(self, db_messages: list[MessageModel]) -> list[dict[str, str]]:
        openai_messages: list[dict[str, str]] = []
        for msg in db_messages:
            sender_type = cast(int, msg.sender_type)
            if sender_type == UserEnum.user: role = "user"
            elif sender_type == UserEnum.chat: role = "assistant"
            else: continue
            openai_messages.append({"role": role, "content": str(msg.message_text)})
        return openai_messages

    def call_openai(self, messages: list[dict[str, str]]) -> str:
        if AppConfig.chat_mock_mode: return AppConfig.mock_reply

        api_key = AppConfig.api_key.strip()
        if not api_key: # or api_key == "JBHBIJB":
            raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, "Chat API is not configured. Set a valid API_KEY or enable CHAT_MOCK_MODE.",)

        try:
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,  # type: ignore[arg-type]
            )
            content = response.choices[0].message.content
            if not content: raise HTTPException(status.HTTP_502_BAD_GATEWAY, "Chat API returned an empty response.")
            return content
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(status.HTTP_502_BAD_GATEWAY, "Chat API request failed. Please try again later.")


#   close session
    def close(self):
        self.session.close()
        # print("Session Closed")

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        self.close()
