/**
 * Header screen
 */

import React from 'react';
import LG_LOGO from '../../assets/logo/LGLogo_halfW_black.svg';


class Header extends React.Component {
  render () {
    let loading_text = '';

    for (let i = 0; i < 10; i ++) {
      loading_text += 'SANDBOX';
    }

    return <div className='header'>
      <div className='marquee'>
        <span>
          {loading_text}
        </span>
      </div>
      <img className='header-logo' src={LG_LOGO} />
    </div>;
  }
}

export default Header;