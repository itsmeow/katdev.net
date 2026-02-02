import GenericListing from '../../components/GenericListing.tsx'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import spaceArtImage from './images/space.png'
import hellImage from './images/hell.png'
import escapeImage from './images/escape.png'
import bleedImage from './images/bleed.png'
import spaceStaticImage from './images/space-static.jpg'
import changeImage from './images/change.jpg'
import maskingImage from './images/masking.png'
import isopodImage from './images/isopod.png'
import katImage from './images/KAT.png'

const ArtIndexPage = () => {
    return (
        <main>
            <h2 className="page-header" style={{ textAlign: 'center' }}>
                Art by Kat
            </h2>
            <hr style={{ margin: '1rem auto' }} />
            <section id="arts">
                <GenericListing
                    linkTo="/art/space"
                    title="Space Art - Interactive"
                    description="Procedurally Generated & Powered by WebGL!"
                    image={
                        <Image
                            src={spaceArtImage}
                            placeholder="blur"
                            alt="Nebula Art"
                            className="blog-image"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    }
                />
                <GenericListing
                    title="hell"
                    imageAfter={
                        <Image
                            src={hellImage}
                            quality={100}
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                            alt={`Picture of an alien planet surface with strange trees with human-shaped white branches laid atop their trunks, distorted by a large, unwordly, lovecraftian 4-slit eye containing fractal patterns, with a red diamond protruding outward toward a black vortex lined with orange and green hues. Overlaid text states "H E L L ?" "I CAN'T SEE" in Century Gothic font, while Webdings encoded text says "SURELY" "I CAN'T". Barely visible through the chaos on screen is a collection of arrows (Webdings 3 text) which cannot easily be decoded.`}
                        />
                    }
                />
                <GenericListing
                    title="escape"
                    imageAfter={
                        <Image
                            src={escapeImage}
                            quality={100}
                            layout="constrained"
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                            alt={`Picture of an earth-like planet in space, with red, rounded circular tendrils surrounding it. There is a small area cleared around the planet itself as they appear to turn to face it. Large white text covers the planet: "ESCAPE."`}
                        />
                    }
                />
                <GenericListing
                    title="bleed"
                    description={<Link href="/poem/dust">dust</Link>}
                    imageAfter={
                        <Image
                            src={bleedImage}
                            quality={100}
                            layout="constrained"
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                            alt={`heavily distorted, noisy, and chunked image that reads: "i will fall like the rest (I BASK IN YOUR LIGHT AND I GIVE LIFE) - growing red (growing red) (and i bleed) and i bleed - my husk emptied (i am alive and i am bright x4) - and so lives on the tree - without me."`}
                        />
                    }
                />
                <GenericListing
                    title="Space Art - Static"
                    description="Created with paint.net"
                    imageAfter={
                        <Image
                            src={spaceStaticImage}
                            quality={100}
                            layout="constrained"
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                            alt="Nebula Art"
                        />
                    }
                />
                <GenericListing
                    title="change"
                    imageAfter={
                        <Image
                            src={changeImage}
                            quality={100}
                            layout="constrained"
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                            alt={`Image of a person, duotone, pink and cyan.
They are looking up toward a pink-only reflected image of themselves, shirtless, their hand covering their chest.
Their hair is long and flowing downward. They are wearing headphones. Marks from adhesive patches are visible on their chest.
Text states: CHANGE YOURSELF, and know that you'll be fine. Hidden behind the text in the middle is the word TRANS`}
                        />
                    }
                />
                <GenericListing
                    title="masking"
                    imageAfter={
                        <Image
                            src={maskingImage}
                            quality={100}
                            layout="constrained"
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
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
                    imageAfter={
                        <Image
                            src={isopodImage}
                            quality={100}
                            layout="constrained"
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                            alt={`Image of a small isopod on concrete, next to a much larger cigarette butt with ash falling out of it.
The camera angle is low to the ground, with greenery and a dark sky visible in the background.
The text at the top is in the Minecraft font and says "ISOPOD cigarettes". It has several lower opacity echoes of the text surrounding it.
The bottom left of the image has the classic album cover sticker PARENTAL ADVISORY: EXPLICIT CONTENT edited onto it.`}
                        />
                    }
                />
                <GenericListing
                    title="K A T"
                    imageAfter={
                        <Image
                            src={katImage}
                            quality={100}
                            layout="constrained"
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                                maxWidth: '100%',
                                height: 'auto',
                            }}
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
    )
}

export const metadata: Metadata = {
    title: 'Art',
    description: 'Digital Art by Kat',
    openGraph: {
        title: 'Art',
        description: 'Digital Art by Kat',
    },
    twitter: {
        card: 'summary',
        title: 'Art',
        description: 'Digital Art by Kat',
    },
}

export default ArtIndexPage
