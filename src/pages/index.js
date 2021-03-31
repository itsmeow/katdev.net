import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import { FaInstagram, FaLink, FaEnvelope } from "react-icons/fa"
import BackgroundSlider from "../components/slider"
import useWindowDimensions from "../hooks/useWindowDimensions"
import ClientOnly from "../components/clientonly"

const IndexPage = () => {
  const { height, width } = useWindowDimensions()
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
  let ratio = width / height
  if (ratio === NaN) {
    ratio = 2
  }
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
          <ClientOnly>
            {ratio >= 1.6 ? (
              <>
                <BackgroundSlider
                  style={{
                    height: "100vh",
                  }}
                  alt="background"
                  query={data}
                  duration={20}
                  transition={5}
                />
                <p id="picture-credit">Photo Credit: self</p>
              </>
            ) : (
              <></>
            )}
          </ClientOnly>
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
                <hr />
                <p>
                  Human, Software Developer, Tech Enthusiast, Learner, Advocate
                </p>
                <p className="socials">
                  <a
                    href="https://www.instagram.com/wyatt.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>{" "}
                  -{" "}
                  <a href="mailto:wyatt@wyattdev.net">
                    <FaEnvelope />
                  </a>{" "}
                  -{" "}
                  <a
                    href="https://itsmeow.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLink />
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
