import React, { useState } from 'react';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';


const UserHeaderDropdown = ({ currentUser, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className='user-drop' isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="span" caret>
        <FontAwesomeIcon icon={faUserCircle} size="lg" className='user-circle' />
        {currentUser.username}
      </DropdownToggle>

      <DropdownMenu className='drp-dwn-header'>
        <DropdownItem className='grey-nav-text ' tag='span'>
          <Link className='nav-link drop-link' to={'/myaccount'}>
            My Account
          </Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem className='btn-xs-soft-primary' onClick={logout}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}



export default UserHeaderDropdown;