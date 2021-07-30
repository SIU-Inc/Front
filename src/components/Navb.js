import { Navbar } from "react-bootstrap"
import { NavDropdown } from "react-bootstrap"
import { Nav, Container } from "react-bootstrap"

const Navb = () =>{
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Sensores UCA</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/Home">Home</Nav.Link>
          <Nav.Link href="/Sensor1">Temperatura</Nav.Link>
          <Nav.Link href="/Sensor2">Humedad</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    )
}

export default Navb