const host = 'http://localhost:1234';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
/**
 * Debug
 */
const gui = new dat.GUI();

// Textures

// Font loader
const fontLoader = new FontLoader();
fontLoader.load(
    `${host}/helvetiker_regular.typeface.json`,
    (font) => {
        const textGeometry = new TextGeometry(
            'Sheeeesh',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        );
        textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // );
        textGeometry.center();
        const material = new THREE.MeshNormalMaterial({
            // wireframe: true
        });
        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);

        console.time('test');

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

        for(let i = 0; i < 100; i++){
            const donut = new THREE.Mesh(donutGeometry, material);

            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;
            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);

            scene.add(donut);
        }

        console.timeEnd('test');
    }
);


// Canvas
const canvas = document.querySelector('.canvas');

// Scene
const scene = new THREE.Scene();

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Objects
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// );
// scene.add(cube);


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 1.4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// Animations
(function tick() {
    // Clock
    const elapsedTime = clock.getElapsedTime();

    // Update objects

    // Update controls
    controls.update();

    // render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
})();



