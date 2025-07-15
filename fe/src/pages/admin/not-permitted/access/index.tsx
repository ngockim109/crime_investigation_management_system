import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import AccessDenied from "..";

interface IPermission {
  method: string;
  apiPath: string;
  module: string;
}

interface IProps {
  hideChildren?: boolean;
  children: React.ReactNode;
  permission: IPermission | IPermission[];
}

const Access = (props: IProps) => {
  const { permission, hideChildren = false } = props;
  const [allow, setAllow] = useState<boolean>(false);
  const permissions = useAppSelector(state => state.account.user.role.permissions);

  useEffect(() => {
    if (permissions?.length) {
      const check = Array.isArray(permission)
        ? permission.some(p =>
            permissions.some(item =>
              item.api_path === p.apiPath &&
              item.method === p.method &&
              item.module === p.module
            )
          )
        : permissions.some(item =>
            item.api_path === permission.apiPath &&
            item.method === permission.method &&
            item.module === permission.module
          );

      setAllow(check);
    }
  }, [permissions, permission]);

  return (
    <>
      {allow ? (
        <>{props.children}</>
      ) : hideChildren ? (
        <></>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default Access;
