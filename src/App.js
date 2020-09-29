import React from 'react';
import Scene from './components/scene';
import Scene2 from './components/scene2';
import Header from './components/header';

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Header />
        <Scene />
        <Scene2 />
      </div>
    );
  }
}

export default App;