import { Skeleton } from "@mui/material";
import "./Loading.css";

export function Loading() {
    return (
        <div className="Loading">

            <Skeleton variant="text" width={210} />

        </div>
    );
}
