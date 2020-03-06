import React, { useState } from 'react';
import {
  Container, Form, FormGroup, Card, Label, Input, Button, Row, Col,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';

// TODO move this to a utility
const sliceToDisplayAddress = (address) => {
  return miner.length > 13 ? `${miner.slice(0, 10)}...` : miner
}

const BlockItem = ({ block, age, mineTime }) => {
  const { miner, transactions, number } = block
  // console.log(miner)
  // const minerDisplayName = sliceToDisplayAddress(miner)
  return (
    <div>
      <Row>
        <Col sm='4'>
          <Media className='mb-sm-0 mr-4 align-items-sm-center'>
            <div className='mr-2 d-sm-flex'>
              <span className='feed-btn'>
                <span className='feed-btn-txt'>Bk</span>
              </span>
            </div>
            <Media body>
              <a className='feed ml-1'>{number}</a>
              <span
                className='d-sm-block txt-2 ml-1 ml-sm-9 text-nowrap secondary-small'>
                {age} {/* time elapsed  */}
              </span>
            </Media>
          </Media>
        </Col>

        <Col sm='8'>
          <div className='d-flex justify-content-between'>
            <div className='text-nowrap w-max-100'>
              <span className='d-block mb-1 mb-sm-0 norm-txt'>
                {/* Miner <a className=' '>{block.miner}</a> */}
                Miner <banana className=' '>{block.miner}</banana>
                {/* text-truncate feed name */}
                {/* miner address */}
              </span>
              <a className='feed tx-cnt'>{transactions.length} txns </a>
              <span
                className='secondary-small'>
                in {mineTime} secs
              </span>
            </div>

            <div className='d-none d-sm-block'>
              <span
                className='reward-badge text-center text-nowrap'
              >
                "2"<b>.</b>"02682 Eth"
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