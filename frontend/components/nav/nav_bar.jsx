import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserHeaderContainer from './user_header_container';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const BlockChainDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className='' isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className='color-important-grey' tag="span" caret>
        BlockChain
      </DropdownToggle>
      <DropdownMenu className='drp-dwn-header'>
        <DropdownItem className='grey-nav-text big' tag='span'>
          <Link className='nav-link drop-link big' to={'/contract'}>
            wEth Contract
          </Link>
        </DropdownItem>
        <DropdownItem className='grey-nav-text big' tag='span'>
          <Link className='nav-link drop-link big' to={'/block'}>
            Latest Block
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

const NavBar = () => {

  return (

    <ul className='nav-bar'>
      <li>
        {<a href="https://github.com/emostov/see-ethe"
          target="_blank" rel="noopener noreferrer" >
          <img src={window.imgs.github} className='online-presence-icon' alt="github" />
        </a>}
      </li>

      <li>
        <NavLink className='nav-link home-link' activeClassName={'active-link'} to={'/home'} >
          Home
        </NavLink>
      </li>

      <li>
        <BlockChainDropdown />
      </li>

      <li>
        <Link className='nav-link nf' to={'/tokens'} >
          Tokens
        </Link>
      </li>

      <li>
        <Link className='nav-link nf' to={'/charts'} >
          Resources
          </Link>
      </li>

      <li>
        <Link className='nav-link nf' to={'/more'} >
          More
          </Link>
      </li>

      <li>
        < UserHeaderContainer />
      </li>

      <li>
        <Link to={'/'}>
          <div className='ethe-logo-box'>
            <button type="button" className="btn btn-icon btn-group-sm btn-light nf">
              <img src={window.imgs.etheLogo} className="ethe-img" />
            </button>
          </div>
        </Link>
      </li>

    </ul>
  )
}

export default NavBar;