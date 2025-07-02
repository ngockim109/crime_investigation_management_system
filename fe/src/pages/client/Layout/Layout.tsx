import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Nav from "./Nav"

const Layout = () => {
    return (
        <>
            <Header></Header>
            <Nav></Nav>

            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer></Footer>
        </>
    )
}

export default Layout