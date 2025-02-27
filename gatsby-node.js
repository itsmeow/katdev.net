const path = require("path")
const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

const evalImageId = (getNodesByType, image, folder) => {
  const localAbsolutePath = path.resolve(__dirname, "src/data/" + folder, image)
  let res = getNodesByType("File").find(
    node =>
      node.absolutePath.replace(/\\/g, "/") ===
      localAbsolutePath.replace(/\\/g, "/")
  )
  if (res) {
    return res.id
  } else {
    throw Error("COULD NOT FIND FILE MATCHING " + localAbsolutePath)
  }
}

// Allow use of canvas
// Thanks to https://github.com/gatsbyjs/gatsby/issues/17661#issuecomment-665800908
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    externals: ["canvas"],
  })
}

exports.sourceNodes = async ({ actions: { createRedirect } }) => {
  createRedirect({
    fromPath: "/neurodiversity.html",
    toPath: "/blog/neurodiversity",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/neurodiversity",
    toPath: "/blog/neurodiversity",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/blog/accomodations",
    toPath: "/blog/accommodations",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/poem",
    toPath: "/poems",
    isPermanent: true,
  })
}

exports.onCreateNode = async ({ node, getNodesByType }) => {
  if (node.internal.type === "MarkdownRemark") {
    let frontmatter = node.frontmatter
    let image = frontmatter.image
    let image_svg = frontmatter.image_svg
    if (image) {
      node.image_file___NODE = evalImageId(getNodesByType, image, "blog-images")
    }
    if (image_svg) {
      node.image_svg_file___NODE = evalImageId(getNodesByType, image_svg, "svg")
    }
  }
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  const typeDefs = `
  type MarkdownRemarkFrontmatter {
    image: String
    image_svg: String
    image_file: File @link(from: "image_file___NODE")
    image_svg_file: File @link(from: "image_svg_file___NODE")
    toc: Boolean
    poem: Boolean
    format_poem: Boolean
  }
  type MarkdownRemark implements Node {
    frontmatter: MarkdownRemarkFrontmatter
  }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({
  actions: { createPage, createRedirect },
  graphql,
  reporter,
}) => {
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
              poem
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while creating markdown pages`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path:
        (node.frontmatter.poem ? "poem" : "blog") + "/" + node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
    if (node.frontmatter.poem) {
      createRedirect({
        fromPath: "/blog/" + node.frontmatter.slug,
        toPath: "/poem/" + node.frontmatter.slug,
        isPermanent: true,
      })
    }
  })
}
