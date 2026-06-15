import { useEffect, useState } from "react";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import { useNavigate } from "react-router-dom";
import "./ConversationHistory.css";
import { service } from "../../../Services/Service";
import { ConversationModel } from "../../../Models/ConversationModel";
import { Card, CardContent, Typography } from "@mui/material";


export function ConversationHistory() {

    useTitle("הסטוריית שיחות");
    const navigate = useNavigate();
    const [conversations, setConversations] = useState<ConversationModel[]>([]);

    useEffect(() => {
        service.getAllConversations()
            .then(conversations => setConversations(conversations))
            .catch(err => notify.error(err));
    }, []);

    const sortedConversations = [...conversations].sort((b, a) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <div className="ConversationHistory">

            {sortedConversations.map((conversation) => (
                <Card key={conversation.conversation_uuid} className="conversation-card" sx={{ borderRadius: 6 }}>
                    <CardContent>
                        <div className="conversation-item" onClick={() => navigate("/conversations/" + conversation.conversation_uuid)}>
                            <Typography variant="h6">{conversation.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {new Date(conversation.created_at).toLocaleString()}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            ))}

        </div>
    );
}
