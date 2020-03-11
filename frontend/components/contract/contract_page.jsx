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
          <Row className='mb-4 w-100'>
            <Col className=' std-p mb-0' md='6'>
              <Card className='height-all'>
                <CardHeader
                  className='d-flex justify-content-between align-items-center' >
                  <h2 className='pain-nav-link card-title p-0 m-0'>
                    Contract Overview
                  </h2>


                </CardHeader>
                <CardBody className='g-b-f'>
                  <Row className='b-btm-line'>
                    <Col className='mb-0' md='4'>
                      Balance: 
                    </Col>
                    <Col md='8'>
                      REALLLY BIG NUMBER Ether
                    </Col>
                  </Row>
                  <Row className='b-btm-line'>
                    <Col className='mb-0' md='4'>
                      Ether Value:
                    </Col>
                    <Col md='8'>
                      REALLLY BIG NUMBER Ether
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className='std-p mb-0 ' md='6'>
              <Card className='height-all'>

              </Card>
            </Col>
          </Row>
        </Container>



      </Container>
    )
  }
}
