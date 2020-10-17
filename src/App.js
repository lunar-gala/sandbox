import React from 'react';

// Main components
import Header from './components/header';

// Scenes
import Cube from './components/cube';
import Scene from './components/scene';
import Scene2 from './components/scene2';
import Scene_Materials from './components/scene_materials';
import Scene_Explosion from './components/scene_explosion';
import Scene_Points from './components/scene_points';

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Header />
        <Scene_Explosion />
        <Scene_Points />
        <Cube />
        <Scene_Materials />
        <Scene2 />
        <Scene />
      </div>
    );
  }
}

export default App;