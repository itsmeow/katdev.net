import Layout from "../../components/layout"
import SEO from "../../components/seo"
import GenericListing from "../../components/genericListing"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ArtIndexPage = () => {
  return (
    <Layout eventkey="art">
      <main>
        <h2 className="page-header" style={{ textAlign: "center" }}>
          Art by Kat
        </h2>
        <hr style={{ margin: "1rem auto" }} />
        <section id="arts">
          <GenericListing
            linkTo="/art/space"
            title="Space Art - Interactive"
            description="Procedurally Generated & Powered by WebGL!"
            image={
              <StaticImage
                src="../../data/art/space.png"
                layout="constrained"
                placeholder="blurred"
                height={128}
                alt="Nebula Art"
                className="blog-image"
              />
            }
          />
          <GenericListing
            title="bleed"
            description={<Link to="/poem/dust">dust</Link>}
            imageAfter={
              <StaticImage
                src="../../data/art/bleed.png"
                quality={100}
                layout="constrained"
                placeholder="blurred"
                alt={`heavily distorted, noisy, and chunked image that reads: "i will fall like the rest (I BASK IN YOUR LIGHT AND I GIVE LIFE) - growing red (growing red) (and i bleed) and i bleed - my husk emptied (i am alive and i am bright x4) - and so lives on the tree - without me."`}
              />
            }
          />
          <GenericListing
            title="Space Art - Static"
            description="Created with paint.net!"
            imageAfter={
              <StaticImage
                src="../../data/art/space-static.jpg"
                quality={100}
                layout="constrained"
                placeholder="blurred"
                alt="Nebula Art"
              />
            }
          />
          <GenericListing
            title="change"
            description="Edited with paint.net! Shot on a Google Pixel 6."
            imageAfter={
              <StaticImage
                src="../../data/art/change.jpg"
                quality={100}
                layout="constrained"
                placeholder="blurred"
                alt={`Image of a person, duotone, pink and cyan. 
They are looking up toward a pink-only reflected image of themselves, shirtless, their hand covering their chest. 
Their hair is long and flowing downward. They are wearing headphones. Marks from adhesive patches are visible on their chest. 
Text states: CHANGE YOURSELF, and know that you'll be fine. Hidden behind the text in the middle is the word TRANS`}
              />
            }
          />
          <GenericListing
            title="masking"
            description="Created with paint.net!"
            imageAfter={
              <StaticImage
                src="../../data/art/masking.png"
                quality={100}
                layout="constrained"
                placeholder="blurred"
                alt={`Edited photo of Google Search page, featuring dramatic blurred text on a green background, with various intersecting lines and skewed perspectives. The major texts state: 
"does be yourself work if you're autistic" (In the search bar)
"MY MISTAKE I'LL TRY BEING SOMEONE YOU ENJOY"
"HELLO, MY NAME IS KAT, HOW ARE YOU DOING TODAY?"
"HOW NICE!"
"I'll change if I have to"
The remaining text shows the Google AI search result for the query mentioned previously.`}
              />
            }
          />
          <GenericListing
            title="ISOPOD CIGARETTES"
            description="Edited with paint.net! Shot on a Google Pixel 6."
            imageAfter={
              <StaticImage
                src="../../data/art/isopod.png"
                quality={100}
                layout="constrained"
                placeholder="blurred"
                alt={`Image of a small isopod on concrete, next to a much larger cigarette butt with ash falling out of it.
The camera angle is low to the ground, with greenery and a dark sky visible in the background.
The text at the top is in the Minecraft font and says "ISOPOD cigarettes". It has several lower opacity echoes of the text surrounding it.
The bottom left of the image has the classic album cover sticker PARENTAL ADVISORY: EXPLICIT CONTENT edited onto it.`}
              />
            }
          />
          <GenericListing
            title="K A T"
            description="Edited with paint.net! Shot on a Google Pixel 6."
            imageAfter={
              <StaticImage
                src="../../data/art/KAT.png"
                quality={100}
                layout="constrained"
                placeholder="blurred"
                alt={`Edited photo of a person in duotone cyan and pink. Their body appears to be split into two phases of pink and cyan.
Their head has been fragmented into solid shades of blue and crystallized. They are wearing a black dress.
Text above their head is heavily distorted and glowing pink. It states: "i am not your solution".
Text layered onto their head states: "K A T is not responding - The program may respond again if you wait - Do you want to end this process?"
Small, faded text in the bottom right states: "tell me who I am".`}
              />
            }
          />
        </section>
      </main>
    </Layout>
  )
}

export const Head = () => <SEO title="Art" />

export default ArtIndexPage
