import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { GatsbyImage } from 'gatsby-plugin-image'
import ClientOnly from '../components/ClientOnly.jsx'
import BackgroundSpace from '../components/BackgroundSpace.jsx'

const BlogTemplate = ({
    data: {
        markdownRemark: { frontmatter, html, wordCount, tableOfContents },
    },
}) => {
    let hasImage = frontmatter.image_file || frontmatter.image_svg_file
    return (
        <Layout eventkey="blog-page">
            <main>
                <ClientOnly>
                    <BackgroundSpace />
                </ClientOnly>
                <article
                    id="blog-content-wrapper"
                    className={!hasImage ? 'no-image' : ''}
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
                                    image={
                                        frontmatter.image_file.childImageSharp
                                            .gatsbyImageData
                                    }
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
                                    '<h2 id="blog-table-of-contents-title">Table of Contents</h2>' +
                                    tableOfContents,
                            }}
                        />
                    ) : (
                        <></>
                    )}
                    <div
                        className={[
                            frontmatter.mono ? 'mono' : null,
                            frontmatter.poem &&
                            frontmatter.format_poem !== false
                                ? 'poem'
                                : null,
                        ]
                            .filter((c) => c !== null)
                            .join(' ')}
                        id="blog-text"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    <div id="blog-end">
                        Written by Kat. Thank you for reading.
                    </div>
                </article>
            </main>
        </Layout>
    )
}

export const Head = ({
    data: {
        markdownRemark: { excerpt, frontmatter },
    },
}) => (
    <SEO
        title={frontmatter.title}
        description={
            frontmatter.poem && !frontmatter.description?.length
                ? excerpt
                : frontmatter.description
        }
        keywords={frontmatter.keywords
            .split(',')
            .concat(
                !frontmatter.poem
                    ? [
                          `blog`,
                          `blogs`,
                          `technology blog`,
                          `personal blog`,
                          `writing`,
                      ]
                    : [`poem`, `poetry`, `writing`, `creative writing`]
            )}
        image={frontmatter?.image_file?.publicURL}
    />
)

export const pageQuery = graphql`
    query ($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            tableOfContents
            wordCount {
                words
            }
            excerpt
            frontmatter {
                date(formatString: "MMMM D, YYYY")
                slug
                title
                header
                keywords
                description
                toc
                poem
                format_poem
                mono
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
