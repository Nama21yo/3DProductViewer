import * as THREE from "three";

/**
 * Creates the 3D product (a chair) and adds it to the scene.
 * @param {object} appState - The shared state object containing the scene.
 */
export function createProduct(appState) {
  // Center the product at the origin (0,0,0)
  const productGroup = new THREE.Group();
  productGroup.position.set(0, 0, 0);
  appState.productGroup = productGroup;

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.7,
    metalness: 0.1,
  });

  // Seat
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.2, 1.5),
    woodMaterial.clone()
  );
  seat.name = "Chair Seat";
  seat.position.y = 1;
  seat.castShadow = true;
  seat.receiveShadow = true;
  productGroup.add(seat);

  // Backrest
  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2, 0.2),
    woodMaterial.clone()
  );
  backrest.name = "Chair Backrest";
  backrest.position.set(0, 2, -0.65);
  backrest.castShadow = true;
  backrest.receiveShadow = true;
  productGroup.add(backrest);

  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
  const legPositions = [
    { x: 0.6, z: 0.6 },
    { x: 0.6, z: -0.6 },
    { x: -0.6, z: 0.6 },
    { x: -0.6, z: -0.6 },
  ];
  legPositions.forEach((pos, index) => {
    const leg = new THREE.Mesh(legGeometry, woodMaterial.clone());
    leg.name = `Chair Leg ${index + 1}`;
    leg.position.set(pos.x, 0.5, pos.z);
    leg.castShadow = true;
    leg.receiveShadow = true;
    productGroup.add(leg);
  });

  appState.scene.add(productGroup);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  appState.scene.add(floor);
}
