import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, keywords, title, image, rawTitle }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteURL
          }
        }
      }
    `
  )
  const imageDef =
    image === "/" || !image
      ? ""
      : image.startsWith("/")
      ? site.siteMetadata.siteURL + image
      : image
  const metaDescription = description || site.siteMetadata.description
  const metaTitle = `${
    rawTitle ? title : `${title} @ ${site.siteMetadata.title}`
  }`

  return (
    <>
      {lang && <html lang={lang} />}
      {metaTitle && <title>{metaTitle}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {keywords?.filter(keyword => keyword?.length > 0)?.length > 0 && (
        <meta
          name="keywords"
          content={keywords.filter(keyword => keyword?.length > 0).join(",")}
        />
      )}
      {metaTitle && <meta name="og:title" content={metaTitle} />}
      {metaDescription && (
        <meta name="og:description" content={metaDescription} />
      )}
      <meta name="og:type" content="website" />
      {imageDef && <meta name="og:image" content={imageDef} />}
      {metaTitle && <meta name="twitter:title" content={metaTitle} />}
      {metaDescription && (
        <meta name="twitter:description" content={metaDescription} />
      )}
      <meta name="twitter:card" content="summary" />
      {imageDef && <meta name="twitter:image" content={imageDef} />}
      {site.siteMetadata.author && (
        <meta name="twitter:creator" content={site.siteMetadata.author} />
      )}
      <link
        rel="preload"
        href="/fonts/Abaddon Light.woff2"
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href="/fonts/LibreBaskerville-Regular-Latin.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/LibreBaskerville-Bold-Latin.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/LibreBaskerville-Italic-Latin.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/LibreBaskerville-Regular-LatinExt.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/LibreBaskerville-Bold-LatinExt.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/LibreBaskerville-Italic-LatinExt.ttf"
        as="font"
        type="font/ttf"
      />
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  rawTitle: PropTypes.bool,
}

export default SEO
