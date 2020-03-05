import React from 'react';
import { Button } from 'reactstrap';

/*
Demo user credentials:
username: DemoUser
password: password
email: IHeartERC20s@gmail.com
*/

const DemoUser = ({ login }) => {

  const handleLogin = () => {
    login({
      username: 'test1',
      password: 'password',
    })
  }



  return (
    <div>
      <Button id='demo-user-btn' color="success" size="lg" onClick={handleLogin}>
        No account? Click here to login as a demo user
    </Button>
    </div>
  )

}

export default DemoUser