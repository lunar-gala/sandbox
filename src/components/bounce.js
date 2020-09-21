/**
 * A component that bounces
 */

import React from 'react';

class Bounce extends React.Component {
  render () {
    return <img src={this.props.img} alt="bouncing image" className="bounce" />;
  }
}

export default Bounce;