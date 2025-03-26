import Layout from "../../components/layout"
import SEO from "../../components/seo"
import BackgroundSpace from "../../components/backgroundSpace"
import ClientOnly from "../../components/clientonly"

const SpacePage = () => {
  return (
    <Layout eventkey="space">
      <main>
        <ClientOnly>
          <BackgroundSpace />
        </ClientOnly>
      </main>
    </Layout>
  )
}

export const Head = () => (
  <SEO title="Space Art Demo" description="Powered by WebGL!" />
)

export default SpacePage
