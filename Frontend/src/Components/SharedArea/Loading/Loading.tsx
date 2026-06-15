import { Skeleton } from "@mui/material";
import "./Loading.css";
// import spinner from "../../../assets/images/spinner.gif";

export function Loading() {
    return (
        <div className="Loading">

            <Skeleton variant="text" width={210} />
            {/* 
            <br /> 
            <Skeleton variant="circular" width={40} height={40} />
            <br /> 
            <Skeleton variant="rectangular" width={210} height={60} />
            <br />
            <Skeleton variant="rounded" width={210} height={60} />
            <br />
            <img src={spinner} /> */}


        </div>
    );
}
