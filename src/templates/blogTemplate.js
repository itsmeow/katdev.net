import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

const BlogTemplate = ({
  data: {
    markdownRemark: { frontmatter, html, wordCount, tableOfContents },
  },
}) => {
  let hasImage = frontmatter.image_file || frontmatter.image_svg_file
  return (
    <Layout eventkey="blog-page">
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.keywords
          .split(",")
          .concat([
            `blog`,
            `blogs`,
            `technology blog`,
            `personal blog`,
            `writing`,
          ])}
        image={frontmatter?.image_file?.publicURL}
      />
      <main>
        <article
          id="blog-content-wrapper"
          className={!hasImage ? "no-image" : ""}
        >
          <div id="blog-top">
            {hasImage ? (
              frontmatter.image_svg_file ? (
                <img
                  id="blog-image"
                  src={frontmatter.image_svg_file.publicURL}
                  alt={frontmatter.image_alt}
                  width={128}
                  height={128}
                />
              ) : (
                <GatsbyImage
                  id="blog-image"
                  image={frontmatter.image_file.childImageSharp.gatsbyImageData}
                  alt={frontmatter.image_alt}
                />
              )
            ) : (
              <></>
            )}
            <div id="blog-info">
              <h1 id="blog-title">{frontmatter.header}</h1>
              <div id="blog-meta">
                {frontmatter.date} - {wordCount.words} words
              </div>
            </div>
          </div>
          <hr />
          {frontmatter.toc ? (
            <div
              id="blog-table-of-contents"
              dangerouslySetInnerHTML={{
                __html:
                  '<h2 style="margin-top:0;font-size:1.25rem;">Table of Contents</h2>' +
                  tableOfContents,
              }}
            />
          ) : (
            <></>
          )}
          <div id="blog-text" dangerouslySetInnerHTML={{ __html: html }} />
          <div id="blog-end">Written by Wyatt. Thank you for reading.</div>
        </article>
      </main>
    </Layout>
  )
}
export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      tableOfContents
      wordCount {
        words
      }
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        slug
        title
        header
        keywords
        description
        toc
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
    }
  }
`

export default BlogTemplate
