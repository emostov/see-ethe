import React from 'react';
import { Container, Form, FormGroup, Card, Label, Input, Button, Row, Col } from 'reactstrap';

const Home = () => {


  const HomeSearchBar = () => {
    return (
      <div className='main-contents'>
        <Card body className='gradient-half-primary-body' >

          <div className='searchHeader'>
            <h5 className='white-text'>
              Ethereum Block Chain Explorer
            </h5>
            <div>
              <div className='quick-links white-text'>
                <div className='small-text '>Quick links</div>
                <ul>
                  <li>ERC-20 Quick Links</li>
                  <li>ERC-721 Quick Links</li>
                </ul>
              </div>
            </div>
            
          </div>
          <Form inline>
            <FormGroup>
              {/* <Label for="exampleSelect" sm={2}></Label> */}
              {/* <Col sm={10}> */}
              <Input type="select" name="select" id="exampleSelect">
                <option className={'arrow-select'} >All Filters</option>
                <option>Addresses</option>
                <option>Tokens</option>
                <option>Name Tags</option>
                <option>Labels</option>
                <option>Websites</option>
              </Input>
              {/* </Col> */}
              <Input type="text" name="searchInput" id="searchInpput"
                placeholder="Search by Address / Txn Hash / Block / Token / Ethe" />
            </FormGroup>
            {' '}
            <Button>Seach</Button>
          </Form>
        </Card>
      </div>
    )
  }

  return (
    // <Container className='container'>
    <div>
      {HomeSearchBar()}
      {/* Network Overview */}
      {/* BlockAndTransactionFeeds */}
    </div>
    // </Container>
  )
}

export default Home;