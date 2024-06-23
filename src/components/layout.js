import { Container, Row, Col } from "react-bootstrap"
import Footer from "./footer"
import Navbar from "./nav/navBar"

const Layout = ({ eventkey, children }) => {
  return (
    <>
      <Container fluid className="px-0 main" id={`page-${eventkey}`}>
        <Navbar eventkey={eventkey} />
        <Row className="no-gutters">
          <Col>{children}</Col>
        </Row>
      </Container>
      <Container fluid className="px-0">
        <Row className="no-gutters">
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Layout
