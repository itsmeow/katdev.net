import { format } from "date-fns"
import { GatsbyImage } from "gatsby-plugin-image"
import GenericListing from "./genericListing"

const BlogListing = ({ frontmatter, words, poem }) => {
  let hasImage = frontmatter.image_file || frontmatter.image_svg_file
  let dt = new Date(frontmatter.date)
  dt = dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000 // cancel out timezone differences
  return (
    <GenericListing
      linkTo={`/${poem ? "poem" : "blog"}/${frontmatter.slug}`}
      image={
        hasImage ? (
          frontmatter.image_svg_file ? (
            <img
              className="blog-image"
              src={frontmatter.image_svg_file.publicURL}
              alt={frontmatter.image_alt}
              width={128}
              height={128}
            />
          ) : (
            <GatsbyImage
              className="blog-image"
              image={frontmatter.image_file.childImageSharp.gatsbyImageData}
              alt={frontmatter.image_alt}
            />
          )
        ) : null
      }
      title={frontmatter.title}
      description={frontmatter.description}
      meta={`${format(dt, "PPPP")} - ${words} words`}
    />
  )
}

export default BlogListing
