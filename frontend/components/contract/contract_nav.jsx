import React, { useState } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardTitle,
  CardText,
} from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"

import WethContractInteract from './weth_contract_interact'

const ContractNav = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className='w-100'>
      <Nav tabs className='g-b-f'>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Contract
            <sup>
              <FontAwesomeIcon icon={faCheckCircle}
                size="lg" className='pl-1 green'
              />
            </sup>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Transactions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Internal Txns
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Erc20 Token Txns
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}
          >
            Erc721 Token Txns
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => { toggle('6'); }}
          >
            Events
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '7' })}
            onClick={() => { toggle('7'); }}
          >
            Analytics
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <WethContractInteract />
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>Coming Soon</h4>
            </Col>
          </Row>

        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <h4>Coming Soon</h4>
            </Col>
          </Row>

        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <h4>Coming Soon</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="5">
          <Row>
            <Col sm="12">
              <h4>Coming Soon</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="6">
          <Row>
            <Col sm="12">
              <h4>Coming Soon</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="7">
          <Row>
            <Col sm="12">
              <h4>Coming Soon</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="8">
          <Row>
            <Col sm="12">
              <h4>Coming Soon</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="9">
          <Row>
            <Col sm="12">
              <h4>Coming Soon</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default ContractNav;

