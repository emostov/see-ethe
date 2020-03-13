import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import { runContractWrite, deposit, isConnected } from '../../util/meta_mask_util';

export default class WriteDeposit extends React.Component {
  constructor() {
    super();
    this.state = {
      depositValue: '',
      depositResult: '',
    };

    this.reqDeposit = this.reqDeposit.bind(this);
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value,
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
    if (isConnected()) {
      runContractWrite(deposit(s), { value: depositValue.toString() })
    } else {
      alert("You need to connect to Meta Mask")
    }

  }

  render() {

    return (


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
                <Label className='mb-2 w-100'> deposit </Label>
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
      </div >
    )
  }

}
