import { useEffect, useRef, useState } from "react";
import { MessageModel, UserMessageRequest } from "../../../Models/MessageModel";
import "./SingleConversation.css";
import { notify } from "../../../Utils/Notify";
import { service } from "../../../Services/Service";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useTitle } from "../../../Utils/UseTitle";
import { useForm } from "react-hook-form";
import { ConversationModel } from "../../../Models/ConversationModel";
import ReactMarkdown from "react-markdown";
import { Loading } from "../../SharedArea/Loading/Loading";


export function SingleConversation() {
    
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [title, setTitle] = useState<string>("");
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [conversationDetail, setConversationDetail] = useState<ConversationModel>();
    const params = useParams();
    const conversationUUID = params.conversationUUID;
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<UserMessageRequest>();
    const [isLoading, setIsLoading] = useState(false);
    useTitle(title);


    useEffect(() => {
        service.getConversationDetailsByUUID(conversationUUID!)
            .then(conversationDetails => {
                setTitle(conversationDetails.title);
                setConversationDetail(conversationDetails);
            })
            .catch(err => notify.error(err));

        service.getConversationMessagesByUUID(conversationUUID!)
            .then(messages => setMessages(messages))
            .catch(err => notify.error(err));
    }, [conversationUUID]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);


    async function send(message: UserMessageRequest) {
        try {
            setIsLoading(true);
            message.conversation_id = conversationDetail?.conversation_id!;
            messages.push({
                conversation_id: conversationDetail?.conversation_id!,
                sender_type: 2,
                sequence_number: messages.length + 1,
                message_text: message.message_text,
                created_at: new Date()
            } as MessageModel);
            setMessages([...messages]);
            setValue("message_text", "");
            await service.sendMessageAndGetResponse(message)
                .then(response => messages.push(response.assistant_message))
                .catch(err => notify.error(err));
            setMessages([...messages]);
            setIsLoading(false);
        } catch (err) {
            notify.error(err);
            console.log(err);
        }
    }

    
    return (
        <div className="SingleConversation">

            <div className="messages-container" ref={messagesContainerRef}>
                <div className="messages">
                    {messages.map((message) => (
                        <Card key={message.sequence_number} className={message.sender_type === 1 ? "chat-message" : "user-message"} sx={{ borderRadius: 6, maxWidth: "60%" }}>
                            <CardContent>
                                <div className="conversation-item">
                                    <Typography variant="h6"><ReactMarkdown>{message.message_text}</ReactMarkdown></Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(message.created_at).toLocaleString()}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {isLoading && (
                        <Card className="chat-message" sx={{ borderRadius: 6, maxWidth: "60%" }}>
                            <CardContent>
                                <Loading />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit(send)} className="input-container">
                    <TextField autoFocus placeholder="הזן פה הודעה..." fullWidth multiline maxRows={3}
                        {...register("message_text", { required: "שדה חובה", minLength: { value: 2, message: "הודעה קצרה מדי" }, maxLength: { value: 16777215, message: "הודעה ארוכה מדי" } })}
                        error={!!errors.message_text}
                        helperText={errors.message_text?.message}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(send)();
                            }
                        }}
                    />
                    <Button disabled={isLoading} type="submit" variant="contained" color={isLoading ? "secondary" : "primary"} className="send-button">שלח</Button>
                </form >
            </div>
        </div>
    );
}
