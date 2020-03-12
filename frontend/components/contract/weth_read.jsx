import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  UncontrolledCollapse,
  FormGroup,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons"
import { faArrowDown, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

import { EtherWrap, RinkebyWeth } from '../../contract/ether_wrap';
import Allowance from './read_allowance';
import BalanceOf from './read_balanceOf';


export default class WethRead extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '...loading',
      totalSupply: '...loading',
      decimals: '...loading',
      symbol: '...loading',
    }

  }

  componentDidMount() {

    RinkebyWeth.methods.name().call()
      .then((name) => {
        this.setState({ name })
      })

    RinkebyWeth.methods.totalSupply().call()
      .then((totalSupply) => {
        this.setState({ totalSupply })
      })


    RinkebyWeth.methods.decimals().call()
      .then((decimals) => {
        this.setState({ decimals })
      })

    RinkebyWeth.methods.symbol().call()
      .then((symbol) => {
        this.setState({ symbol })
      })

    // tests 
    RinkebyWeth.methods
      .balanceOf('0x2a678290f52da75abe8d53a47022560f11e55046')
      .call()
      .then(console.log)

  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {

    return (
      <div>
        <div className='d-flex justify-content-between mb-3 pt-2'>
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

        <BalanceOf />

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

        <Allowance reqAllowance={this.reqAllowance} />

      </div>
    )
  }

}