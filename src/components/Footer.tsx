import { FaGithub } from 'react-icons/fa'
import IconLinear from '../app/svg/icon_linear.inline.svg'
import IconSquare from '../app/svg/icon_square.inline.svg'
import Image, { StaticImageData } from 'next/image'

import lermImage from '../../public/images/banners/lermnow.gif'
import chromeSucksImage from '../../public/images/banners/chrome-sucks.webp'
import gayImage from '../../public/images/banners/gay.gif'
import greendayImage from '../../public/images/banners/greenday.gif'
import gecImage from '../../public/images/banners/gec2u.gif'
import nightImage from '../../public/images/banners/night.gif'
import dewImage from '../../public/images/banners/dew.webp'
import evilAutismImage from '../../public/images/banners/evilautism.gif'
import ds9Image from '../../public/images/banners/ds9.png'
import linuxImage from '../../public/images/banners/linux.png'

const FooterGithub = () => (
    <div className="github">
        <a
            href="https://github.com/itsmeow/katdev.net"
            className="link-no-style"
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaGithub />
            <span>Source</span>
        </a>
    </div>
)

const FooterBanner = ({
    src,
    alt,
    short = false,
    long = false,
}: {
    src: StaticImageData
    alt: string
    short?: boolean
    long?: boolean
}) => (
    <div className={short || long ? 'banner' : 'banner middle'}>
        <Image
            src={src}
            alt={alt}
            placeholder="empty"
            width={long ? 150 : short ? 80 : 88}
            height={long ? 20 : short ? 15 : 31}
        />
    </div>
)

const FooterBanners = () => (
    <div className="banners">
        <FooterBanner src={lermImage} alt="Lerm Online NOW!" />
        <FooterBanner
            src={chromeSucksImage}
            alt="Google Chrome can suck my NUTS!!!"
        />{' '}
        <FooterBanner src={ds9Image} alt="Star Trek Deep Space Nine" />
        <FooterBanner src={gayImage} alt="THIS WEBSITE IS GAY" />
        <div className="collapse-banners">
            <FooterBanner src={gecImage} alt="1-800-GEC-2-U" long />
            <FooterBanner src={nightImage} alt="I LOVE NIGHT!" long />
        </div>
        <div className="collapse-banners">
            <FooterBanner src={dewImage} alt="Do the Dew" long />
            <FooterBanner src={evilAutismImage} alt="EVIL AUTISM" long />
        </div>
        <div className="collapse-banners">
            <FooterBanner src={greendayImage} alt="Green Day!" short />
            <FooterBanner src={linuxImage} alt="Run Linux!" short />
        </div>
    </div>
)

const Footer = ({ banners = false }: { banners?: boolean }) => {
    return (
        <footer>
            <div className="topfooter">
                <div className="footer-large">
                    <div className="footer-lr-wrapper">
                        <div className="footer-left">
                            <div className="footer-banner-flex">
                                <IconLinear
                                    height={80}
                                    width={320}
                                    alt="katdev linear logo"
                                    viewBox="0 0 529.17 132.29"
                                />
                                {banners ? <FooterBanners /> : <></>}
                            </div>
                        </div>
                        <div className="footer-right">
                            <FooterGithub />
                        </div>
                    </div>
                </div>
                <div className="footer-small">
                    <div className="footer-lr-wrapper">
                        <div className="footer-left">
                            <IconSquare
                                height={80}
                                width={80}
                                alt="katdev square logo"
                                viewBox="0 0 264.58 264.58"
                            />
                        </div>
                        <div className="footer-right">
                            <FooterGithub />
                        </div>
                    </div>
                    {banners ? <FooterBanners /> : <></>}
                </div>
            </div>
            <div className="bottomfooter">
                <div className="left-text">
                    by Kat S - © {new Date().getFullYear()} - All Rights
                    Reserved - Thanks for visiting!
                </div>
            </div>
        </footer>
    )
}

export default Footer
