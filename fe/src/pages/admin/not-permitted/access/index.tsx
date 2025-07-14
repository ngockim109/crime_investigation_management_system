import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import NotPermitted from "..";

interface IProps {
    hideChildren?: boolean;
    children: React.ReactNode;
    permission: { method: string, apiPath: string, module: string };
}
const Access = (props: IProps) => {
    const { permission, hideChildren = false } = props;
    const [allow, setAllow] = useState<boolean>(true);

    const permissions = useAppSelector(state => state.account.user.role.permissions);

    useEffect(() => {
        if (permissions.length) {
            const check = permissions.find(item =>
                item.api_path === permission.apiPath
                && item.method === permission.method
                && item.module === permission.module
            )
            if (check) {
                setAllow(true)
            } else
                setAllow(false);
        }
    }, [permissions])

    return (
        <>
            {allow === true ?
                <>{props.children}</>
                :
                <>
                    {hideChildren === false ?
                        <NotPermitted />
                        :
                        <>
                            {/* render nothing */}
                        </>
                    }
                </>
            }
        </>

    )
}

export default Access;