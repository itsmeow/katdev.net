import { Link } from "gatsby"
import { FaGithub } from "react-icons/fa"
import IconLinear from "../data/svg/icon_linear.inline.svg"
import IconSquare from "../data/svg/icon_square.inline.svg"

const Footer = () => {
  return (
    <footer>
      <div className="topfooter">
        <Link to="/" className="link-no-style">
          <IconLinear
            className="footer-large"
            height={80}
            width={320}
            alt="wyattdev linear logo"
          />
          <IconSquare
            className="footer-small"
            height={80}
            width={80}
            alt="wyattdev square logo"
          />
        </Link>
        <div className="github">
          <a
            href="https://github.com/itsmeow/wyattdev.net"
            className="link-no-style"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub alt="GitHub" />
            <span>Source</span>
          </a>
        </div>
      </div>
      <div className="bottomfooter">
        <div className="left-text">
          by Wyatt S - © {new Date().getFullYear()} - MIT License - Thanks for
          visiting!
        </div>
      </div>
    </footer>
  )
}

export default Footer
