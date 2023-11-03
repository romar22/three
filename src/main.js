import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import colorTextureImage from '../static/textures/minecraft.png';
import alphaTextureImage from '../static/textures/door/alpha.jpg';
import heightTextureImage from '../static/textures/door/height.jpg';
import normalTextureImage from '../static/textures/door/normal.jpg';
import ambientOcclusionTextureImage from '../static/textures/door/ambientOcclusion.jpg';
import metalnessTextureImage from '../static/textures/door/metalness.jpg';
import roughnessTextureImage from '../static/textures/door/roughness.jpg';

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('started');
};
loadingManager.onLoad = () => {
    console.log('loaded');
};
loadingManager.onProgress = () => {
    console.log('progress');
};
loadingManager.onError = () => {
    console.log('error');
}


const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(colorTextureImage);
const alphaTexture = textureLoader.load(alphaTextureImage);
const heightTexture = textureLoader.load(heightTextureImage);
const normalTexture = textureLoader.load(normalTextureImage);
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionTextureImage);
const metalnessTexture = textureLoader.load(metalnessTextureImage);
const roughnessTexture = textureLoader.load(roughnessTextureImage);

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;

// makes the texture blurry sharp
colorTexture.magFilter = THREE.NearestFilter;

// Canvas
const canvas = document.querySelector('.canvas');

// Scene
const scene = new THREE.Scene();


// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


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

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 1.5;
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



