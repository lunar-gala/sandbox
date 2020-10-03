/**
 * three.js demo
 */

import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Scene_Materials extends React.Component {
  componentDidMount() {
    const canvas = document.querySelector('#scene-canvas-materials');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    const controls = new OrbitControls(camera, canvas);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    let geometries = [];
    geometries[0] = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    geometries[1] = new THREE.BoxGeometry(1,1,1);
    geometries[2] = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    geometries[3] = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    let material = [];
    material[0] = new THREE.MeshBasicMaterial({color: 0x44aa88});
    material[1] = new THREE.MeshPhysicalMaterial({color: 0x44aa88});
    material[2] = new THREE.MeshDistanceMaterial({color: 0x44aa88});
    material[3] = new THREE.MeshLambertMaterial({color: 0x44aa88});
    material[4] = new THREE.MeshPhongMaterial({color: 0x44aa88});
    material[5] = new THREE.MeshToonMaterial({color: 0x44aa88});

    const cube = new THREE.Mesh(geometries[0], material[0]);
    cube.position.y = 2;
    cube.position.x = -3;
    scene.add(cube);

    const cube2 = new THREE.Mesh(geometries[1], material[1]);
    cube2.position.y = 2;
    cube2.position.x = 0;
    scene.add(cube2);

    const cube3 = new THREE.Mesh(geometries[0], material[2]);
    cube3.position.y = 2;
    cube3.position.x = 3;
    scene.add(cube3);

    const cube4 = new THREE.Mesh(geometries[0], material[3]);
    cube4.position.y = -2;
    cube4.position.x = -3;
    scene.add(cube4);

    const cube5 = new THREE.Mesh(geometries[0], material[4]);
    cube5.position.y = -2;
    cube5.position.x = 0;
    scene.add(cube5);

    const cube6 = new THREE.Mesh(geometries[0], material[5]);
    cube6.position.y = -2;
    cube6.position.x = 3;
    scene.add(cube6);

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 0);
      light.target.position.set(5, 0, 2);
      scene.add(light);
      scene.add(light.target);
    }
    {
      const color = 0xFFFFFF;
      const intensity = 0.4;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 0);
      light.target.position.set(0, 0, 5);
      scene.add(light);
      scene.add(light.target);
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

      cube.rotation.x = time;
      cube.rotation.y = time;
      cube2.rotation.x = time;
      cube2.rotation.y = time;
      cube3.rotation.x = time;
      cube3.rotation.y = time;
      cube4.rotation.x = time;
      cube4.rotation.y = time;
      cube5.rotation.x = time;
      cube5.rotation.y = time;
      cube6.rotation.x = time;
      cube6.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  render() {
    return <div className='scene-wrapper'>
      <h1>3D Materials</h1>
      <canvas id='scene-canvas-materials' className='scene-canvas' />
    </div>;
  }
}

export default Scene_Materials;
