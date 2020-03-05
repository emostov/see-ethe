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


const BlockItem = ({ block, age }) => {
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
              <a className='feed ml-1'>{block.number}</a>

              {/* time elapsed  */}
              <span
                className='d-sm-block txt-2 ml-1 ml-sm-9 text-nowrap secondary-small'>
                {age}
              </span>
            </Media>
          </Media>
        </Col>

        <Col sm='8'>

        </Col>
      </Row>
      <hr className='feed-hr' />
    </div>

  )
}

export default BlockItem