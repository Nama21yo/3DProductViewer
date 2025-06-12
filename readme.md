# 3D Product Viewer using Three.js

An interactive 3D product viewer built with **Three.js** and **Vite**. This application demonstrates core Three.js concepts including scene setup, mesh creation, lighting, raycasting for interaction, and camera controls.
- ### Name - Natnael Yohanes
- ### ID - UGR/0668/15
- ### Section - 3

![image](https://github.com/user-attachments/assets/e7ca8f7d-7ea3-4aab-9d4e-59198ca15f30)

---

## Features

- **Interactive 3D Scene:** A "product" built from basic geometries.
- **Orbit Controls:** Use the mouse to zoom, pan, and rotate the camera.
- **Automatic Camera Rotation:** The camera smoothly orbits the product, and pauses when the user interacts.
- **Raycasting Interaction:** Click on different parts of the model to highlight them in red.
- **Dynamic Info Panel:** Displays the name of the clicked part.
- **Lighting & Shadows:** Basic ambient and directional lighting for a realistic look.
- **Responsive Design:** The canvas resizes with the browser window.
- **Modular Code:** The source code is organized into logical modules for better maintainability.

---

## Tech Stack

- **Vite:** Fast frontend tooling for development.
- **Three.js:** The 3D rendering library.
- **JavaScript (ES6 Modules):** For application logic.

---

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/product-viewer-threejs.git
    ```

2.  **Navigate into the project directory:**

    ```bash
    cd product-viewer-threejs
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open the `localhost` URL provided in your terminal to view the application.

---

## Code Structure

The project's logic is organized into modules inside the `src/modules/` directory:

- `scene.js`: Initializes the scene, camera, and renderer.
- `createProduct.js`: Builds the 3D chair model.
- `lighting.js`: Sets up the scene's lighting.
- `cameraControls.js`: Manages `OrbitControls` and auto-rotation.
- `interaction.js`: Handles mouse-click raycasting and highlighting.
- `main.js`: The main entry point that orchestrates all the modules.
