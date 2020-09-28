import React from 'react';
import Bounce from './components/bounce';
import Person from './components/person';
import Swirl from './components/swirl';
import Scene from './components/scene';
import Header from './components/header';

// image impors
import IMG_MASK from '../assets/img/mask.png';

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Header />
        <Scene />
      </div>
    );
  }
}

export default App;