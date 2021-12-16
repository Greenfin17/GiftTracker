// NavBar.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';
import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';

const NavBar = ({
  user,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar light expand='md'>
        <Link className='navbar-brand' to='/' >Gift Tracker</Link>
        <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                { user && <Link className='nav-link' to='/people'>People</Link> }
              </NavItem>
              <NavItem>
                { user && <Link className='nav-link' to='/occasions'>Occasions</Link> }
              </NavItem>
            </Nav>
            <LoginButton />
            <LogoutButton />
          </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any,
  setSearchTerms: PropTypes.func
};

export default NavBar;
