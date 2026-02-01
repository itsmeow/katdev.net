import Footer from "./footer"
import Navbar from "./nav/navBar"

const Layout = ({ eventkey, children }) => {
  return (
    <>
      <div id={`page-${eventkey}`}>
        <Navbar eventkey={eventkey} />
        <div className="main-wrapper">{children}</div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
