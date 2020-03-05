import React from 'react';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faEye,
  faStickyNote,
  faEyeSlash,
  faKey,
  faPencilAlt,
  faSearchPlus,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons"

import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  CardFooter,
  Button,
  Table,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'


class MyAccount extends React.Component {


  mainPain() {
    const { user } = this.props;
    return (
      <div>
        <Card className='std-box'>
          <CardHeader>
            <a id='overview-tab' className='pain-nav-link active'>
              Overview
            </a>
            <a className='pain-nav-link nf'>
              Account Settings and Profile
            </a>
          </CardHeader>
          <CardBody>
            <CardText tag='p' className='card-txt-2'>
              Below are the username, email and overview information for your account
            </CardText>
            <Table>
              <tbody>
                <tr>
                  <th scope="row">Your Username: </th>
                  <td>{user.username}</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Your Email Address: </th>
                  <td>{user.email}</td>
                  <td className='blue-icon fn'>
                    <FontAwesomeIcon icon={faPencilAlt}
                      size="lg" className='user-circle'
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Address Watch List :</th>
                  <td>0 Address Alerts</td>
                  <td className='blue-icon fn'>
                    <FontAwesomeIcon icon={faSearchPlus}
                      size="lg" className='user-circle'
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Transaction Notes :</th>
                  <td>1 out of 1000 available limit</td>
                  <td className='blue-icon fn'>
                    <FontAwesomeIcon icon={faSearchPlus}
                      size="lg" className='user-circle'
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Address Tags :</th>
                  <td>1 out of 500 available limit</td>
                  <td className='blue-icon fn'>
                    <FontAwesomeIcon icon={faSearchPlus}
                      size="lg" className='user-circle fn'
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email Notification Limit :</th>
                  <td>0 emails sent out 200 daily limit available</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Total ETH Balance :</th>
                  <td>NOT IMPLEMENTED YET</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Last Login :</th>
                  <td>NOT IMPLEMENTED YET</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }

  sidePain() {
    return (
      <ListGroup>
        <ListGroupItem tag="a" active action>
          <FontAwesomeIcon icon={faUserCircle} size="lg" className='user-circle' />
          My Profile
      </ListGroupItem>
        <ListGroupItem tag="a" className='nf' action>
          <FontAwesomeIcon icon={faEye} size="lg" className='user-circle' />
          Watch List
      </ListGroupItem>
        <ListGroupItem tag="a" className='nf' action>
          <FontAwesomeIcon icon={faStickyNote} size="lg" className='user-circle' />
          TXN Private Notes
      </ListGroupItem>
        <ListGroupItem tag="a" className='nf' action>
          <FontAwesomeIcon icon={faEyeSlash} size="lg" className='user-circle' />
          Token Ignore List
      </ListGroupItem>
        <ListGroupItem tag="a" className='nf' action>
          <FontAwesomeIcon icon={faKey} size="lg" className='user-circle' />
          API-KEYs
      </ListGroupItem>
        <ListGroupItem tag="a" className='nf' action>
          <FontAwesomeIcon icon={faCertificate} size="lg" className='user-circle' />
          Verified Address
      </ListGroupItem>
      </ListGroup>
    )
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md="3">
              {/* col-md-3 */}
              {/* side nav */}
              {/* account info card */}
              {this.sidePain()}
            </Col>
            <Col md="9">
              {/* col-md-9 */}
              {/* card */}
              {this.mainPain()}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MyAccount;


