import React from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from 'reactstrap';

export default class ContractPage extends React.Component {
  render() {
    return (
      <Container className='inner'>
        <div
          className='block-page-header d-flex flex-row btm-divider header-block pb-1'>
          <div className='mb-2  d-flex flex-row  '>
            <img className='contract-av' src={window.imgs.wethLogo} />
            <div><h1 className='mb-0 grey'>Contract </h1></div>
            <div>
              <span className='sub-txt-3'>
                &nbsp; 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
              </span>
            </div>
          </div>
        </div>

        <Container className='inner'>
          <Row className='mb-4'>
            <Col className='md-6 std-p mb-0'>
              <Card className='height-all'>
                <CardHeader>

                </CardHeader>
              </Card>
            </Col>
            <Col className='md-6 std-p mb-0 '>
              <Card className='height-all'>

              </Card>
            </Col>
          </Row>
        </Container>



      </Container>
    )
  }
}
