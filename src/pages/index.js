import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import { FaInstagram, FaLink, FaEnvelope, FaLastfm } from "react-icons/fa"
import BackgroundSlider from "../components/slider"
import TraktBlack from "../data/svg/trakt-icon-black.inline.svg"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      backgrounds: allFile(filter: { relativeDirectory: { eq: "bgs" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
          }
        }
      }
    }
  `)
  return (
    <Layout eventkey="index">
      <main>
        <div className="mainpage-profile-container">
          <div className="background-slider">
            <BackgroundSlider
              alt="background"
              query={data}
              duration={20}
              transition={5}
            />
          </div>
          <div className="mainpage-profile-vert">
            <div className="mainpage-profile">
              <div className="mainpage-profile-image">
                <StaticImage
                  src="./../data/picture.jpg"
                  layout="constrained"
                  alt="Me"
                />
              </div>
              <section className="mainpage-profile-text">
                <h1>Kat S</h1>
                <p>
                  <span
                    style={{
                      position: "relative",
                      left: "0.28rem",
                      fontWeight: "bold",
                    }}
                  >
                    they/she{" "}
                    <a
                      href="https://pronouns.org/"
                      style={{
                        position: "relative",
                        top: "5px",
                        fontSize: "0.6rem",
                      }}
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
                <p>Human, Software Developer, Queer, Your Local Autistic</p>

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
