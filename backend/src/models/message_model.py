from datetime import datetime
from typing import Optional
from sqlalchemy import Column, DateTime, Integer, String, text
from utils.dal import BaseModel
from pydantic import BaseModel as BaseSchema, Field
from models.conversation_model import ConversationSchema


class MessageSchema(BaseSchema):
    message_id: Optional[int] = None
    conversation_id: int = Field(gt=0)
    sequence_number: int = Field(gt=0)
    sender_type: int = Field(gt=0, le=3) # 1 for chat, 2 for user
    message_text: str = Field(min_length=2, max_length=20000)
    created_at: Optional[datetime] = None
    # updated_at: Optional[datetime] = None


class UserMessageRequest(BaseSchema):
    conversation_id: Optional[int] = Field(default=None, gt=0)
    message_text: str = Field(min_length=2, max_length=20000)


class SendMessageResponse(BaseSchema):
    conversation: ConversationSchema
    assistant_message: MessageSchema


class MessageModel(BaseModel):
    __tablename__ = "messages"
    message_id = Column(Integer, primary_key=True)
    conversation_id = Column(Integer, nullable=False)
    sequence_number = Column(Integer, nullable=False)
    sender_type = Column(Integer, nullable=False)
    message_text = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    # updated_at = Column(DateTime) #, default=datetime.utcnow)