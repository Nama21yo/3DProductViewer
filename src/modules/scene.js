// src/modules/scene.js
import * as THREE from "three";

/**
 * Initializes the core Three.js components.
 * @param {object} appState - The shared state object.
 * @param {HTMLCanvasElement} canvas - The canvas element to render on.
 */
export function initializeScene(appState, canvas) {
  // Scene
  appState.scene = new THREE.Scene();
  appState.scene.background = new THREE.Color(0xeeeeee);

  // Camera
  appState.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  appState.camera.position.set(2.5, 3, 4);

  // Renderer
  appState.renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  appState.renderer.setSize(window.innerWidth, window.innerHeight);
  appState.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  appState.renderer.shadowMap.enabled = true;
  appState.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Clock
  appState.clock = new THREE.Clock();

  // Handle window resize
  window.addEventListener("resize", () => {
    appState.camera.aspect = window.innerWidth / window.innerHeight;
    appState.camera.updateProjectionMatrix();
    appState.renderer.setSize(window.innerWidth, window.innerHeight);
    appState.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}
