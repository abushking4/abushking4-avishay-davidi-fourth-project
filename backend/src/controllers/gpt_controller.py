from typing import cast
from fastapi import APIRouter, status
from models.conversation_model import ConversationSchema
from models.message_model import MessageSchema, UserMessageRequest, SendMessageResponse
from services.gpt_service import GptService


router = APIRouter()


@router.get("/api/conversations",  response_model=list[ConversationSchema])
def get_all_conversations():
    with GptService() as gpt_service:
        conversations = gpt_service.get_all_conversations()
        return conversations


@router.get("/api/messages/{conversation_id}",  response_model=list[MessageSchema])
def get_all_messages(conversation_id: int):
    with GptService() as gpt_service:
        messages = gpt_service.get_messages_for_conversation(conversation_id)
        return messages


@router.get("/api/conversations/details/{conversation_uuid}", response_model=ConversationSchema)
def get_conversation_details(conversation_uuid: str):
    with GptService() as gpt_service:
        conversation = gpt_service.get_conversation_by_uuid(conversation_uuid)
        return conversation


@router.get("/api/conversations/messages/{conversation_uuid}", response_model=list[MessageSchema])
def get_one_conversation(conversation_uuid: str):
    with GptService() as gpt_service:
        conversation = gpt_service.get_conversation_by_uuid(conversation_uuid)
        messages = gpt_service.get_messages_for_conversation(cast(int, conversation.conversation_id))
        return messages or []


@router.post("/api/messages", status_code=status.HTTP_201_CREATED, response_model=SendMessageResponse)
def send_message(body: UserMessageRequest):
    with GptService() as gpt_service:
        conversation, assistant_message = gpt_service.process_user_message(body.conversation_id, body.message_text)
        return SendMessageResponse(
            conversation=ConversationSchema.model_validate(conversation, from_attributes=True),
            assistant_message=MessageSchema.model_validate(assistant_message, from_attributes=True),
        )


@router.post("/api/conversations", status_code=status.HTTP_201_CREATED, response_model=ConversationSchema)
def create_new_conversation(body: ConversationSchema):
    with GptService() as gpt_service:
        return gpt_service.create_new_conversation(body)
