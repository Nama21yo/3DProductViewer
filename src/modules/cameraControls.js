// src/modules/cameraControls.js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Sets up OrbitControls and UI for camera control.
 * @param {object} appState - The shared state object.
 */
export function setupCameraControls(appState) {
  appState.controls = new OrbitControls(
    appState.camera,
    appState.renderer.domElement
  );
  appState.controls.enableDamping = true;
  appState.controls.dampingFactor = 0.05;
  appState.controls.target.set(0, 1, 0); // Point at the center of the chair

  // Pause auto-rotation when user interacts
  appState.controls.addEventListener("start", () => {
    appState.autoRotate = false;
  });

  // UI Button to toggle rotation
  const toggleRotateButton = document.getElementById("toggle-rotate");
  toggleRotateButton.addEventListener("click", () => {
    appState.autoRotate = !appState.autoRotate;
  });
}

/**
 * Updates the camera's automatic rotation in the animation loop.
 * @param {object} appState - The shared state object.
 */
export function updateCameraAnimation(appState) {
  if (appState.autoRotate) {
    const elapsedTime = appState.clock.getElapsedTime();
    const radius = 5;
    appState.camera.position.x = Math.sin(elapsedTime * 0.4) * radius;
    appState.camera.position.z = Math.cos(elapsedTime * 0.4) * radius;
    appState.camera.lookAt(appState.controls.target);
  }
}
