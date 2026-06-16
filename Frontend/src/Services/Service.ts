import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { ConversationModel, NewConversationRequest } from "../Models/ConversationModel";
import { MessageModel, SendMessageResponse, UserMessageRequest } from "../Models/MessageModel";


class Service {

    public async getAllConversations(): Promise<ConversationModel[]> {
        const response = await axios.get<ConversationModel[]>(appConfig.conversationsUrl);
        return response.data;
    }

    public async getConversationDetailsByUUID(conversationUUID: string): Promise<ConversationModel> {
        const response = await axios.get<ConversationModel>(appConfig.conversationsUrl + `/details/${conversationUUID}`);
        return response.data;
    }

    public async getConversationMessagesByUUID(conversationUUID: string): Promise<MessageModel[]> {
        const response = await axios.get<MessageModel[]>(appConfig.conversationsUrl + `/messages/${conversationUUID}`);
        return response.data;
    }

    public async sendMessageAndGetResponse(message: UserMessageRequest): Promise<SendMessageResponse> {
        const response = await axios.post<SendMessageResponse>(appConfig.messagesUrl, message);
        return response.data;
    }

    public async addNewConversation(newConversation: NewConversationRequest): Promise<ConversationModel> {
        const dbConversationData = await axios.post<ConversationModel>(appConfig.conversationsUrl, newConversation)
        return dbConversationData.data;
    }
}

export const service = new Service();
