'use client'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import NavItem from './NavItem.tsx'
import usePageScrolled from '../../hooks/usePageScrolled.js'
import InfinitySvg from '../../app/svg/infinity.inline.svg'
import IconSquare from '../../app/svg/icon_square.inline.svg'
import { FaBars, FaX } from 'react-icons/fa6'

const NavItems = () => {
    return (
        <>
            <NavItem path="/" name="Home" />
            <NavItem path="/poems" name="Poems" />
            <NavItem path="/art" name="Art" />
            <NavItem path="/blog" name="Blog" />
            <NavItem
                path="https://itsmeow.dev/"
                name="Brand Website"
                external
            />
        </>
    )
}

const Navbar = () => {
    const scrolled = usePageScrolled()
    return (
        <Disclosure
            as="nav"
            className={scrolled ? 'scrolled' : ''}
            role="navigation"
            id="site-navbar"
        >
            {({ open }) => (
                <>
                    <div className="navbar-nav">
                        <div className="navbar-brand">
                            <div className="navbar-brand-large">
                                <InfinitySvg
                                    viewBox="0 0 264.58 264.58"
                                    alt="rainbow infinity"
                                    height={50}
                                    width={50}
                                />{' '}
                                katdev.net
                                <span className="navbar-brand-terminal">_</span>
                            </div>
                            <div className="navbar-brand-small">
                                <IconSquare
                                    alt="rainbow infinity (square) katdev.net"
                                    height={42}
                                    width={42}
                                    viewBox="0 0 264.58 264.58"
                                />
                            </div>
                        </div>
                        <ul className="navbar-items navbar-items-desktop">
                            <NavItems />
                        </ul>
                        <DisclosureButton className="navbar-toggle">
                            <span className="sr-only">
                                Open navigation menu
                            </span>
                            {open ? <FaX /> : <FaBars />}
                        </DisclosureButton>
                    </div>
                    <DisclosurePanel className="navbar-mobile-panel">
                        <ul className="navbar-items navbar-items-mobile">
                            <NavItems />
                        </ul>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar
