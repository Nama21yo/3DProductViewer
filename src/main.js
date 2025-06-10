// src/main.js
import { initializeScene } from "./modules/scene.js";
import { createProduct } from "./modules/createProduct.js";
import { addLighting } from "./modules/lighting.js";
import {
  setupCameraControls,
  updateCameraAnimation,
} from "./modules/cameraControls.js";
import { setupInteraction } from "./modules/interaction.js";

// --- MAIN APPLICATION ---

// 1. STATE MANAGEMENT
// A central object to hold the shared state of our application
const appState = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  clock: null,
  productGroup: null, // Will be populated by createProduct
  autoRotate: true,
};

// 2. INITIALIZATION
function init() {
  const canvas = document.querySelector("canvas.webgl");

  // Initialize core components and populate appState
  initializeScene(appState, canvas);

  // Create the 3D objects
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

  // Update modules that require animation frame updates
  updateCameraAnimation(appState);

  // Update controls
  appState.controls.update();

  // Render the scene
  appState.renderer.render(appState.scene, appState.camera);
}

// --- START THE APPLICATION ---
init();
