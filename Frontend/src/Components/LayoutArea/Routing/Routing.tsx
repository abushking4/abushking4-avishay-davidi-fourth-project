import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "../../PagesArea/About/About";
import { NewConversation } from "../../PagesArea/NewConversation/NewConversation";
import { ConversationHistory } from "../../PagesArea/ConversationHistory/ConversationHistory";
import { Page404 } from "../../PagesArea/Page404/Page404";
import { SingleConversation } from "../../PagesArea/SingleConversation/SingleConversation";
import "./Routing.css";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/new-conversation" />} />
            <Route path="/about" element={<About />} />
            <Route path="/new-conversation" element={<NewConversation />} />
            <Route path="/conversations-history" element={<ConversationHistory />} />
            <Route path="/conversations/:conversationUUID" element={<SingleConversation />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
