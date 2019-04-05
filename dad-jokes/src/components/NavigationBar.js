import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import { NavLink as RouterNavLink, Link } from "react-router-dom";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">WebAuth IV</NavbarBrand>
      <NavbarToggler onClick={e => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/signup" tag={RouterNavLink}>
              Sign Up
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login" tag={RouterNavLink}>
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/" exact tag={RouterNavLink}>
              Dad Jokes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/" tag={Link} onClick={logout}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavigationBar;
