import React from 'react';
import { Row, Col, Media, } from 'reactstrap';

import { sliceToDisplayAddress } from '../../util/general_util';
import { web3 } from '../../util/web3_util'

const convertWeiToShowValue = (wei) => web3.utils.fromWei(wei, 'ether').slice(0, 8)

const TransactionItem = ({ tx, age }) => {
  if (!tx) return(
    <div> </div>
  )
  const { hash } = tx;
  // console.log(tx)
  // console.log('transactionHash', hash)
  return (
    <div>
      <Row className='feed'>
        <Col sm='5'>
          <Media className='mb-sm-0 mr-4 align-items-sm-center feed'>
            <div className='mr-2 d-sm-flex'>
              <span className='feed-btn circle'>
                <span className='feed-btn-txt '>Tx</span>
              </span>
            </div>
            <Media body className='feed ml-1'>
              <a className='feed ml-1'>{sliceToDisplayAddress(hash)}</a>
              <span
                className='d-sm-block txt-2 ml-1 ml-sm-9 text-nowrap secondary-small'>
                {age} {/* time elapsed  */}
              </span>
            </Media>
          </Media>
        </Col>

        <Col sm='7'>
          <div className='d-flex justify-content-between'>
            <div className='text-nowrap w-max-100'>
              <span className='d-block mb-1 mb-sm-0 norm-txt'>
                From: <a className='text-truncate feed name'>{sliceToDisplayAddress(tx.from)}</a>
              </span>
              <span className='d-sm-block norm-txt'>
                To: <a className='text-truncate feed name'>{sliceToDisplayAddress(tx.to)}</a>
              </span>
            </div>

            <div className='d-none d-sm-block reward'>
              <span
                className='reward-badge text-center text-nowrap'
              >{convertWeiToShowValue(tx.value)} Eth
              </span>
            </div>
          </div>
        </Col>

      </Row>
      <hr className='feed-hr' />
    </div>
  )
}

export default TransactionItem;