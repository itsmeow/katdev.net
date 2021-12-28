import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import { FaInstagram, FaLink, FaEnvelope, FaLastfm } from "react-icons/fa"
import BackgroundSlider from "../components/slider"

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
      <SEO
        title="wyattdev.net"
        rawTitle
        keywords={[
          `developer`,
          `software`,
          `technology`,
          `wyatt`,
          `Wyatt S`,
          `wyattdev`,
          `dev`,
        ]}
      />
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
                <h1>Wyatt S</h1>
                <p>
                  <span
                    style={{
                      position: "relative",
                      left: "0.28rem",
                      fontWeight: "bold",
                    }}
                  >
                    they/them{" "}
                    <a
                      href="https://www.mypronouns.org/"
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
                <p>
                  Human, Software Developer, Tech Enthusiast, Learner, Advocate
                </p>

                <p className="socials">
                  <a
                    href="https://www.instagram.com/wyatt.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram aria-label="Instagram link" />
                  </a>{" "}
                  -{" "}
                  <a href="mailto:wyatt@wyattdev.net" aria-label="Email">
                    <FaEnvelope aria-label="Email link" />
                  </a>{" "}
                  -{" "}
                  <a
                    href="https://itsmeow.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Brand Website"
                  >
                    <FaLink aria-label="Brand Website link" />
                  </a>{" "}
                  -{" "}
                  <a
                    href="https://www.last.fm/user/wyattdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LastFM"
                  >
                    <FaLastfm aria-label="LastFM link" />
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage
