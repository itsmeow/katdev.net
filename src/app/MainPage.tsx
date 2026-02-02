'use client'
import { FaBluesky, FaLink, FaEnvelope, FaLastfm } from 'react-icons/fa6'
import TraktBlack from './svg/trakt-icon-black.inline.svg'
import BackgroundSpace from '../components/BackgroundSpace.jsx'
import ClientOnly from '../components/ClientOnly.jsx'
import Dimmer from '../components/Dimmer'
import EmailPopup from '../components/EmailPopup'
import Navbar from '../components/nav/NavBar.tsx'
import Footer from '../components/Footer.tsx'
import { useState } from 'react'
import Image from 'next/image'

const MainPageContents = () => {
    const [showEmail, setShowEmail] = useState(false)
    return (
        <>
            <div>
                <Navbar />
                <div id="page-index" className="main-wrapper">
                    {showEmail && (
                        <Dimmer>
                            <EmailPopup
                                close={() => {
                                    setShowEmail(false)
                                }}
                            />
                        </Dimmer>
                    )}
                    <div className="mainpage-profile-container">
                        <ClientOnly>
                            <BackgroundSpace />
                        </ClientOnly>
                        <div className="mainpage-profile-vert">
                            <div className="mainpage-profile">
                                <div className="mainpage-profile-image">
                                    <div>
                                        <Image
                                            src="/images/picture.jpg"
                                            alt="Me"
                                            placeholder="empty"
                                            width={374}
                                            height={374}
                                        />
                                    </div>
                                </div>
                                <section className="mainpage-profile-text">
                                    <h2 className="mainpage-profile-name">
                                        KAT S
                                    </h2>
                                    <p>
                                        <span className="pronouns">
                                            they/she
                                        </span>
                                        <span className="pronouns-link">
                                            <a
                                                href="https://pronouns.org/"
                                                title="what's this?"
                                                aria-label="Pronouns (what's this?)"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                ?
                                            </a>
                                        </span>
                                    </p>
                                    <hr />
                                    <div className="socials">
                                        <div>
                                            <a
                                                href="https://bsky.app/profile/katdev.net"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Bluesky"
                                            >
                                                <FaBluesky aria-label="Instagram link" />
                                            </a>
                                        </div>
                                        <div className="separator"> • </div>
                                        <div>
                                            <button
                                                className="button-no-style"
                                                onClick={(event) => {
                                                    setShowEmail((eml) => !eml)
                                                    event.preventDefault()
                                                }}
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        setShowEmail(
                                                            (eml) => !eml
                                                        )
                                                        event.preventDefault()
                                                    }
                                                }}
                                                aria-label="Email"
                                            >
                                                <FaEnvelope aria-label="Email link" />
                                            </button>
                                        </div>
                                        <div className="separator"> • </div>
                                        <div>
                                            <a
                                                href="https://itsmeow.dev/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Brand Website"
                                            >
                                                <FaLink aria-label="Brand Website link" />
                                            </a>
                                        </div>
                                        <div className="separator"> • </div>
                                        <div>
                                            <a
                                                href="https://www.last.fm/user/katdevfm"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="LastFM"
                                            >
                                                <FaLastfm aria-label="LastFM link" />
                                            </a>
                                        </div>
                                        <div className="separator"> • </div>
                                        <div>
                                            <a
                                                href="https://trakt.tv/users/katdev"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Trakt"
                                            >
                                                <TraktBlack
                                                    viewBox="0 0 48 48"
                                                    width="1em"
                                                    height="1em"
                                                    aria-label="Trakt link"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="page-footer-index">
                <Footer />
            </div>
        </>
    )
}

export default MainPageContents
