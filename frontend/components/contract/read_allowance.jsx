import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  UncontrolledCollapse,
  Collapse,
  FormGroup,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

import { RinkebyWeth } from '../../contract/ether_wrap';

export default class Allowance extends React.Component {
  constructor() {
    super()
    this.state = {
      allowanceResult: '...loading',
      allowanceA: '',
      allowanceB: '',
      isOpen: false,
    }

    this.reqAllowance = this.reqAllowance.bind(this);
  }

  reqAllowance(e) {
    // console.log('hello')
    e.preventDefault()
    this.setState({ isOpen: true })
    const { allowanceA, allowanceB } = this.state;
    console.log('a', allowanceA)
    console.log('b', allowanceB)
    RinkebyWeth.methods
      .allowance(allowanceA.toString().trim(), allowanceB.toString().trim())
      .call()
      .then((allowanceResult) => this.setState({ allowanceResult }))
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {


    return (
      <Card className='mb-3 ft-13' >
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
            <Form >
              <FormGroup className='mb-0 w-100'>
                <Label className='mb-2 w-100'> {"<input> (address)"}
                </Label>
                <Input
                  className='w-100 grey mono-txt ft-13'
                  type="text"
                  name="allowanceA"
                  id="allowanceA"
                  placeholder="<input> (address)"
                  value={this.state.allowanceA}
                  onChange={this.update('allowanceA')}
                />

                <Label className='mb-2 mt-3 w-100'> {"<input> (address)"}
                </Label>
                <Input
                  className='w-100 grey mono-txt ft-13'
                  type="text"
                  name="allowanceB"
                  id="allowanceB"
                  placeholder="<input> (address)"
                  value={this.state.allowanceB}
                  onChange={this.update('allowanceB')}
                />
              </FormGroup>
              <Button

                className='query-btn f-13'
                onClick={this.reqAllowance}
              >
                Query
                </Button>
            </Form>
            <div className='mono-txt grey'>
              &nbsp;<i>uint256</i>
            </div>
            <Collapse isOpen={this.state.isOpen}>
              <div className='responseCollapse gray'>
                <div>[&nbsp;<b>allowance</b> method Response &nbsp;]</div>
                <span>
                  <FontAwesomeIcon icon={faAngleDoubleRight}
                    size="lg" className='user-circle green'
                  />
                </span>
                &nbsp; <i>uint256:</i>&nbsp;  {this.state.allowanceResult}
              </div>
            </Collapse>
          </CardBody>
        </UncontrolledCollapse>
      </Card>
    )
  }
}

