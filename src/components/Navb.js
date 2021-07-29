import { Navbar } from "react-bootstrap"
import { NavDropdown } from "react-bootstrap"
import { Nav } from "react-bootstrap"

const Navb = () =>{
    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Tesis</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Acerca de</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Sensor 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Sensor 2</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navb