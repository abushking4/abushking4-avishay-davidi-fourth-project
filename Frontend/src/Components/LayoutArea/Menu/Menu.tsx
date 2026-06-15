import { useNavigate } from "react-router-dom";
import "./Menu.css";
import { Button } from "@mui/material";

export function Menu() {

    const navigate = useNavigate();


    return (
        <div className="Menu">
			<Button variant="contained" onClick={() => navigate("/new-conversation")}>שיחה חדשה</Button>
			<Button variant="contained" onClick={() => navigate("/conversations-history")}>היסטוריית שיחות</Button>
            <Button variant="contained" onClick={() => navigate("/about")}>אודות</Button>
        </div>
    );
}
