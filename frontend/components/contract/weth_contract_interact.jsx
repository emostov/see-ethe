import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledCollapse,
  FormGroup,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
} from "@fortawesome/free-regular-svg-icons"
import {
  faArrowDown,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons"



// EtherWrap.methods
//   .balanceOf('0x21d15d354De0DC27a0A79eC2871606Ea78532052')
//   .call()
//   .then(console.log)

import EtherWrap from '../../contract/ether_wrap';
import { faThList } from '@fortawesome/free-solid-svg-icons';

export default class WethContractInteract extends React.Component {

  constructor() {
    super()
    this.state = {
      name: '...loading',
      totalSupply: '...loading',
      decimals: '...loading',
      symbol: '...loading',
      balanceOfResult: '...loading',
      balanceOfInput: ''
    }
    this.reqBalanceOf = this.reqBalanceOf.bind(this);
  }

  componentDidMount() {
    EtherWrap.methods
      .name()
      .call()
      .then((name) => {
        this.setState({ name })
      })

    EtherWrap.methods
      .totalSupply()
      .call()
      .then((totalSupply) => {
        this.setState({ totalSupply })
      })

    EtherWrap.methods
      .decimals()
      .call()
      .then((decimals) => {
        this.setState({ decimals })
      })

    EtherWrap.methods
      .symbol()
      .call()
      .then((symbol) => {
        this.setState({ symbol })
      })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  reqBalanceOf(e) {
    e.preventDefault();
    EtherWrap.methods
      .balanceOf(this.state.balanceOfInput.toString().trim())
      .call()
      .then((balanceOfResult) => this.setState({ balanceOfResult }))
  }

  render() {
    return (
      <CardBody>
        <Nav pills className='w-100'>
          <NavItem className='pill-nav-grey'>
            <NavLink className='p-1' href="#" >Contract</NavLink>
          </NavItem>
          <NavItem className='pill-nav-grey selected-pill'>
            <NavLink className='p-1 selected-pill' href="#">Read Contract</NavLink>
          </NavItem>
          <NavItem className='pill-nav-grey'>
            <NavLink className='p-1' href="#">Write Contract</NavLink>
          </NavItem>
        </Nav>

        <div className='d-flex justify-content-between mb-3'>
          <p className='ft-13'>
            <FontAwesomeIcon icon={faFileAlt}
              size="lg" className='user-circle gray'
            />
            Read Contract Information
          </p>
        </div>

        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>1. name</span>
            <Button className='pr-2' close aria-label="Cancel" id="toggler">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>
          <UncontrolledCollapse toggler="#toggler">
            <CardBody>
              <FormGroup className='mb-0'>
                <span>
                  {this.state.name} &nbsp;
                  </span>
                <span className='mono-txt grey'>
                  <i>string</i>
                </span>
              </FormGroup>
            </CardBody>
          </UncontrolledCollapse>
        </Card>

        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>2. totalSupply</span>
            <Button className='pr-2' close aria-label="Cancel" id="totalSupply">
              <span aria-hidden>
                    <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>
          <UncontrolledCollapse toggler="#totalSupply">
            <CardBody>
              <FormGroup className='mb-0'>
                <span>
                  {this.state.totalSupply} &nbsp;
                  </span>
                <span className='mono-txt grey'>
                  <i>uint256</i>
                </span>
              </FormGroup>
            </CardBody>
          </UncontrolledCollapse>
        </Card>

        <Card className='mb-3 ft-13'>

          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>3. decimals</span>
            <Button className='pr-2' close aria-label="Cancel" id="decimals">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>
          <UncontrolledCollapse toggler="#decimals">
            <CardBody>
              <FormGroup className='mb-0'>
                <span>
                  {this.state.decimals} &nbsp;
                  </span>
                <span className='mono-txt grey'>
                  <i>uint256</i>
                </span>
              </FormGroup>
            </CardBody>
          </UncontrolledCollapse>
        </Card>

        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>4. balanceOf</span>
            <Button className='pr-2' close aria-label="Cancel" id="balanceOf">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>
          <UncontrolledCollapse toggler="#balanceOf">
            <CardBody>
              <Form>
                <FormGroup className='mb-0 w-100'>
                  <Label className='mb-2 w-100'> {"<input> (address)"} 
                  </Label>
                  {/* <br/> */}
                    <Input
                      className='w-100 grey mono-txt ft-13'
                      type="text"
                      name="balanceOf"
                      id="balanceof"
                      placeholder="<input> (address) - try 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                      value={this.state.balanceOfInput}
                      onChange={this.update('balanceOfInput')}
                    />
              
                </FormGroup>
                <Button
                  id='balanceOfQuerry'
                  className='query-btn f-13'
                  onClick={this.reqBalanceOf}
                >
                  Query
                </Button>
              </Form>
              <div className='mono-txt grey'>
                &nbsp;<i>uint256</i>
              </div>
              <UncontrolledCollapse toggler='#balanceOfQuerry'>
                <div className='responseCollapse gray'>
                  <div>[&nbsp;<b>balanceOf</b> method Response &nbsp;]</div>
                  <span>
                    <FontAwesomeIcon icon={faAngleDoubleRight}
                      size="lg" className='user-circle green'
                    />
                  </span>
                  &nbsp; <i>uint256:</i>&nbsp;  {this.state.balanceOfResult}
                </div>
              </UncontrolledCollapse>
            </CardBody>
          </UncontrolledCollapse>
        </Card>


        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>5. symbol</span>
            <Button className='pr-2' close aria-label="Cancel" id="symbol">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>
          <UncontrolledCollapse toggler="#symbol">
            <CardBody>
              <FormGroup className='mb-0'>
                <span>
                  {this.state.symbol} &nbsp;
                </span>
                <span className='mono-txt grey mt-3'>
                  <i>uint256</i>
                </span>
              </FormGroup>
            </CardBody>
          </UncontrolledCollapse>
        </Card>


        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>6. allowance</span>
            <Button className='pr-2' close aria-label="Cancel" id="allowance">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>
          <UncontrolledCollapse toggler="#allowance">
            <CardBody>
              <Form>
                <FormGroup className='mb-0 w-100'>
                  <Label className='mb-2 w-100'> {"<input> (address)"}
                  </Label>
                  
                  <Input
                    className='w-100 grey mono-txt ft-13'
                    type="text"
                    name="allowance"
                    id="balanceof"
                    placeholder="<input> (address) - try 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                    value={this.state.balanceOfInput}
                    onChange={this.update('balanceOfInput')}
                  />

                </FormGroup>
                <Button
                  id='balanceOfQuerry'
                  className='query-btn f-13'
                  onClick={this.reqBalanceOf}
                >
                  Query
                </Button>
              </Form>
              <div className='mono-txt grey'>
                &nbsp;<i>uint256</i>
              </div>
              <UncontrolledCollapse toggler='#balanceOfQuerry'>
                <div className='responseCollapse gray'>
                  <div>[&nbsp;<b>balanceOf</b> method Response &nbsp;]</div>
                  <span>
                    <FontAwesomeIcon icon={faAngleDoubleRight}
                      size="lg" className='user-circle green'
                    />
                  </span>
                  &nbsp; <i>uint256:</i>&nbsp;  {this.state.balanceOfResult}
                </div>
              </UncontrolledCollapse>
            </CardBody>
          </UncontrolledCollapse>
        </Card>




      </CardBody>
    )
  }

}