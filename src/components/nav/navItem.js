import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Button } from "@headlessui/react"
import { FaExternalLinkAlt } from "react-icons/fa"

const NavItem = ({ path, name, activekey, eventkey, external = false }) => {
  return external ? (
    <li className="nav-item">
      <Button
        as="a"
        href={path}
        rel="noopener noreferrer"
        disabled={activekey === eventkey}
        className={`nav-link${activekey === eventkey ? " active" : ""}`}
      >
        {name || path}
        <span
          style={{
            marginLeft: "8px",
            fontSize: "1.5rem",
            lineHeight: "32px",
            verticalAlign: "middle",
          }}
        >
          <FaExternalLinkAlt />
        </span>
      </Button>
    </li>
  ) : (
    <li className="nav-item">
      <Button
        as={Link}
        to={path}
        disabled={activekey === eventkey}
        className={`nav-link${activekey === eventkey ? " active" : ""}`}
      >
        {name || path}
      </Button>
    </li>
  )
}

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  eventkey: PropTypes.string.isRequired,
  activekey: PropTypes.string.isRequired,
  name: PropTypes.string,
  external: PropTypes.bool,
}

export default NavItem
