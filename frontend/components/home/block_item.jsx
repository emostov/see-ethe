import React from 'react';
import { Row, Col, Media, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { sliceToDisplayAddress } from '../../util/general_util'

const BlockItem = ({ block, age, mineTime, reward, minerTag }) => {
  const { miner, transactions, number } = block
  const minerDisplayName = minerTag ? minerTag.name
    : sliceToDisplayAddress(miner)

  return (
    <div>
      <Row className='feed'>
        <Col sm='5'>
          <Media className='mb-sm-0 mr-4 align-items-sm-center feed'>
            <div className='mr-2 d-sm-flex'>
              <span className='feed-btn'>
                <span className='feed-btn-txt'>Bk</span>
              </span>
            </div>
            <Media body className='feed ml-1'>
              <Link className='feed ml-1'
                to={`/block/${block.hash}`}>{number}</Link>
              <span
                className='d-sm-block txt-2 ml-1 ml-sm-9 text-nowrap secondary-small'>
                {age}
              </span>
            </Media>
          </Media>
        </Col>

        <Col sm='7'>
          <div className='d-flex justify-content-between'>
            <div className='text-nowrap w-max-100'>
              <span className='d-block mb-1 mb-sm-0 norm-txt'>
                Miner <a className='text-truncate feed name '>{minerDisplayName}</a>

              </span>
              {/* <a className='feed tx-cnt'>{transactions.length} txns </a> */}
              <Link className='feed tx-cnt'
                to={`/block/${block.hash}`}>{transactions.length} txns </Link>
              <span
                className='secondary-small'>
                in {mineTime} secs
              </span>
            </div>

            <div className='d-none d-sm-block reward'>
              <span
                className='reward-badge text-center text-nowrap'
              >
                {reward} Eth
              </span>
            </div>
          </div>
        </Col>

      </Row>
      <hr className='feed-hr' />
    </div>
  )
}

export default BlockItem