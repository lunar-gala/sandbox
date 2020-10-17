/**
* three.js demo
*/

import React from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import cube_fragments from '../../assets/models/fractured_cube/fracturedCube.obj';
import cube_skin from '../../assets/models/fractured_cube/fracturedCube.mtl';

class Scene_Explosion extends React.Component {
  componentDidMount() {
    const canvas = document.querySelector('#scene-canvas-explosion');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 10000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.x = 1000;
    camera.position.y = 1000;
    camera.position.z = 1000;

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

    let cube_children = [];

    mtl_loader.load(
      cube_skin,
      (materials) => {
        materials.preload();

        obj_loader.setMaterials(materials);
        // load a resource
        obj_loader.load(
          // resource URL
          cube_fragments,
          // called when resource is loaded
          function (object) {
            scene.add(object);

            object.traverse( child => {
              let bbox = new THREE.Box3().setFromObject(child);
              cube_children.push({
                obj: child,
                vector: bbox.max
              });
            });

            // Center vectors
            let centroid = new THREE.Vector3(0, 0, 0);

            cube_children.map(e => centroid.add(e.vector));

            centroid = centroid.divideScalar(cube_children.length);

            cube_children.map(e => e.vector.sub(centroid));
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
        function render_cube (time) {
          if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          }

          // Update cube positions
          for (let i = 0; i < cube_children.length; i++) {
            let curr_cube = cube_children[i].obj;
            if (time / 1000 < 3) {
              // Buildup before explosion
              curr_cube.position.x = curr_cube.position.x + (Math.random() - 0.5);
              curr_cube.position.y = curr_cube.position.y + (Math.random() - 0.5);
              curr_cube.position.z = curr_cube.position.z + (Math.random() - 0.5);
            } else if (time / 1000 < 3.5) {
              // Explosion time
              let curr_factor = Math.pow((time/1000 - 3) / 70, 0.1);

              curr_cube.position.x += curr_factor * cube_children[i].vector.x;
              curr_cube.position.y += curr_factor * cube_children[i].vector.y;
              curr_cube.position.z += curr_factor * cube_children[i].vector.z;
            }
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
        <h1>3D FRACTURED EXPLOSION</h1>
        <canvas id='scene-canvas-explosion' className='scene-canvas' />
        </div>;
      }
    }

    export default Scene_Explosion;