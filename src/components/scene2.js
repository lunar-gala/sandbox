/**
 * three.js demo
 */

import React from 'react';
import * as THREE from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import model from '../../assets/models/test/model.obj';

class Scene2 extends React.Component {
  componentDidMount() {
    const canvas = document.querySelector('#scene-canvas-2');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 10000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 300, -1500);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    {
      const skyColor = 0xB1E1FF;  // light blue
      const groundColor = 0xB97A20;  // brownish orange
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 0);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
    }

    let object_pointer;

    const objLoader = new OBJLoader2();
    objLoader.load(model, (root) => {
      object_pointer = root;
      scene.add(root);
    });

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render(time) {
      time *= 0.001;

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      if (object_pointer) {
        object_pointer.rotation.x = 0.1*time;
        object_pointer.rotation.y = time;
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  render() {
    return <div className='scene-wrapper'>
      <h1>3D With Spin</h1>
      <canvas id='scene-canvas-2' className='scene-canvas' />
    </div>;
  }
}

export default Scene2;
