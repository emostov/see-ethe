import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons"


import { isConnected } from '../../util/meta_mask_util';
import WriteDeposit from './write_deposit';
import WriteWithdraw from './write_withdraw';

const WethWrite = () => {
  let circleClass = isConnected() ? 'user-circle green' : 'user-circle red';
  let connected = isConnected() ? 'You are connected with Meta Mask' :
    'You must connect with Meta Mask on the Rinkeby Network to use Write features';
  return (
    <div>
      <div className='d-flex justify-content-between mb-3 pt-2'>
        <p className='ft-13'>
          {}
          <FontAwesomeIcon icon={faCircle}
            size="lg" className={circleClass}
          />
          Write Contract
          </p>
        <p className='ft-13' >{connected}</p>
      </div>

      <WriteDeposit />
      <WriteWithdraw />
    </div>
  )

}

export default WethWrite;
