/**
 * three.js demo
 */

import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Cube extends React.Component {
  componentDidMount() {
    const canvas = document.querySelector('#scene-canvas-cube');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    const scene = new THREE.Scene();

    // Create cube scaffold
    const cube_padding = 0.5;
    const size = 2;
    const cube_size = size - cube_padding;
    const NUM_CUBES = 6;
    const COLOR_CUBE_EDGE = 0xffffff;
    const max_size = 20 * cube_size;

    let rectangles = {
      front: [],
      bottom: [],
      side: []
    }

    // Facing panel
    for (let x = 0; x < NUM_CUBES; x++) {
      for (let y = 0; y < NUM_CUBES; y++) {
        let boxGeometry = new THREE.BoxBufferGeometry(cube_size, cube_size, max_size)
        let geometry = new THREE.EdgesGeometry(boxGeometry);
        const material = new THREE.MeshBasicMaterial({ color: 0x0 });
        const cube = new THREE.Mesh(boxGeometry, material);
        let edges = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: COLOR_CUBE_EDGE }));
        edges.position.set(size * x + size / 2, size * y + size / 2, -max_size / 2);
        cube.position.set(size * x + size / 2, size * y + size / 2, -max_size / 2);

        scene.add(edges);
        scene.add(cube);
        rectangles.front.push({
          outline: cube,
          rect: edges,
          seed: Math.random()
        });
      }
    }

    // Bottom panel
    for (let x = 0; x < NUM_CUBES; x++) {
      for (let y = 0; y < NUM_CUBES; y++) {
        let boxGeometry = new THREE.BoxBufferGeometry(cube_size, cube_size, max_size)
        let geometry = new THREE.EdgesGeometry(boxGeometry);
        let edges = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: COLOR_CUBE_EDGE }));
        const material = new THREE.MeshBasicMaterial({ color: 0x0 });
        const cube = new THREE.Mesh(boxGeometry, material);
        edges.rotateX(Math.PI / 2);
        edges.position.set(size * x + size / 2, -max_size / 2, size * y + size / 2);
        cube.rotateX(Math.PI / 2);
        cube.position.set(size * x + size / 2, -max_size / 2, size * y + size / 2);

        scene.add(edges);
        scene.add(cube);
        rectangles.bottom.push({
          outline: cube,
          rect: edges,
          seed: Math.random()
        });
      }
    }

    // Side panel
    for (let x = 0; x < NUM_CUBES; x++) {
      for (let y = 0; y < NUM_CUBES; y++) {
        let boxGeometry = new THREE.BoxBufferGeometry(cube_size, cube_size, max_size)
        let geometry = new THREE.EdgesGeometry(boxGeometry);
        let edges = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: COLOR_CUBE_EDGE }));

        const material = new THREE.MeshBasicMaterial({ color: 0x0 });
        const cube = new THREE.Mesh(boxGeometry, material);

        edges.rotateY(Math.PI / 2);
        edges.position.set(-max_size / 2, size * x + size / 2, size * y + size / 2);

        cube.rotateY(Math.PI / 2);
        cube.position.set(-max_size / 2, size * x + size / 2, size * y + size / 2);

        scene.add(edges);
        scene.add(cube);

        rectangles.side.push({
          outline: cube,
          rect: edges,
          seed: Math.random()
        });
      }
    }

    const fov = 60;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    const CAMERA_POS = 15;
    camera.position.set(CAMERA_POS, CAMERA_POS, CAMERA_POS);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Add a light
    const color = 0xFFFFFF;
    const intensity = 0.5;
    const light_amb = new THREE.AmbientLight(color, intensity);
    scene.add(light_amb);

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
    function render(time) {
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

      const SEED_AMPLIFIER = 5;
      const AMPLITUDE = 0.01;
      const SPEED = 0.005;
      // Animate rectangle block
      for (let i = 0; i < rectangles.front.length; i++) {
        let curr_box = rectangles.front[i];

        curr_box.rect.position.z += AMPLITUDE * Math.sin(SPEED * time + curr_box.seed * SEED_AMPLIFIER);
        curr_box.outline.position.z += AMPLITUDE * Math.sin(SPEED * time + curr_box.seed * SEED_AMPLIFIER);
      }
      for (let i = 0; i < rectangles.bottom.length; i++) {
        let curr_box = rectangles.bottom[i];

        curr_box.rect.position.y += AMPLITUDE * Math.sin(SPEED * time + curr_box.seed * SEED_AMPLIFIER);
        curr_box.outline.position.y += AMPLITUDE * Math.sin(SPEED * time + curr_box.seed * SEED_AMPLIFIER);
      }
      for (let i = 0; i < rectangles.side.length; i++) {
        let curr_box = rectangles.side[i];

        curr_box.rect.position.x += AMPLITUDE * Math.sin(SPEED * time + curr_box.seed * SEED_AMPLIFIER);
        curr_box.outline.position.x += AMPLITUDE * Math.sin(SPEED * time + curr_box.seed * SEED_AMPLIFIER);
      }

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  render() {
    return <div className='scene-wrapper'>
      <h1>3D CUBE</h1>
      <canvas id='scene-canvas-cube' className='scene-canvas' />
    </div>;
  }
}

export default Cube;
