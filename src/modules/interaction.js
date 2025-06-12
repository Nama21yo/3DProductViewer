import * as THREE from "three";

const highlightColor = 0xff0000;
let highlightedObject = null;
let highlightTimeout = null;

/**
 * Sets up raycasting for mouse interactions and hover feedback.
 * @param {object} appState - The shared state object.
 */
export function setupInteraction(appState) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const infoPanel = document.getElementById("info-panel");
  const partNameElement = document.getElementById("part-name");

  // Animation state for pulse/floating
  appState.productAnimationState = {
    pulse: 0,
  };

  // --- Hover Feedback ---
  function handlePointerMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, appState.camera);

    const intersects = raycaster.intersectObjects(
      appState.productGroup.children,
      false
    );
    document.body.style.cursor = intersects.length > 0 ? "pointer" : "";

    // Hover highlight (outline effect using scale)
    if (highlightedObject && !highlightedObject.userData.clicked) {
      highlightedObject.scale.set(1, 1, 1); // Reset previous scale
      highlightedObject = null;
    }
    if (intersects.length > 0) {
      const hovered = intersects[0].object;
      if (!hovered.userData.clicked) {
        hovered.scale.set(1.1, 1.1, 1.1); // Subtle scale up
        highlightedObject = hovered;
      }
    }
  }

  // --- Click Feedback ---
  function handleMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, appState.camera);
    const intersects = raycaster.intersectObjects(
      appState.productGroup.children,
      false
    );

    // Deselect previous object
    appState.productGroup.children.forEach((obj) => {
      if (obj.userData.clicked) {
        obj.material.color.set(
          obj.userData.originalColor || obj.material.color.getHex()
        );
        obj.scale.set(1, 1, 1);
        obj.userData.clicked = false;
      }
    });

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;

      // Store original color and highlight
      if (!clickedObject.userData.originalColor) {
        clickedObject.userData.originalColor =
          clickedObject.material.color.getHex();
      }
      clickedObject.material.color.set(highlightColor);
      clickedObject.scale.set(1.2, 1.2, 1.2); // Brief scale up
      clickedObject.userData.clicked = true;

      // Show info panel
      if (partNameElement && infoPanel) {
        partNameElement.textContent = clickedObject.name;
        infoPanel.classList.remove("hidden");
      }

      // Animate scale back to normal after 200ms
      if (highlightTimeout) clearTimeout(highlightTimeout);
      highlightTimeout = setTimeout(() => {
        clickedObject.scale.set(1, 1, 1);
      }, 200);
    } else {
      if (infoPanel) infoPanel.classList.add("hidden");
    }
  }

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("click", handleMouseClick);
}

/**
 * Mesh animation for subtle floating/pulsing effect.
 * @param {object} appState - The shared state object.
 */
export function updateProductAnimation(appState) {
  if (!appState.productGroup) return;
  const t = appState.clock.getElapsedTime();
  // Subtle up-down floating and pulsing scale
  const floatY = Math.sin(t * 1.5) * 0.07;
  const pulse = 1 + Math.sin(t * 4) * 0.015;
  appState.productGroup.position.y = floatY;
  appState.productGroup.scale.set(pulse, pulse, pulse);
}
