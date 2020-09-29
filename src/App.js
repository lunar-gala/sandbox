import React from 'react';

// Main components
import Header from './components/header';

// Scenes
import Cube from './components/cube';
import Scene from './components/scene';
import Scene2 from './components/scene2';

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Header />
        <Cube />
        <Scene2 />
        <Scene />
      </div>
    );
  }
}

export default App;