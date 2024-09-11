import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbarn(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args} expand="sm" className='nav'> {/* expand="md" asegura que el navbar se colapse en pantallas medianas */}
        <Container>
          <NavbarBrand href="/">Traveling Condor</NavbarBrand>
          <NavbarToggler onClick={toggle} className="ms-auto" /> {/* ms-auto asegura que el toggler esté alineado a la derecha */}
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar> {/* ms-auto asegura que el contenido del Nav esté alineado a la derecha */}
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu end> {/* end asegura que el menú se despliegue hacia la derecha */}
                  <DropdownItem>Mi perfil</DropdownItem>
                  <DropdownItem divider />
                  <Link to={'/login'}>
                  <DropdownItem>Cerrar</DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbarn;
