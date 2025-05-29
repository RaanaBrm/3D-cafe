# 3D Interactive Cafe Scene

A beautiful and interactive 3D cafe scene built with React Three Fiber, featuring detailed furniture, ambient lighting, and interactive elements.

![Cafe Scene Preview](preview.png)

## Features

- **Detailed 3D Environment**
  - Elegant round table with coffee cup and rose vase
  - Comfortable chairs with proper spacing and positioning
  - Wall-mounted shelf with decorative books and plants
  - Van Gogh's "Starry Night" painting with custom frame
  - Decorative wall sconces with warm lighting
  - Large potted plant with dynamic leaves

- **Interactive Elements**
  - Hover effects on furniture
  - VR-ready interactions
  - Dynamic lighting and shadows
  - Realistic materials and textures

- **Character Design**
  - Detailed cafe staff character "Emma"
  - Custom uniform with name tag
  - Realistic hair and facial features

## Technologies Used

- React
- React Three Fiber (@react-three/fiber)
- Three.js
- @react-three/drei
- @react-three/xr

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd cafe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Scene Controls

- **Mouse/Touch:**
  - Drag to rotate the scene
  - Scroll/Pinch to zoom
  - Right-click drag to pan

- **VR Mode (if available):**
  - Use VR controllers to interact with objects
  - Teleport navigation
  - Object selection and interaction

## Project Structure

```
cafe/
├── src/
│   ├── components/
│   │   └── CafeScene.tsx    # Main scene component
│   ├── assets/
│   │   ├── textures/        # Texture files
│   │   └── models/          # 3D model files
│   └── App.tsx              # Root component
├── public/
│   └── books/              # Book cover textures
└── package.json
```

## Customization

The scene can be customized by modifying the following:

- Colors: Edit the `COLORS` object in `CafeScene.tsx`
- Furniture positions: Adjust position values in the component
- Lighting: Modify light intensities and positions
- Textures: Add or replace textures in the public folder

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Textures and inspiration from various sources
- React Three Fiber community
- Three.js documentation and examples 