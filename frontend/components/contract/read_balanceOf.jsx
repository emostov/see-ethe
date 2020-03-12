import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import { RinkebyWeth } from '../../contract/ether_wrap';

export default class BalanceOf extends React.Component {
  constructor() {
    super();

    this.state = {
      balanceOfResult: '...loading',
      balanceOfInput: '',
      isOpen: false,
    };

    this.reqBalanceOf = this.reqBalanceOf.bind(this);
  }

  reqBalanceOf(e) {
    this.setState({ isOpen: true });
    e.preventDefault();
    RinkebyWeth.methods
      .balanceOf(this.state.balanceOfInput.toString().trim())
      .call()
      .then((balanceOfResult) => this.setState({ balanceOfResult }));
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  render() {

    return (
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
                className='query-btn f-13'
                onClick={this.reqBalanceOf}>
                Query
              </Button>
            </Form>

            <div className='mono-txt grey'>
              &nbsp;<i>uint256</i>
            </div>

            <Collapse isOpen={this.state.isOpen}>
              <div className='responseCollapse gray'>
                <div>[&nbsp;<b>balanceOf</b> method Response &nbsp;]</div>
                <span>
                  <FontAwesomeIcon icon={faAngleDoubleRight}
                    size="lg" className='user-circle green'
                  />
                </span>
                &nbsp; <i>uint256:</i>&nbsp;  {this.state.balanceOfResult}
              </div>
            </Collapse>

          </CardBody>
        </UncontrolledCollapse>
      </Card>
    )
  }
}
