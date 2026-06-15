import { ConversationModel } from "./ConversationModel";

export class UserMessageRequest {

    conversation_id?: number;
    message_text!: string;

}

export class SendMessageResponse {
    conversation!: ConversationModel;
    assistant_message!: MessageModel;
}

export class MessageModel {
    message_id!: number;
    conversation_id!: number;
    sequence_number!: number;
    sender_type!: number;
    message_text!: string;
    created_at!: Date;
}