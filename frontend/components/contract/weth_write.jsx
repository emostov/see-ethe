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
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import {
  faArrowDown, faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons"

import { RinkebyWeth } from '../../contract/ether_wrap';
import { runContractWrite, deposit } from '../../util/meta_mask_util'

export default class WethWrite extends React.Component {
  constructor() {
    super()
    this.state = {
      depositValue: '',
      depositResult: '',
      // guyApprove: '',
      // wadApprove: '',
      // approveResult: '...loading',
    }
    this.reqDeposit = this.reqDeposit.bind(this)
  }


  isConnected() {
    if (typeof window.ethereum !== 'undefined') {
      return true
    }
    return false
  }


  isRinkeby() {
    if (this.isConnected() && window.ethereum.networkVersion === '4') {
      return true;
    }
    return false;
  }

  isRinkebyAlert() {
    if (!this.isRinkeby()) {
      alert('You are not connected to Rinkbey test net. Please connect to Rinkeby through Meta Mask')
      return false;
    }
    return true;
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  reqDeposit(e) {
    e.preventDefault();

    const succes = (res) => {
      console.log(res);
      this.setState({ depositResult: res })
    }
    let s = succes.bind(this)
    const { depositValue } = this.state;
    if (this.isConnected()) {
      runContractWrite(deposit(s), { value: depositValue.toString() })
    } else {
      alert("You need to connect to Meta Mask")
    }

  }


  render() {

    let circleClass = this.isConnected ? 'user-circle green' : 'user-circle red'
    let connected = this.isConnected ? 'You are connected with Meta Mask' :
      'You must connect with Meta Mask on the Rinkeby Network to use Write features'
    return (
      <div>
        <div className='d-flex justify-content-between mb-3 pt-2'>
          <p className='ft-13'>
            {}
            <FontAwesomeIcon icon={faCircle}
              size="lg" className={circleClass}
            />
            Write Contract
          </p>
          <p className='ft-13' >{connected}</p>
        </div>

        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>5. deposit</span>
            <Button className='pr-2' close aria-label="Cancel" id="approve">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>

          <UncontrolledCollapse toggler="approve">
            <CardBody>
              <Form>
                <FormGroup className='mb-0 w-100'>
                  <Label className='mb-2 w-100'>  </Label>
                  <Input
                    className='w-100 grey mono-txt ft-13'
                    type="text"
                    name="guyApprove"
                    id="guyApprove"
                    placeholder="payableAmount (wei)"
                    value={this.state.depositValue}
                    onChange={this.update('depositValue')}
                  />
                  <Button color='primary' className='ft-13 mt-2 mb-2'
                    onClick={this.reqDeposit}
                  >
                    Write
                  </Button>

                  {
                    this.state.depositResult ?
                      <Button tag='a' className='ft-13 mt-2 mb-2 ml-3'
                        href={`https://rinkeby.etherscan.io/tx/${this.state.depositResult}`}
                      >Go to transaction</Button>
                      : ''
                  }

                </FormGroup>
              </Form>


            </CardBody>
          </UncontrolledCollapse>
        </Card>

        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>1. approve</span>
            <Button className='pr-2' close aria-label="Cancel" id="approve">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>

          <UncontrolledCollapse toggler="approve">
            <CardBody>
              <Form>
                <FormGroup className='mb-0 w-100'>
                  <Label className='mb-2 w-100'> {"guy (address)"}
                  </Label>
                  <Input
                    className='w-100 grey mono-txt ft-13'
                    type="text"
                    name="guyApprove"
                    id="guyApprove"
                    placeholder="guy (address)"
                    value={this.state.guyApprove}
                    onChange={this.update('guyApprove')}
                  />

                  <Label className='mb-2 mt-3 w-100'> {"wad (address)"}
                  </Label>
                  <Input
                    className='w-100 grey mono-txt ft-13'
                    type="text"
                    name="wadApprove"
                    id="wadApprove"
                    placeholder="wad (address)"
                    value={this.state.wadApprove}
                    onChange={this.update('wadApprove')}
                  />
                </FormGroup>
                <Button
                  id='approveQuery'
                  className='query-btn f-13'
                // onClick={}
                >
                  Query
                </Button>
              </Form>
              <div className='mono-txt grey'>
                &nbsp;<i>uint256</i>
              </div>

              <UncontrolledCollapse toggler='#approveQuery'>
                <div className='responseCollapse gray'>
                  <div>[&nbsp;<b>approve</b> method Response &nbsp;]</div>
                  <span>
                    <FontAwesomeIcon icon={faAngleDoubleRight}
                      size="lg" className='user-circle green'
                    />
                  </span>
                  &nbsp; <i>bool:</i>&nbsp;  {this.state.approveResult}
                </div>
              </UncontrolledCollapse>

            </CardBody>
          </UncontrolledCollapse>
        </Card>




      </div>
    )
  }

}