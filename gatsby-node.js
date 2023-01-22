const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

const evalImageId = (getNodesByType, image) => {
  const localRelativePath = "blog-images/" + image
  let res = getNodesByType("File").find(
    node => node.relativePath === localRelativePath
  )
  if (res) {
    return res.id
  } else {
    console.log("COULD NOT FIND FILE MATCHING " + localRelativePath)
    throw Error("COULD NOT FIND FILE MATCHING " + localRelativePath)
  }
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
}

exports.onCreateNode = async ({ node, getNodesByType }) => {
  if (node.internal.type === "MarkdownRemark") {
    let image = node.frontmatter.image
    let image_svg = node.frontmatter.image_svg
    if (image) {
      node.frontmatter.image_file_id = evalImageId(getNodesByType, image)
    }
    if (image_svg) {
      node.frontmatter.image_svg_file_id = evalImageId(
        getNodesByType,
        image_svg
      )
    }
  }
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  const typeDefs = `
  type MarkdownRemarkFrontmatter {
    image: String
    image_svg: String
    image_file: File @link(from: "image_file_id")
    image_svg_file: File @link(from: "image_svg_file_id")
    toc: Boolean
  }
  type MarkdownRemark implements Node {
    frontmatter: MarkdownRemarkFrontmatter
  }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({
  actions: { createPage },
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
      path: "blog/" + node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
