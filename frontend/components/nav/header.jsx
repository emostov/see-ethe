import React from "react";

import NavBar from './nav_bar'
import { Container } from 'reactstrap';


export default class Header extends React.Component {


  render() {
    return (
      <nav id="header">
        {/* <Container fluid='lg'> */}
          <div className='container'>

            <div className='header-logo'>
            <img className='site-logo' src={window.imgs.siteLogo} />
          
              See<span>THE</span>Ethe
            </div>
            <NavBar />

          </div>
        {/* </Container> */}
      </nav>
    )

  }
}