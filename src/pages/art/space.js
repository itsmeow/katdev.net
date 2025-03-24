import Layout from "../../components/layout"
import SEO from "../../components/seo"
import BackgroundSpace from "../../components/backgroundSpace"

const SpacePage = () => {
  return (
    <Layout eventkey="space">
      <main>
        <BackgroundSpace />
      </main>
    </Layout>
  )
}

export const Head = () => (
  <SEO title="Space Art Demo" description="Powered by WebGL!" />
)

export default SpacePage
