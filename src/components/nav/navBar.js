import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import NavItem from "./navItem.js"
import usePageScrolled from "../../hooks/usePageScrolled"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import infinity from "../../data/infinity.svg"
import icon_square from "../../data/icon_square.svg"

const CustomNavbar = ({ eventkey }) => {
  const { width } = useWindowDimensions()
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
        {width < 365 ? (
          <img
            src={icon_square}
            alt="rainbow infinity (square) wyattdev.net"
            height={42}
          />
        ) : (
          <>
            <img src={infinity} alt="rainbow infinity" height={50} />{" "}
            wyattdev.net
          </>
        )}
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
          <NavItem to="https://itsmeow.dev/" external>
            Brand Website
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
