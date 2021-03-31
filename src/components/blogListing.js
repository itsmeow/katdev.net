import { format } from "date-fns"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const BlogListing = ({ frontmatter, words }) => {
  let hasImage = frontmatter.image || frontmatter.image_svg
  return (
    <Link
      to={`/blog/${frontmatter.slug}`}
      className="blog-listing-wrapper link-unstyle"
    >
      <article
        className={`blog-listing${hasImage ? " blog-listing-with-image" : ""}`}
      >
        {hasImage ? (
          frontmatter.image_svg ? (
            <img
              className="blog-image"
              src={frontmatter.image_svg.publicURL}
              alt={frontmatter.image_alt}
              width={128}
              height={128}
            />
          ) : (
            <GatsbyImage
              className="blog-image"
              image={frontmatter.image.childImageSharp.gatsbyImageData}
              alt={frontmatter.image_alt}
            />
          )
        ) : (
          <></>
        )}
        <div className="blog-info">
          <h3 className="blog-title">{frontmatter.title}</h3>
          <hr className="title-hr" />
          <p className="blog-description">{frontmatter.description}</p>
          <div className="blog-meta">
            {format(Date.parse(frontmatter.date), "EEEE, MMMM io, yyyy")} -{" "}
            {words} words
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogListing
