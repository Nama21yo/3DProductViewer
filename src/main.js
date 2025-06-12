import { initializeScene } from "./modules/initScene.js";
import { createProduct } from "./modules/createProduct.js";
import { addLighting } from "./modules/addLighting.js";
import {
  setupCameraControls,
  updateCameraAnimation,
  setOrbitControlsEnabled,
} from "./modules/cameraAnimation.js";
import {
  setupInteraction,
  updateProductAnimation,
} from "./modules/interaction.js";

// --- MAIN APPLICATION ---

// 1. STATE MANAGEMENT
const appState = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  clock: null,
  productGroup: null, // Will be populated by createProduct
  autoRotate: true,
  userInteracting: false, // Track user interaction for override
};

// 2. INITIALIZATION
function init() {
  const canvas = document.querySelector("canvas.webgl");

  // Initialize core components and populate appState
  initializeScene(appState, canvas);

  // Create the 3D objects (centered at origin)
  createProduct(appState);

  // Add lighting
  addLighting(appState);

  // Setup camera controls and interaction
  setupCameraControls(appState);
  setupInteraction(appState);

  // Start the animation loop
  animate();
}

// 3. ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  // Update camera animation (auto-rotate)
  updateCameraAnimation(appState);

  // Update mesh animation (floating/pulsing effect)
  updateProductAnimation(appState);

  // Update controls if not auto-rotating
  if (appState.controls && !appState.autoRotate) {
    appState.controls.update();
  }

  // Render the scene
  appState.renderer.render(appState.scene, appState.camera);
}

// --- START THE APPLICATION ---
init();
