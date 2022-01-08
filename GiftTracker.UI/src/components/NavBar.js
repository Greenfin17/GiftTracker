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
  Dropdown,
  DropdownMenu, 
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import LoginButton from './buttons/LoginButton';
import accountIcon from '../resources/icons/account.min.svg';
import { signOutUser } from '../helpers/auth/auth';
import Avatar from '../components/symbols/Avatar'


const NavBar = ({
  user,
  setUser
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  }

  return (
    <div>
      <Navbar light expand='md' className='gt-navbar'>
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
              <NavItem>
                { user && <Link className='nav-link' to='/receiving'>Receiving</Link> }
              </NavItem>
              <NavItem>
                { user && <Link className='nav-link' to='/giving '>Giving</Link> }
              </NavItem>
              <NavItem>
                { user && <Link className='nav-link' to='/lists'>Lists</Link> }
              </NavItem>
            { user && <Dropdown  toggle={toggleDropDown} nav inNavbar isOpen={dropDownOpen} onMouseOver={() => setDropDownOpen(true)}
                                onMouseLeave={() => setDropDownOpen(false)}>
              <DropdownToggle nav>
                <Avatar firstName={user.firstName} imageURL={user.profilePicUrl} 
                        width={50} height={50} />
              </DropdownToggle>
              <DropdownMenu className='gt-profile-dropdown' end>
                <DropdownItem>
                  <Link className='nav-link' to='/profile'>Profile</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className='nav-link' to='/'
                  onClick={() => signOutUser(setUser)}>Sign Out</Link>
                </DropdownItem>
              </DropdownMenu>
              </Dropdown> }
            </Nav>
            { !user && <LoginButton setUser={setUser} /> }
          </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default NavBar;
