import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import colorTextureImage from '../static/textures/door/color.jpg';
import alphaTextureImage from '../static/textures/door/alpha.jpg';
import heightTextureImage from '../static/textures/door/height.jpg';
import normalTextureImage from '../static/textures/door/normal.jpg';
import ambientOcclusionTextureImage from '../static/textures/door/ambientOcclusion.jpg';
import metalnessTextureImage from '../static/textures/door/metalness.jpg';
import roughnessTextureImage from '../static/textures/door/roughness.jpg';
import matcap from '../static/textures/matcaps/8.png';
import gradient from '../static/textures/gradients/5.jpg';
import * as dat from 'dat.gui';

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load(colorTextureImage);
const alphaTexture = textureLoader.load(alphaTextureImage);
const heightTexture = textureLoader.load(heightTextureImage);
const normalTexture = textureLoader.load(normalTextureImage);
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionTextureImage);
const metalnessTexture = textureLoader.load(metalnessTextureImage);
const roughnessTexture = textureLoader.load(roughnessTextureImage);
const matcapTexture = textureLoader.load(matcap);
const gradientTexture = textureLoader.load(gradient);
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;


const cubeTextureLoader = new THREE.CubeTextureLoader();
import px from '../static/textures/environmentMaps/0/px.jpg';
import nx from '../static/textures/environmentMaps/0/nx.jpg';
import py from '../static/textures/environmentMaps/0/py.jpg';
import ny from '../static/textures/environmentMaps/0/ny.jpg';
import pz from '../static/textures/environmentMaps/0/pz.jpg';
import nz from '../static/textures/environmentMaps/0/nz.jpg';
const environmentMapTexture = cubeTextureLoader.load([
    px, nx,
    py, ny,
    pz, nz,
]);

// Canvas
const canvas = document.querySelector('.canvas');

// Scene
const scene = new THREE.Scene();

// Objects

// const material = new THREE.MeshBasicMaterial({
//     map: colorTexture,
//     wireframe: true,
// });
// material.color.set(0x00ff00);
// material.color = new THREE.Color('yellow');
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = alphaTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
// material.map = colorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = alphaTexture;
material.envMap = environmentMapTexture;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001);
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);

material.side = THREE.DoubleSide;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
);
sphere.position.x = -1.5;
sphere.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(sphere.geometry.attributes.uv.array, 2));

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
);
plane.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2));

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
);
torus.position.x = 1.5;
torus.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(torus.geometry.attributes.uv.array, 2));

scene.add(sphere, plane, torus);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 1;
scene.add(pointLight);


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
camera.position.z = 3;
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
    sphere.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;

    plane.rotation.x = 0.15 * elapsedTime;
    sphere.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

    // Update controls
    controls.update();

    // render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
})();



