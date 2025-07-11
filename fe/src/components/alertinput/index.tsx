import { CircleAlert } from "lucide-react";
import React, { memo, useEffect } from "react"
import { toast } from "react-toastify";

const AlertInput = (p: { children: React.JSX.Element, curkey: string, alertKey: string, describe: string }) => {
    useEffect(() => {

        if (p.curkey == p.alertKey) {
            toast.error(p.describe)
        }
        return () => {

        };
    }, [p.curkey, p.alertKey]);
    return (
        <span className="relative ">
            {p.children}
            {p.curkey == p.alertKey ?
                <p className="absolute top-1/2 -translate-y-1/2 right-0">
                    <CircleAlert size={14} fill="red" />
                </p> : <></>
            }
        </span>
    )
}

export default memo(AlertInput)