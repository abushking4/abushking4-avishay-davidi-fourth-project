export class ConversationModel {
    conversation_id!: number;
    conversation_uuid!: string;
    title!: string;
    created_at!: Date;
}

export class NewConversationRequest {
    title!: string;
}