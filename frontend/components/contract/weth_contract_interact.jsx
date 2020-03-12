import React, { useState } from 'react'
import classnames from 'classnames';
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledCollapse,
  FormGroup,
  Form,
  Label,
  Input,
  TabContent,
  TabPane,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons"
import { faArrowDown, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

import EtherWrap from '../../contract/ether_wrap';
import WethRead from './weth_read';
import WethWrite from './weth_write';

const WethContractInteract = () => {
  const [activeTab, setActiveTab] = useState('2');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <CardBody>
      <Nav pills className='w-100'>
        <NavItem className='pill-nav-grey'>
          <NavLink className='p-1'
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Contract
          </NavLink>
        </NavItem>

        {/* <NavItem className='pill-nav-grey selected-pill'> */}
        <NavItem className='pill-nav-grey '>
          <NavLink className='p-1 '
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Read Contract
          </NavLink>
        </NavItem>

        <NavItem className='pill-nav-grey'>
          <NavLink className='p-1'
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Write Contract
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          Coming Soon... Checkout Read and Write
        </TabPane>

        <TabPane tabId="2">
          <WethRead />
        </TabPane>

        <TabPane tabId="3">
          <WethWrite />
        </TabPane>
      </TabContent>

    </CardBody>
  )
}

export default WethContractInteract;
