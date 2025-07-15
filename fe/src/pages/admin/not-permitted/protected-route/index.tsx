import { useAppSelector } from "@/redux/hook";
import { Navigate } from "react-router-dom";
import NotPermitted from "..";

const RoleBaseRoute = (props: { children: React.ReactNode }) => {
    const user = useAppSelector(state => state.account.user);
    const userRole = user.role.description;

    if (userRole !== 'NORMAL_USER') {
        return (<>{props.children}</>)
    } else {
        return (<NotPermitted />)
    }
}

const ProtectedRoute = (props: { children: React.ReactNode }) => {
    const { children } = props;

    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated)
    return (
        <>
            {
                isAuthenticated === true ?
                    <>
                        <RoleBaseRoute>
                            {children}
                        </RoleBaseRoute>
                    </>
                    :
                    <Navigate to={'/auth'} replace />
            }
        </>
    )
}

export default ProtectedRoute;