import React from 'react';
import Header from './nav/header.jsx';
import { Route, Switch, } from 'react-router-dom';

import { AuthRoute, ProtectedRoute, } from '../util/route_util'
import RunWeb3Container from './RunWeb3Container'
import SignUpFormContainer from './session/sign_up_form_container';
import LogInFormContainer from './session/login_form_container';
import MyAccountContainer from './account/my_account_container';
import BlockPageContainer from './block/block_page_container';
import BlockPageRouteContainer from './block/block_page_route_container';
import Home from './home/home';

const App = () => (
  <div className='app'>
    <RunWeb3Container />
    <header>
      <Header />
    </header >
    <main>
      <div className='container'>

        <Switch>
          <AuthRoute exact path="/login" component={LogInFormContainer} />
          <AuthRoute exact path="/signup" component={SignUpFormContainer} />
          <ProtectedRoute path='/myaccount' component={MyAccountContainer} />
          <Route exact path='/block' component={BlockPageContainer} />
          <Route path='/block/:hash' component={BlockPageRouteContainer} />
          <Route path='/' component={Home} />
        </Switch>

      </div>
    </main>
    <footer className='blue-footer'>
      footer content here
    </footer>

  </div>
);

export default App;