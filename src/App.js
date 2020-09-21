import React from 'react';
import Bounce from './components/bounce';
import Person from './components/person';
import Swirl from './components/swirl';

// image impors
import IMG_MASK from '../assets/img/mask.png';

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Bounce img={IMG_MASK} />
        <Person />
        <Swirl />
      </div>
    );
  }
}

export default App;