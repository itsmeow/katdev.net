import { Navbar, Nav } from "react-bootstrap"
import NavItem from "./navItem.js"
import usePageScrolled from "../../hooks/usePageScrolled"
import Infinity from "../../data/svg/infinity.inline.svg"
import IconSquare from "../../data/svg/icon_square.inline.svg"

const CustomNavbar = ({ eventkey }) => {
  const scrolled = usePageScrolled()
  return (
    <Navbar
      fixed="top"
      variant="dark"
      expand="md"
      id="site-navbar"
      className={scrolled ? "scrolled" : ""}
    >
      <Navbar.Brand className="navbar-brand">
        <div className="navbar-brand-large">
          <Infinity alt="rainbow infinity" height={50} width={50} /> katdev.net
        </div>
        <div className="navbar-brand-small">
          <IconSquare
            alt="rainbow infinity (square) katdev.net"
            height={42}
            width={42}
          />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto w-100" activeKey={eventkey}>
          <NavItem to="/" eventkey="index">
            Home
          </NavItem>
          <NavItem to="/blog" eventkey="blog">
            Blog
          </NavItem>
          <NavItem to="/poems" eventkey="poems">
            Poems
          </NavItem>
          <NavItem to="https://itsmeow.dev/" external>
            Brand Website
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
