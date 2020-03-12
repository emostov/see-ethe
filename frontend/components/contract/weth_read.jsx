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

export default class WethRead extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '...loading',
      totalSupply: '...loading',
      decimals: '...loading',
      symbol: '...loading',
      balanceOfResult: '...loading',
      balanceOfInput: '',
      allowanceResult: '...loading',
      allowanceA: '',
      allowanceB: ''
    }

    this.reqBalanceOf = this.reqBalanceOf.bind(this);
    this.reqAllowance = this.reqAllowance.bind(this);
    this.testClick = this.testClick.bind(this)
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

  testClick() {
    e.preventDefault()
    console.log('test')
    // RinkebyWeth.methods
    //   .balanceOf(this.state.balanceOfInput.toString().trim())
    //   .call()
    //   .then(console.log)
  }

  reqBalanceOf(e) {
    console.log('hi ')
    e.preventDefault();
    RinkebyWeth.methods
      .balanceOf(this.state.balanceOfInput.toString().trim())
      .call()
      .then((balanceOfResult) => this.setState({ balanceOfResult }))
  }

  reqAllowance(e) {
    // console.log('hello')
    e.preventDefault()
    const { allowanceA, allowanceB } = this.state;
    console.log('a', allowanceA)
    console.log('b', allowanceB)
    RinkebyWeth.methods
      .allowance(allowanceA.toString().trim(), allowanceB.toString().trim())
      .call()
      .then((allowanceResult) => this.setState({ allowanceResult }))
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

                  <Input
                    className='w-100 grey mono-txt ft-13'
                    type="text"
                    name="balanceOf"
                    id="balanceof"
                    placeholder="<input> (address)"
                    value={this.state.balanceOfInput}
                    onChange={this.update('balanceOfInput')}
                  />

                </FormGroup>
                <Button
                  id='balanceOfQuery'
                  className='query-btn f-13'
                  onClick={this.reqBalanceOf}
                >
                  Query
                </Button>
                <Button
                  onClick={this.reqBalanceOf}
                // id='balanceOfQuery'
                >
                  Query 2
                </Button>
              </Form>
              <div className='mono-txt grey'>
                &nbsp;<i>uint256</i>
              </div>
              <UncontrolledCollapse toggler='#balanceOfQuery'>
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

        <Allowance reqAllowance={this.reqAllowance} />
      </div>
    )
  }

}