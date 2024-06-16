import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import BlogListing from "../../components/blogListing"

const IndexPage = () => {
  let {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { poem: { eq: true } } }
      ) {
        nodes {
          frontmatter {
            slug
            title
            description
            date
            image_svg_file {
              publicURL
            }
            image_file {
              childImageSharp {
                gatsbyImageData(
                  width: 128
                  height: 128
                  quality: 90
                  layout: FIXED
                  placeholder: BLURRED
                )
              }
            }
            image_alt
          }
          wordCount {
            words
          }
        }
      }
    }
  `)
  let poem_list = nodes.map(node => (
    <BlogListing
      key={node.frontmatter.slug}
      frontmatter={node.frontmatter}
      words={node.wordCount.words}
      poem
    />
  ))
  return (
    <Layout eventkey="poems">
      <SEO
        title="Poems"
        description="A collection of poetry, mostly introspective. Have a nice visit."
        keywords={[`poetry`, `writing`, `poems`, `creative writing`]}
      />
      <main>
        <h2 className="page-header" style={{ textAlign: "center" }}>
          Poems by Kat
        </h2>
        <hr style={{ margin: "1rem auto" }} />
        <section id="poems">{poem_list}</section>
      </main>
    </Layout>
  )
}

export default IndexPage
