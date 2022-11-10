import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'

function Navbar2() {
  
  const path = window.location.pathname
  return (
    <div className="navbar2">
  <Navbar bg="dark" sticky='top' variant={"dark"} expand="lg">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/3/35/First_Great_Seal_of_the_US_BAH-p257.png" height="75" /></Navbar.Brand>
        </LinkContainer>
  
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            
            
  
            navbarScroll>
              <LinkContainer to="/">
                <Nav.Link href="/"><h3>Home</h3></Nav.Link>
              </LinkContainer>
  
              <LinkContainer to="/characters">
                 <Nav.Link href="#Profile"><h3>Profile</h3></Nav.Link>
              </LinkContainer>
  
              <LinkContainer to="/events">
                <Nav.Link href="#Events"><h3>Events</h3></Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/mostwanted">
                  <Nav.Link href="Most Wanted"><h3>Most Wanted</h3></Nav.Link>
              </LinkContainer>
  
              <LinkContainer to="/about">
                  <Nav.Link href="AboutUs"><h3>AboutUs</h3></Nav.Link>
              </LinkContainer>
            
          </Nav>
          <LinkContainer to="/">
          <Navbar.Brand href="#"><h4>U.S changeDepartment of Mutant Affairs (DOMA)</h4></Navbar.Brand>
        </LinkContainer>
       <Nav>
      
       </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  </div>
  
  
  
  );

}





export default Navbar2

// <Form className="d-flex">
// { <Form.Control
//   type="search"
//   placeholder="Search"
//   className="me-2"
//   aria-label="Search"
// /> }
// <Button variant="outline-success"></Button>
// </Form>


