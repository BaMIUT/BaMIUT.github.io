import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Box
const geometryBox = new THREE.BoxGeometry( 1, 1, 1 );
const materialBox = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh( geometryBox, materialBox );
scene.add( cube );

// Sphere
const geometrySphere = new THREE.SphereGeometry(0.8, 32, 32);
const materialSphere = new THREE.MeshStandardMaterial( { color: 0x6bcf7f } );
const sphere = new THREE.Mesh( geometrySphere, materialSphere );
sphere.position.set( 3, 0, 0 );
scene.add( sphere );

const loader = new GLTFLoader();

// Donut
loader.load(
  'models/donut.glb',
  ( gltf ) => {
    const donut = gltf.scene;
    donut.scale.set( 2, 2, 2 );
    torus.material.visible = false;
    torus.add( donut );
  },
  undefined,
  ( erreur ) => { console.error( 'Erreur de chargement :', erreur ); }
);

// Torus
const geometryTorus = new THREE.TorusGeometry( 0.5, 0.2, 16, 100 );
const materialTorus = new THREE.MeshStandardMaterial( { color: 0x4d94ff } );
const torus = new THREE.Mesh( geometryTorus, materialTorus );
torus.position.set( -3, 0, 0 );
scene.add( torus );

camera.position.z = 5;

// Projecteur (SpotLight)
const spotLight = new THREE.SpotLight( 0xb4e7f2, 100 );
spotLight.angle = Math.PI / 5;
spotLight.penumbra = 0.8;
spotLight.position.set( 0, 5, 5 );
scene.add( spotLight );

// Lumière ambiante (éclaire tout un peu, sans direction)
const ambientLight = new THREE.AmbientLight( 0x404040 );
scene.add( ambientLight );

function animate( time ) {

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  torus.rotation.x = time / 2000;
  torus.rotation.y = time / 1000;
  
  sphere.rotation.x = time / 2000;
  sphere.rotation.y = time / 1000;

  renderer.render( scene, camera );

}