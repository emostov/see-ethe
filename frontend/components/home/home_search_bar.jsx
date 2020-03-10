import React, { useState } from 'react';
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom";
import {
  Container,
  Card,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
} from 'reactstrap';

const HomeSearchBar = ({ blocks }) => {
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);

  const updateSearchTerm = (e) => setSearchTerm(e.currentTarget.value);

  const redirectToBlockPage = (hash) => {
    const history = useHistory();
    // console.log(hash)
    // console.log('block')
    console.log(`/block/${hash}`)
    // history.push(path);
  }

  const searchBlock = () => {
    const searchTrimmed = searchTerm.trim();
    console.log('this is the current search term', searchTrimmed);
    if (blocks[searchTrimmed] !== undefined) {
      redirectToBlockPage(searchTrimmed);
      return;
    }

    Object.values(blocks).forEach((block) => {
      console.log(block)
      if (block.number.toString() === searchTrimmed) {
        console.log('blocknumber:', block.number.toString());
        console.log('searchterm', searchTrimmed);
        const hash = block.hash.toString();
        redirectToBlockPage(hash);
        return;
      }
    })
    setVisible(true);
  }

  // redirectToBlockPage('helllllloooooo')

  return (
    <Container fluid="lg" className='md-4'>
      <div className='main-contents'>
        <Card body className='gradient-half-primary-body' >
          <div className='search-header'>
            <h5 className='white-text'>
              Ethereum Block Chain Explorer
              </h5>
            <div className='quick-links white-text'>
              <ul className='small-text'>
                <li className='small-text'>Quick links: </li>
                <li className='small-text dt'>ERC-20 Quick Links</li>
                <li className='small-text dt'>ERC-721 Quick Links</li>
              </ul>
            </div>
          </div>
          <InputGroup>
            <InputGroupButtonDropdown addonType="prepend"
              isOpen={splitButtonOpen} toggle={toggleSplit}>
              <DropdownToggle split className='white-btn mid-search-txt' >All Filters  </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='nf' disabled>Comming soon...</DropdownItem>
                <DropdownItem className='nf' disabled>...</DropdownItem>
                <DropdownItem className='nf' disabled>...</DropdownItem>
                <DropdownItem className='nf' disabled>...</DropdownItem>
                <DropdownItem className='nf' disabled>...</DropdownItem>

              </DropdownMenu>
            </InputGroupButtonDropdown >
            <Input
              className='mid-search-txt'
              placeholder="Search by block height or hash (use the feed for block info)"
              value={searchTerm}
              onChange={updateSearchTerm}
            />
            <InputGroupAddon addonType="append">
              <Button
                className='search-btn'
                color="secondary"
                onClick={searchBlock}
              >Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Card>
      </div>
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        Sorry, we could not find a block using the provided search term. Search ability is limited to exact matches of blocks in the below feed.
    </Alert>
    </Container>
  )
}

export default HomeSearchBar;
