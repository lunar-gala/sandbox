/**
 * Dress someone up
 */

import React from 'react';
import face from '../../assets/img/mask.png';
import hat from '../../assets/img/sombrero.png';
import jacket from '../../assets/img/jacket.png';

class Person extends React.Component {
  render () {
    return <div className='person'>
      <img src={face} className='face' />
      <img src={hat} className='hat' />
      <img src={jacket} className='jacket' />
    </div>
  }
}

export default Person;