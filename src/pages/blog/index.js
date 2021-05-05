import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import BlogListing from "../../components/blogListing"

const IndexPage = () => {
  let {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
      <SEO
        title="Blog"
        description="Technology, Life, and *Intruiging Stuff*"
        keywords={[
          `blog`,
          `blogs`,
          `technology blog`,
          `personal blog`,
          `writing`,
        ]}
      />
      <main>
        <h2 align="center">Blogs by Wyatt</h2>
        <hr />
        <section id="blogs">{blog_articles}</section>
      </main>
    </Layout>
  )
}

export default IndexPage
