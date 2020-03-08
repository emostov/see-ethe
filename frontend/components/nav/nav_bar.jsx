import React from "react";
import { Link } from 'react-router-dom';
import UserHeaderContainer from './user_header_container';


const NavBar = () => {

  return (
    
    <ul className='nav-bar'>

      <li>
        <Link className='nav-link home-link' to={'/'} >
          Home
        </Link>
      </li>

      <li>
        <Link className='nav-link nf' to={'/block'} >
          BlockChain
        </Link>
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