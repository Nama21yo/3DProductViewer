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
  appState.controls.target.set(0, 1, 0);

  // Disable rotation if autoRotate is enabled
  setOrbitControlsEnabled(appState, !appState.autoRotate);

  // Pause auto-rotation when user interacts (mouse or touch)
  function onStart() {
    appState.autoRotate = false;
    setOrbitControlsEnabled(appState, true);
  }
  appState.controls.addEventListener("start", onStart);

  // UI Button to toggle rotation
  const toggleRotateButton = document.getElementById("toggle-rotate");
  if (toggleRotateButton) {
    toggleRotateButton.addEventListener("click", () => {
      appState.autoRotate = !appState.autoRotate;
      setOrbitControlsEnabled(appState, !appState.autoRotate);
    });
  }
}

/**
 * Enables or disables OrbitControls (rotation, pan, zoom).
 */
export function setOrbitControlsEnabled(appState, enabled) {
  if (!appState.controls) return;
  appState.controls.enableRotate = enabled;
  appState.controls.enablePan = enabled;
  appState.controls.enableZoom = enabled;
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
    appState.camera.position.y = 2.5; // Maintain a slight elevation
    appState.camera.position.z = Math.cos(elapsedTime * 0.4) * radius;
    appState.camera.lookAt(appState.controls.target);
  }
}
