import React from 'react';

function createRings (n) {
  let rings = [];

  for (let i = 1; i <= n; i++) {
    rings.push(
      <polygon className={`triangle triangle-${i}`} points="500,200 759,650 241,650" />
    );
  }

  return rings;
}

class Swirl extends React.Component {
  render () {
    return (
      <div className='swirl'>
        <svg className="triangle-canvas" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          {createRings(20)}
      </svg>
      </div>
    );
  }
}

export default Swirl;