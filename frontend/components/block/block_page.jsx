import React from 'react';
import sizeof from 'object-sizeof';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
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
  Spinner,
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
  const number = block ? block.number : <Spinner color='dark' />;
  const dateAndTime = utcTimeFromTimestamp(block);
  const txCount = block ? block.transactions.length : <Spinner color='dark' />;
  const miner = block ? block.miner : <Spinner color='dark' />;
  const reward = block ? block.reward : <Spinner color='dark' />;
  const unclesReward = block ? block.uncles.length : <Spinner color='dark' />;
  const difficulty = block ? numberWithCommas(block.difficulty) : <Spinner color='dark' />;
  const gasUsed = block ? block.gasUsed : <Spinner color='dark' />;
  const gasLimit = block ? block.gasLimit : <Spinner color='dark' />;
  const extraData = block ? block.extraData : <Spinner color='dark' />;
  const size = block ? sizeof(block) : <Spinner color='dark' />;
  const parentHash = block ? block.parentHash : <Spinner color='dark' />;
  const otherReward = block && block.reward.length > 2 ?
    `(2 + ${reward.slice(2)})` : '';

  const percentGasUsed = block ? ((block.gasUsed / block.gasLimit) * 100)
    .toString()
    .slice(0, 5)
    : '...loading';

  // TODO make this to utility function - also used in home feed
  const minerTag = block && addressTypeTags[block.miner] ?
    `(${addressTypeTags[block.miner].name})` : '';

  return !block ? (<Spinner color='dark' />) :
    (
      <Container className='inner'>
        <div
          className='block-page-header d-flex flex-row btm-divider header-block pb-1'>
          <div className='mb-2  d-flex flex-row  '>
            <div><h1 className='mb-0 grey'>Block </h1></div>
            <div><span className='sub-txt-3'>&nbsp; #{number}</span></div>
          </div>
        </div>
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
              <Container className='p-0'>
                <Row className='card-row g-b-f first-boi'>
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
                <Row className='card-row g-b-f'>
                  <Col className='mb-1 ' md='3'>
                    <FontAwesomeIcon icon={faQuestionCircle}
                      size="lg" className='user-circle grey'
                    />
                    Block Reward:
                </Col>
                  <Col className='' md='9'>
                    {reward} Ether {otherReward}
                  </Col>
                </Row>
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
                <Row className='card-row g-b-f'>
                  <Col className='mb-1 ' md='3'>
                    <FontAwesomeIcon icon={faQuestionCircle}
                      size="lg" className='user-circle grey'
                    />
                    Block size:
                </Col>
                  <Col className='' md='9'>
                    {numberWithCommas(size)}
                  </Col>
                </Row>
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
                <Row className='card-row g-b-f'>
                  <Col className='mb-1 ' md='3'>
                    <FontAwesomeIcon icon={faQuestionCircle}
                      size="lg" className='user-circle grey'
                    />
                    Gas Limit
                </Col>
                  <Col className='' md='9'>
                    {gasLimit}
                  </Col>
                </Row>
                <Row className='card-row g-b-f'>
                  <Col className='mb-1 ' md='3'>
                    <FontAwesomeIcon icon={faQuestionCircle}
                      size="lg" className='user-circle grey'
                    />
                    Extra Data:
                </Col>
                  <Col className='' md='9'>
                    {extraData}
                  </Col>
                </Row>
                <Row className='card-row g-b-f'>
                  <Col className='mb-1 ' md='3'>
                    <FontAwesomeIcon icon={faQuestionCircle}
                      size="lg" className='user-circle grey'
                    />
                    Parent Hash:
                </Col>
                  <Col className='' md='9'>
                    <Link className='feed tx-cnt'
                      to={`/block/${parentHash}`}>{parentHash}</Link>
                  </Col>
                </Row>
                <Row className='card-row g-b-f'>
                  <Col className='mb-1 ' md='3'>
                    <FontAwesomeIcon icon={faQuestionCircle}
                      size="lg" className='user-circle grey'
                    />
                    sha3 uncles:
                </Col>
                  <Col className='' md='9'>
                    {block.sha3Uncles}
                  </Col>
                </Row>
                <Row className='card-row g-b-f'>
                  <Col className='mb-1 ' md='3'>
                    <FontAwesomeIcon icon={faQuestionCircle}
                      size="lg" className='user-circle grey'
                    />
                    sha3 uncles:
                </Col>
                  <Col className='' md='9'>
                    {block.nonce}
                  </Col>
                </Row>
              </Container>
            </CardBody>
          </Card>
        </Container>
      </Container >
    )
}

export default BlockPage