from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime, text
from utils.dal import BaseModel
from pydantic import BaseModel as BaseSchema, Field


class ConversationSchema(BaseSchema):
    conversation_id: Optional[int] = None
    conversation_uuid: Optional[str] = None
    title: str = Field(min_length=3, max_length=40)
    created_at: Optional[datetime] = None



class ConversationModel(BaseModel):
    __tablename__ = "conversations"
    conversation_id = Column(Integer, primary_key=True)
    conversation_uuid = Column(String, nullable=False, server_default=text('uuid()'))
    title = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=text('CURRENT_TIMESTAMP'))