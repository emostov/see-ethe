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

import {web3} from '../../util/web3_util'
import { runContractWrite, withdraw, isConnected } from '../../util/meta_mask_util';

export default class WriteWithdraw extends React.Component {
  constructor() {
    super();
    this.state = {
      withdrawValue: '',
      withdrawResult: '',
    };

    this.reqWithdraw = this.reqWithdraw.bind(this);
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  reqWithdraw(e) {
    e.preventDefault();

    const succes = (res) => {
      console.log(res);
      this.setState({ withdrawResult: res })
    }

    let s = succes.bind(this)

    const { withdrawValue } = this.state;
    if (isConnected()) {
      const withdrawValBig = web3.utils.toBN(withdrawValue)
      runContractWrite(withdraw(s, withdrawValBig))
    } else {
      alert("You need to connect to Meta Mask")
    }
  }

  render() {

    return (

      <div>
        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>2. withdraw</span>
            <Button className='pr-2' close aria-label="Cancel" id="withdraw">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>

          <UncontrolledCollapse toggler="withdraw">
            <CardBody>
              <Form>
                <FormGroup className='mb-0 w-100'>
                  <Label className='mb-2 w-100'> withdraw </Label>
                  <Input
                    className='w-100 grey mono-txt ft-13'
                    type="text"
                    placeholder="wad (uint256)"
                    value={this.state.withdrawValue}
                    onChange={this.update('withdrawValue')}
                  />
                  <Button color='primary' className='ft-13 mt-2 mb-2'
                    onClick={this.reqWithdraw}
                  >
                    Write
                  </Button>
                  {
                    this.state.withdrawResult ?
                      <Button tag='a' className='ft-13 mt-2 mb-2 ml-3'
                        href={`https://rinkeby.etherscan.io/tx/${this.state.withdrawResult}`}
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