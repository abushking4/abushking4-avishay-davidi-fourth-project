import { useNavigate } from "react-router-dom";
import "./Page404.css";
import { useTitle } from "../../../Utils/UseTitle";

export function Page404() {
    useTitle("404");


    const navigate = useNavigate();
    return (
        <div className="Page404">

            <h1>404</h1>
            <h2>אופס! הדף לא נמצא :(</h2>
            <p>נראה שהגעת לדף שלא קיים.</p>

            <button onClick={() => navigate("/about")}>
                אני רוצה לקרוא קצת על אודות האתר.....
            </button>

        </div>
    );


}
