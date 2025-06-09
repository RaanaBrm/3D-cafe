# Immersive Virtual Cafe

A virtual reality cafe experience built with React Three Fiber and WebXR, featuring an artistic atmosphere with famous paintings, realistic character models, modern dining sets, and interactive VR elements.

## Features

### Environment
- Fully immersive 3D environment with WebXR VR support
- Four elegant wooden dining sets arranged in a 2x2 grid layout
- Realistic character models featuring well-dressed women
- Artistic wall decorations:
  - Mona Lisa by Leonardo da Vinci (left wall)
  - Starry Night by Van Gogh (right wall)
  - Custom cafe logo (back wall)

### Interactive VR Features
- Pick up and move dining sets in VR mode
- Natural object rotation with controller movements
- Visual feedback system:
  - Green circular indicators under interactive objects
  - Yellow grab points for pickable objects
  - Hover animations with gentle floating effect
- Smart object handling:
  - Smooth return to original position when released
  - Physics-based movements with natural transitions
  - Paintings can be selected but not moved

### Lighting System
- Decorative wall sconces with warm lighting
- Strategic spotlights for artwork
- Ambient lighting for natural atmosphere
- Realistic shadows and lighting effects

## VR Controls

### Basic Controls
- Point at objects to see hover effects
- Pull trigger while pointing to grab objects
- Move controller to position objects
- Rotate controller to rotate held objects
- Release trigger to drop objects (they smoothly return to original position)

### Interaction Types
- **Dining Sets**: Fully interactive (grab, move, rotate)
- **Paintings**: Interactive but fixed (can select, cannot move)
- **Characters**: Non-interactive, decorative elements

## Technical Stack

- React
- Three.js
- React Three Fiber (@react-three/fiber)
- WebXR (@react-three/xr)
- TypeScript
- Drei (@react-three/drei)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A WebXR-compatible browser
- VR headset for VR features
- HTTPS setup for WebXR functionality

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Cafe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up HTTPS certificates:
- Generate SSL certificates (key.pem and cert.pem)
- Place them in the project root directory

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `https://localhost:5173` (note: HTTPS is required for WebXR)

## Development Guide

### Project Structure
```
src/
  ├── components/
  │   ├── CafeScene.tsx       # Main scene composition
  │   ├── InteractiveObject.tsx # VR interaction handling
  │   ├── WoodenDiningSet.tsx # Furniture component
  │   └── SimpleController.tsx # VR controller visualization
  ├── App.tsx                 # Main application setup
  └── assets/                 # Textures and models
```

### Key Components

#### InteractiveObject
Handles all VR interactions including:
- Object pickup and movement
- Rotation handling
- Visual feedback
- Position animation
- Return-to-origin behavior

#### CafeScene
Manages the overall scene including:
- Object placement and organization
- Lighting setup
- Wall decorations
- Character positioning

## Scene Layout

The virtual cafe features:
- A spacious room with textured walls and floor
- Four interactive dining areas with wooden dining sets
- Realistic character models positioned naturally
- Wall-mounted artwork with dedicated lighting
- Decorative wall sconces providing warm ambient lighting

## Assets Credits

- Woman character model: "woman_dress_2.glb"
- Wooden dining set model
- Artwork textures:
  - Mona Lisa
  - Starry Night
- Floor and wall textures
- Custom cafe logo

## License

[Your chosen license]

## Acknowledgments

- 3D Models from [appropriate credits]
- Artwork textures used with appropriate permissions
- React Three Fiber and Three.js communities
- WebXR contributors 