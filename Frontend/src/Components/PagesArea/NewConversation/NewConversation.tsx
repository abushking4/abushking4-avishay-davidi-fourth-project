import { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import "./NewConversation.css";
import { UserMessageRequest } from "../../../Models/MessageModel";
import { useForm } from "react-hook-form";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../Utils/UseTitle";
import { service } from "../../../Services/Service";
import { Loading } from "../../SharedArea/Loading/Loading";

export function NewConversation() {

    useTitle("שיחה חדשה");
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserMessageRequest>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function send(message: UserMessageRequest) {
        try {
            setIsLoading(true);
            setValue("message_text", "");
            const response = await service.sendMessageAndGetResponse({ message_text: message.message_text });
            const conversationUuid = String(response.conversation.conversation_uuid);
            navigate("/conversations/" + conversationUuid);
        } catch (err) {
            setIsLoading(false);
            notify.error(err);
        }
    }


    return (
        <div className="NewConversation">


            <div className="heading-container" >
                {!isLoading && (
                    <Card className="chat-message" sx={{ borderRadius: 6, maxWidth: "60%" }}>
                        <CardContent>
                            <h1>שלום איך אפשר לעזור לך היום?</h1>
                        </CardContent>
                    </Card>
                )}

                {isLoading && (
                    <Card className="chat-message" sx={{ borderRadius: 6, maxWidth: "60%" }}>
                            <CardContent>
                                <h2>רק רגע....</h2>
                                <Loading />
                            </CardContent>
                        </Card>
                )}

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
