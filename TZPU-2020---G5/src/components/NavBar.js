import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/WelcomeScreenStyle.css";

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand>Tricky Games</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href='/listOfQuizes'>Tests</Nav.Link>
					<NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
						<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.2'>
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href='#action/3.4'>
							Separated link
						</NavDropdown.Item>
					</NavDropdown> */}
        </Nav>
        <Nav>
          <Nav.Link href="/">Log out</Nav.Link>
          <img
            className="rotate"
            style={{ height: 40, width: 40 }}
            alt="puzzleicon"
            src={require("./puzzleicon.png")}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
