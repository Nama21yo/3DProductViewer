import * as THREE from "three";

/**
 * Adds ambient and directional lights to the scene.
 * @param {object} appState - The shared state object containing the scene.
 */
export function addLighting(appState) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  appState.scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(5, 7, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 20;
  appState.scene.add(directionalLight);
}
