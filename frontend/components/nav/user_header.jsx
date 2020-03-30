import React from 'react';
import { Link } from 'react-router-dom';
import UserHeaderDropdown from './user_header_dropdown'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserHeader = ({ currentUser, logout }) => {


  const sessionStartUpLink = () => (
    <div className='no-user'>
      <span className='signin-link'>
        <Link className='nav-link ' to="/signup">
          <span className='sign-up-link'>
            <FontAwesomeIcon icon={faUserCircle} size="lg" className='user-circle' />
            Sign Up
          </span>

        </Link>
      </span>
    </div>
  )

  const inner = currentUser ? <UserHeaderDropdown currentUser={currentUser} logout={logout} /> : sessionStartUpLink()

  return (
    < div className='user-header nav-link' >
      {inner}
      {/* hi */}
      
    </div >
  )
}

export default UserHeader;
