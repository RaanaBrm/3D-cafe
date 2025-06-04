# Immersive Virtual Cafe

A virtual reality cafe experience built with React Three Fiber and WebXR, featuring an artistic atmosphere with famous paintings, realistic character models, and modern dining sets.

## Features

- Fully immersive 3D environment with WebXR VR support
- Four elegant wooden dining sets arranged in a 2x2 grid layout
- Realistic character models featuring well-dressed women
- Artistic wall decorations:
  - Mona Lisa by Leonardo da Vinci (left wall)
  - Starry Night by Van Gogh (right wall)
  - Custom cafe logo (back wall)
- Sophisticated lighting system:
  - Decorative wall sconces with warm lighting
  - Strategic spotlights for artwork
  - Ambient lighting for natural atmosphere
- Interactive elements with hover and selection effects in VR mode
- High-quality textures for walls and floor
- Realistic shadows and lighting effects

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

## VR Mode

To experience the cafe in VR:
1. Ensure you're using a WebXR-compatible browser
2. Connect your VR headset
3. Access the site via HTTPS
4. Click the "Enter VR" button in the application

## Scene Layout

The virtual cafe features:
- A spacious room with textured walls and floor
- Four dining areas with imported wooden dining sets
- Realistic character models positioned naturally in the scene
- Wall-mounted artwork with dedicated lighting:
  - Left wall: Mona Lisa with spotlights
  - Right wall: Starry Night with spotlights
  - Back wall: Cafe logo with dual spotlights
- Decorative wall sconces providing warm ambient lighting
- Professional lighting setup with shadows and ambient occlusion

## Components

Key components in the project:
- `CafeScene.tsx`: Main scene component orchestrating all elements
- `WoodenDiningSet.tsx`: Imported dining set model component
- `WomanModel1.tsx` & `WomanModel2.tsx`: Character model components
- Interactive elements using @react-three/xr
- Custom lighting components for ambiance

## Controls

- **Desktop Mode:**
  - Scene auto-rotates for showcase
  - Mouse interaction with scene elements

- **VR Mode:**
  - Natural VR controller interaction
  - Ray-casting for object selection
  - Hover effects on interactive elements
  - Full 6DOF movement in VR space

## Development

The project uses TypeScript for enhanced type safety and development experience. Key files:

- `src/components/CafeScene.tsx`: Main scene setup and composition
- `src/components/WoodenDiningSet.tsx`: Dining furniture component
- Model files in `/public/models/`
- Texture files in `/public/`

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