import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import { FaInstagram, FaLink, FaEnvelope, FaLastfm } from "react-icons/fa"
import TraktBlack from "../data/svg/trakt-icon-black.inline.svg"
import BackgroundSpace from "../components/backgroundSpace"
import ClientOnly from "../components/clientonly"

const IndexPage = () => {
  return (
    <Layout eventkey="index">
      <main>
        <div className="mainpage-profile-container">
          <ClientOnly>
            <BackgroundSpace />
          </ClientOnly>
          <div className="mainpage-profile-vert">
            <div className="mainpage-profile">
              <div className="mainpage-profile-image">
                <StaticImage
                  src="./../data/picture.jpg"
                  layout="constrained"
                  alt="Me"
                  placeholder="none"
                  aspectRatio={1}
                />
              </div>
              <section className="mainpage-profile-text">
                <h2 className="mainpage-profile-name">KAT S</h2>
                <p>
                  <span className="pronouns">they/she</span>
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
                      href="https://www.instagram.com/kat.main/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <FaInstagram aria-label="Instagram link" />
                    </a>
                  </div>
                  <div className="seperator"> • </div>
                  <div>
                    <a href="mailto:kat@katdev.net" aria-label="Email">
                      <FaEnvelope aria-label="Email link" />
                    </a>
                  </div>
                  <div className="seperator"> • </div>
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
                  <div className="seperator"> • </div>
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
                  <div className="seperator"> • </div>
                  <div>
                    <a
                      href="https://trakt.tv/users/katdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Trakt"
                    >
                      <TraktBlack
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
      </main>
    </Layout>
  )
}

export const Head = () => (
  <SEO
    title="katdev.net"
    rawTitle
    keywords={[
      `developer`,
      `software`,
      `technology`,
      `kat`,
      `Kat S`,
      `katdev`,
      `dev`,
    ]}
  />
)

export default IndexPage
