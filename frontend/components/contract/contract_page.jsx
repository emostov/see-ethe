import React from 'react';
import Big from 'big.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"
import {
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

import EtherWrap from '../../contract/ether_wrap';
import { web3, web3Rinkeby } from '../../util/web3_util';
import { etherWrapRinkebyAddr } from '../../contract/ether_wrap';
import { numberWithCommas, } from '../../util/general_util';
import ContractNav from './contract_nav';



export default class ContractPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bigBalance: '0',
      bigEthUsd: '0',
      etherValue: '0',
    };
  }

  componentDidMount() {
    this.props.fetchPrices();
    web3Rinkeby.eth.getBalance(etherWrapRinkebyAddr)
      .then((res) => {
        // do big calcs here so don't have to do it on every render
        // combine all calcs into here just to minimizes calls to setState
        const ethBalance = web3.utils.fromWei(res, 'ether')
          .toString();
        const bigEthBalance = new Big(ethBalance, 10);
        const bigEthUsd = this.props.ethusd ?
          new Big(this.props.ethusd, 10) : new Big(150, 10);
        const etherValue = bigEthUsd.mul(bigEthBalance)
          .toString();
        this.setState({
          bigBalance: bigEthBalance,
          bigEthUsd,
          etherValue,
        })
      });
    // total supply returns a much bigger number then address balance
    // EtherWrap.methods.totalSupply()
  }

  getEtherValue() {
    const { etherValue } = this.state;
    const { ethusd } = this.props;
    if (!etherValue || !ethusd) return (<Spinner color='dark' />);
    const valC = numberWithCommas(etherValue.slice(0, 9));
    return `$${valC}${etherValue.slice(9, 12)} (@ ${ethusd}/ETH)`
  }



  render() {

    const { bigBalance } = this.state;
    return (
      <Container className='inner'>
        <div
          className='block-page-header d-flex flex-row btm-divider header-block pb-1'>
          <div className='mb-2  d-flex flex-row  '>
            <img className='contract-av' src={window.imgs.wethLogo} />
            <div><h1 className='mb-0 grey'>Contract </h1></div>
            <div>
              <span className='sub-txt-3'>
                &nbsp; 0xc778417E063141139Fce010982780140Aa0cD5Ab &nbsp;
                (Rinkeby Test Net)
              </span>
            </div>
          </div>
        </div>

        <Container className='inner'>

          {/* card left */}
          <Row className='mb-4 w-100'>
            <Col className=' std-p mb-0' md='6'>
              <Card className='height-all'>
                <CardHeader
                  className='d-flex justify-content-between align-items-center p-m' >
                  <h2 className='pain-nav-link card-title p-0 m-0'>
                    Contract Overview
                  </h2>
                  <div className='foriegn-label'>
                    Wrapped Ether
                    <a href='https://weth.io/'>
                      <FontAwesomeIcon icon={faExternalLinkAlt}
                        size="lg" className='pl-1'
                      />
                    </a>
                  </div>
                </CardHeader>
                <CardBody className='g-b-f p-m clr-blk'>
                  <Row className='b-btm-line p-b-md align-items-center'>
                    <Col className='mb-0 clr-blk' md='4'>
                      Balance:
                    </Col>
                    <Col md='8'>
                      {bigBalance.toString().slice(0, 25)} Ether
                    </Col>
                  </Row>
                  <Row className='b-btm-line p-y-md'>
                    <Col className='mb-0 ' md='4'>
                      Ether Value:
                    </Col>
                    <Col md='8'>
                      {this.getEtherValue()}
                    </Col>
                  </Row>
                  <Row className='p-y-md'>
                    <Col className='mb-0 ' md='4'>
                      Token:
                    </Col>
                    <Col md='8'>
                      feature coming soon
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            {/* card right */}
            <Col className=' std-p mb-0' md='6'>
              <Card className='height-all'>
                <CardHeader
                  className='d-flex justify-content-between align-items-center p-m' >
                  <h2 className='pain-nav-link card-title p-0 m-0'>
                    More Info
                  </h2>
                </CardHeader>
                <CardBody className='g-b-f p-m clr-blk'>
                  <Row className='b-btm-line p-b-md align-items-center'>
                    <Col className='mb-0 ' md='4'>
                      <FontAwesomeIcon icon={faQuestionCircle}
                        size="lg" className='user-circle grey'
                      />
                      My Name Tag:
                    </Col>
                    <Col md='8'>
                      feature coming soon
                    </Col>
                  </Row>
                  <Row className='b-btm-line p-y-md'>
                    <Col className='mb-0 ' md='4'>
                      Creator
                    </Col>
                    <Col md='8'>
                      <a href='https://rinkeby.etherscan.io/address/0x4f26ffbe5f04ed43630fdc30a87638d53d0b0876'
                        className='active feed name'>
                        0x4F26FfBe5F04ED43...
                      </a>
                      &nbsp;at txn&nbsp;
                      <a href='https://rinkeby.etherscan.io/tx/0x7bc8e85f99556aa23a41dd3c107e92ec76f057e4cea39f376ffb1b15d514b11f'
                        className='active feed name'>
                        0x7bc8e85f99556aa...
                      </a>

                    </Col>
                  </Row>
                  <Row className='p-y-md'>
                    <Col className='mb-0 ' md='4'>
                      Tracker:
                    </Col>
                    <Col md='8'>
                      <img className='contract-av' src={window.imgs.wethLogo} />
                      <a href='https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
                        className='active feed name'>
                        Wrapped Ether (WETH)
                      </a>

                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>

        <Card className='w-100'>
          <ContractNav />
        </Card>


      </Container>
    )
  }
}
