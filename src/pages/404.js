import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <Layout eventkey="404">
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "50vh",
      }}
    >
      <h1>Error 404: Page not found</h1>
      <Link to="/" className="link-no-style">
        <button>Take me home!</button>
      </Link>
      <button
        style={{ margin: "10px" }}
        onClick={() => {
          if (typeof window !== "undefined") {
            window.history.back()
          }
        }}
      >
        Go back to my last page!
      </button>
    </main>
  </Layout>
)

export const Head = () => (
  <SEO title="404" description="The page linked doesn't exist!" image="/" />
)

export default NotFoundPage
