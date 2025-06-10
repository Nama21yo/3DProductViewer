// src/modules/interaction.js
import * as THREE from "three";

const highlightColor = 0xff0000;
let highlightedObject = null;

/**
 * Sets up raycasting for mouse interactions.
 * @param {object} appState - The shared state object.
 */
export function setupInteraction(appState) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const infoPanel = document.getElementById("info-panel");
  const partNameElement = document.getElementById("part-name");

  function handleMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, appState.camera);
    const intersects = raycaster.intersectObjects(
      appState.productGroup.children
    );

    // Deselect previous object
    if (highlightedObject) {
      highlightedObject.material.color.set(
        highlightedObject.userData.originalColor
      );
      highlightedObject = null;
      infoPanel.classList.add("hidden");
    }

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;

      // Store original color and highlight
      clickedObject.userData.originalColor =
        clickedObject.material.color.getHex();
      clickedObject.material.color.set(highlightColor);
      highlightedObject = clickedObject;

      // Show info panel
      partNameElement.textContent = clickedObject.name;
      infoPanel.classList.remove("hidden");
    }
  }

  window.addEventListener("click", handleMouseClick);
}
