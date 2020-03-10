import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import {
  faClock,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons"

import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';

import {
  itemAgeToString,
  numberWithCommas,
} from '../../util/general_util';

//TODO move to utils
const utcTimeFromTimestamp = (block) => {
  if (!block) return '...';

  // convert unix timestamp to date obj - note we need milliseconds
  const date = new Date(block.timestamp * 1000);
  const dUtc = `${date.getUTCMonth()}-${date.getUTCDate()}-${date.getUTCFullYear()}`;
  const tUtc = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getSeconds()}`;
  return `${dUtc} ${tUtc} +UTC`;
}

const BlockPage = ({ block, addressTypeTags }) => {
  const age = itemAgeToString(block);
  const hash = block ? block.hash : '...loading';
  const number = block ? block.number : '...loading';
  const dateAndTime = utcTimeFromTimestamp(block);
  const txCount = block ? block.transactions.length : '...';
  const miner = block ? block.miner : '...loading';
  const reward = block ? block.reward : '...loading';
  const unclesReward = block ? block.uncles.length : '...loading';
  const difficulty = block ? numberWithCommas(block.difficulty) : '...loading';
  const gasUsed = block ? block.gasUsed : '...loading';
  const gasLimit = block ? block.gasLimit : '...loading';
  const percentGasUsed = block ? ((block.gasUsed / block.gasLimit) * 100)
    .toString()
    .slice(0, 5)
    : '...loading';

  // TODO make this to utility function - also used in home feed
  const minerTag = block && addressTypeTags[block.miner] ?
    `(${addressTypeTags[block.miner].name})` : '';

  return (
    <Container className='inner'>
      <Container className='pt-pb-3 block d-flex flex-row'>
        <div className='mb-2 mb-sm-0  d-flex flex-row'>
          <div><h1 className='mb-0 grey'>Block </h1></div>
          <div><span className='sub-txt-3'>&nbsp; #{number}</span></div>
        </div>
      </Container>
      <hr className='hr-page' />


      <Container className='pb-2 mb-2 block '>
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
                  <span className='bold-f mr-2'>{number}</span>
                  <a className='blue-chevron'>
                    <FontAwesomeIcon icon={faChevronLeft}
                      size="lg" className=' inner-chev'
                    />
                  </a>
                  <a className='blue-chevron'>
                    <FontAwesomeIcon icon={faChevronRight}
                      size="lg" className=' inner-chev'
                    />
                  </a>
                </Col>
              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Timestamp:
                </Col>
                <Col className='d-flex align-items-center' md='9'>
                  <FontAwesomeIcon icon={faClock}
                    size="lg" className='user-circle grey'
                  />
                  {age}  ({dateAndTime})
                </Col>

              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Transactions:
                </Col>
                <Col className='' md='9'>
                  <a className='light-blue-label'>
                    {txCount} transactions
                  </a> in this block
                </Col>
              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Mined by:
                </Col>
                <Col className='' md='9'>
                  <a className='text-truncate feed name'>
                    {miner}
                  </a>
                  <span className='font-weight-bold'>&nbsp;{minerTag}&nbsp;</span>

                </Col>
              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Block Reward:
                </Col>
                <Col className='' md='9'>
                  {reward} Ether (2 + {reward.slice(1)})
                </Col>
              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Uncles Reward:
                </Col>
                <Col className='' md='9'>
                  {unclesReward}
                </Col>
              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Difficulty:
                </Col>
                <Col className='' md='9'>
                  {difficulty}
                </Col>
              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Block size:
                </Col>
                <Col className='' md='9'>
                  FILL THIS IN TODO
                </Col>
              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Gas Used:
                </Col>
                <Col className='' md='9'>
                  {gasUsed} ({percentGasUsed}%)
                </Col>
              </Row>
              <hr className='hr-page' />

              <Row className='card-row g-b-f'>
                <Col className='mb-1 ' md='3'>
                  <FontAwesomeIcon icon={faQuestionCircle}
                    size="lg" className='user-circle grey'
                  />
                  Gas Limmit
                </Col>
                <Col className='' md='9'>
                  {gasLimit} percent gas used
                </Col>
              </Row>
              <hr className='hr-page' />

            </Container>
          </CardBody>
        </Card>
      </Container>
    </Container>
  )
}

export default BlockPage