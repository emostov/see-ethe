import React from 'react';
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

const ContractNav = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Contract
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
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Erc20 Token Txns
          </NavLink>
        </NavItem>
      </Nav>


      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <WethContract />
        </TabPane>
        <TabPane tabId="2">
          coming soon
          
        </TabPane>
      </TabContent>
    </div>
  );
}