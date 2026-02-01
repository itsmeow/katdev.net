import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import NavItem from "./navItem.js"
import usePageScrolled from "../../hooks/usePageScrolled"
import Infinity from "../../data/svg/infinity.inline.svg"
import IconSquare from "../../data/svg/icon_square.inline.svg"
import { FaBars, FaX } from "react-icons/fa6"

const NavItems = ({ activekey }) => {
  return (
    <>
      <NavItem activekey={activekey} path="/" name="Home" eventkey="index" />
      <NavItem
        activekey={activekey}
        path="/poems"
        name="Poems"
        eventkey="poems"
      />
      <NavItem activekey={activekey} path="/art" name="Art" eventkey="art" />
      <NavItem activekey={activekey} path="/blog" name="Blog" eventkey="blog" />
      <NavItem
        activekey={activekey}
        path="https://itsmeow.dev/"
        name="Brand Website"
        external
      />
    </>
  )
}

const Navbar = ({ eventkey }) => {
  const scrolled = usePageScrolled()
  return (
    <Disclosure
      as="nav"
      className={scrolled ? "scrolled" : ""}
      role="navigation"
      id="site-navbar"
    >
      {({ open }) => (
        <>
          <div className="navbar-nav">
            <div className="navbar-brand">
              <div className="navbar-brand-large">
                <Infinity
                  viewBox="0 0 264.58 264.58"
                  alt="rainbow infinity"
                  height={50}
                  width={50}
                />{" "}
                katdev.net
                <span className="navbar-brand-terminal">_</span>
              </div>
              <div className="navbar-brand-small">
                <IconSquare
                  alt="rainbow infinity (square) katdev.net"
                  height={42}
                  width={42}
                />
              </div>
            </div>
            <ul className="navbar-items navbar-items-desktop">
              <NavItems activekey={eventkey} />
            </ul>
            <DisclosureButton className="navbar-toggle">
              <span className="sr-only">Open navigation menu</span>
              {open ? <FaX /> : <FaBars />}
            </DisclosureButton>
          </div>
          <DisclosurePanel className="navbar-mobile-panel">
            <ul className="navbar-items navbar-items-mobile">
              <NavItems activekey={eventkey} />
            </ul>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
