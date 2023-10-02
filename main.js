import { PointerLockControls } from "./pointer";

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 1;
cam.position.x = 0;

document.body.appendChild(renderer.domElement);
var dirLight = new THREE.DirectionalLight({
  color: 0xffffff,
  intensity: 100,
});
dirLight.position.set(0, 1, 0);
dirLight.castShadow = true;
scene.add(dirLight);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// INICIALIZAÇÃO

let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);

let bGeo = new THREE.BoxGeometry(1, 1, 1);
let bMat = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  wireframe: false,
});
let cube = new THREE.Mesh(bGeo, bMat);
scene.add(cube)

let btn1 = document.querySelector("#button1");
let clock = new THREE.Clock();
let controls = new PointerLockControls(cam, renderer.domElement);

btn1.addEventListener("click", () => {
  controls.lock();
});

controls.addEventListener('lock', () => {
  btn1.innerHTML = "a"
})

controls.addEventListener('unlock', () => {
  btn1.innerHTML = "b"
})

function createPlayer() {
  const playerCam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
  playerCam.position.set(0, 1, 0);
  const playerControls = new PointerLockControls(playerCam, renderer.domElement);
  scene.add(playerCam);
  scene.add(playerControls.getObject());
  return { camera: playerCam, controls: playerControls };
}
const player = createPlayer()
player.hp = 100
player.inventory = []

const hpchange = player.hp
function addItemToInventory(item) {
  player.inventory.push(item);
}

function subtractHP(amount) {
  player.hp -= amount;
  if (player.hp <= 0) {
    console.log("morreu");
  }
}

let keyboard = [];

addEventListener("keydown", (e) => {
  keyboard[e.key] = true;
});
addEventListener("keyup", (e) => {
  keyboard[e.key] = false;
});
const getHP = document.querySelector('#hp')

function processKeyboard(delta) {
  let speed = 20
  let actualSpeed = speed * delta
  
  if(keyboard['f']) {
    speed = 20
  }
  if(keyboard['w']) {
    controls.moveForward(actualSpeed)
  }
  if(keyboard['s']) {
    controls.moveForward(-actualSpeed)
  }
  if(keyboard['a']) {
    controls.moveRight(-actualSpeed)
  }
  if(keyboard['d']) {
    controls.moveRight(actualSpeed)
  }
  if(keyboard['j']) {
    getHP.innerHTML = player.hp
  }
  if(keyboard['t']) {
    subtractHP(10)
    console.log(player.hp)
  }
  
}



function drawScene() {
  requestAnimationFrame(drawScene);
  let delta = clock.getDelta()
  processKeyboard(delta)
  renderer.render(scene, cam);
}

drawScene();
