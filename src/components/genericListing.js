import { Link } from "gatsby"

const GenericListing = ({
  title,
  description,
  meta,
  image,
  imageAfter,
  linkTo,
}) => {
  const contents = (
    <article
      className={`blog-listing${image ? " blog-listing-with-image" : ""}`}
    >
      {image ? image : <></>}
      <div className="blog-info">
        <h3 className="blog-title">{title}</h3>
        <hr className="title-hr" />
        <p className="blog-description">{description}</p>
        {meta ? <div className="blog-meta">{meta}</div> : null}
        {imageAfter ? (
          <div className="blog-image-after">{imageAfter}</div>
        ) : null}
      </div>
    </article>
  )
  return linkTo ? (
    <Link to={linkTo} className="blog-listing-wrapper link-unstyle">
      {contents}
    </Link>
  ) : (
    contents
  )
}

export default GenericListing
