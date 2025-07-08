import { Outlet } from "react-router-dom"
import Nav from "./Nav"
import Header from "./Header"
import Footer from "./Footer"

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Nav></Nav>

      <div className="min-h-400">
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  )
}

export default Layout
