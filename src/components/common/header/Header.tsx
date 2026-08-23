import  { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import HeaderBasket from "../../eCommerce/headerBasket/HeaderBasket"
import styles from './styles.module.css';


const Header = () => {
  return (
    <header>
        {/* nav header */}
        <div className={styles.headerContainer}>
            <h1 className={styles.headerLogo}  >cartivo</h1>
            <HeaderBasket/>
        </div>

        {/* navigation bar */}
    <Navbar expand="lg" className="py-3 rounded shadow" bg="dark" data-bs-theme="dark" >
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-capitalize">
            <Nav.Link as={NavLink}  to="/"  >Home</Nav.Link>
            <Nav.Link as={NavLink} to="/categories" className="nav-link">categories</Nav.Link>
            <Nav.Link as={NavLink} to="/about-us" className="nav-link">about us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
            <Nav.Link as={NavLink} to="/login" className="nav-link">login</Nav.Link>
            <Nav.Link as={NavLink} to="/register" className="nav-link">register</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header