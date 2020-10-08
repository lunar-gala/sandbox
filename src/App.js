import React from 'react';
import Bounce from './components/bounce';
import Person from './components/person';
import Swirl from './components/swirl';

// image impors
import IMG_MASK from '../assets/img/mask.png';

class App extends React.Component {
  render () {
<<<<<<< HEAD
    return <div>Playground
      <a href="liveUpdate/index.ts"></a>
    </div>;
=======
    return (
      <div className='app'>
        <Bounce img={IMG_MASK} />
        <Person />
        <Swirl />
      </div>
    );
>>>>>>> 7ba8d5d8ea9f5bce47bf50a89b26e1ec9e1f5c19
  }
}

export default App;