import { Link } from "gatsby"
import { FaGithub } from "react-icons/fa"
import wyattdev_linear from "../data/icon_linear.svg"
import wyattdev_square from "../data/icon_square.svg"

const Footer = () => {
  return (
    <footer>
      <div className="topfooter">
        <Link to="/" className="link-no-style">
          <img
            className="footer-large"
            height={80}
            width={320}
            src={wyattdev_linear}
            alt="wyattdev linear logo"
          />
          <img
            className="footer-small"
            height={80}
            width={80}
            src={wyattdev_square}
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
