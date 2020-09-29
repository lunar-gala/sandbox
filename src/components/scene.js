/**
 * three.js demo
 */

import React from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import cannon from '../../assets/models/cannon/model.obj';
import cannon_skin from '../../assets/models/cannon/materials.mtl';

class Scene extends React.Component {
  componentDidMount() {
    const canvas = document.querySelector('#scene-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const scene = new THREE.Scene();

    const controls = new OrbitControls(camera, renderer.domElement);

    // Add a light
    const color = 0xFFFFFF;
    const intensity = 0.5;
    const light_amb = new THREE.AmbientLight(color, intensity);
    const light_dir = new THREE.DirectionalLight(color, intensity*2);
    light_dir.position.set(0, 1, 4);
    scene.add(light_amb);
    scene.add(light_dir);

    // Add object
    // instantiate a loader
    const obj_loader = new OBJLoader();

    const mtl_loader = new MTLLoader();

    mtl_loader.load(
      cannon_skin,
      (materials) => {
        materials.preload();

        obj_loader.setMaterials(materials);
        // load a resource
        obj_loader.load(
          // resource URL
          cannon,
          // called when resource is loaded
          function (object) {
            scene.add(object);
          },
          // called when loading is in progresses
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          // called when loading has errors
          function (error) {
            console.log('An error happened', error);
          }
        );
      }
    );


    // Resize if needed
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

    // requestAnimationFrame passes time in as seconds
    function render_cube() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();

      controls.update();

      renderer.render(scene, camera);

      requestAnimationFrame(render_cube);
    }
    requestAnimationFrame(render_cube);
  }

  render() {
    return <div className='scene-wrapper'>
      <h1>3D EXAMPLE</h1>
      <canvas id='scene-canvas' className='scene-canvas' />
    </div>;
  }
}

export default Scene;