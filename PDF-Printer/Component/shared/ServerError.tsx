import * as React from "react";

interface ServerErrorProps{
    message?:string
}

export function ServerError(props:ServerErrorProps) {
    return (
        <div className="error ">
            {props.message || "Server Error Occurs !"}
        </div>
    )
}