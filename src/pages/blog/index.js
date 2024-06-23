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
        filter: { frontmatter: { poem: { ne: true } } }
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
  let blog_articles = nodes.map(node => (
    <BlogListing
      key={node.frontmatter.slug}
      frontmatter={node.frontmatter}
      words={node.wordCount.words}
    />
  ))
  return (
    <Layout eventkey="blog">
      <main>
        <h2 className="page-header" style={{ textAlign: "center" }}>
          Blogs by Kat
        </h2>
        <hr style={{ margin: "1rem auto" }} />
        <section id="blogs">{blog_articles}</section>
      </main>
    </Layout>
  )
}

export const Head = () => (
  <SEO
    title="Blog"
    description="Technology, Life, and *Intriguing Stuff*"
    keywords={[`blog`, `blogs`, `technology blog`, `personal blog`, `writing`]}
  />
)

export default IndexPage
