import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons"
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Table,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'



const BlockPage = ({ block, transactions }) => {
  const hash = block ? block.hash : '...loading'
  const number = block ? block.number : '...loading'
  return (
    <div>
      <Container className='pt-pb-3 block'>
        <div className='dm-sm-flex align-items-center block'>
          <div className='mb-2 mb-sm-0'>
            <h1 className='mb-0 grey'>Block</h1>
            <span className='sub-txt-3'> #{number}</span>
          </div>
        </div>
      </Container>
      <hr className='feed-hr' />


      <Container className='pb-2 mb-2 block'>
        <Card className='block'>
          <CardHeader>
            <a id='overview-tab' className='pain-nav-link active'>
              Overview
            </a>
            <a className='pain-nav-link nf'>
              Comments
            </a>
          </CardHeader>
          <CardBody>
            <Container>
              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Block Height:
                </Col>
                <Col className='' md='9'>
                  
                  <span className='bold-f'>{number}</span>
                </Col>

              </Row>
              <hr className='feed-hr' />
            </Container>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default BlockPage