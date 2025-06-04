# Immersive Virtual Cafe

A virtual reality cafe experience built with React Three Fiber and WebXR, featuring an artistic atmosphere with famous paintings and modern dining sets.

## Features

- Interactive 3D environment with VR support
- Four modern dining sets arranged in a 2x2 grid layout
- Artistic wall decorations featuring Van Gogh's Starry Night and the Mona Lisa
- Ambient lighting with wall sconces and spotlights
- Wall-mounted bookshelf with decorative books
- Interactive elements with hover and selection effects in VR mode

## Technical Stack

- React
- Three.js
- React Three Fiber
- WebXR
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A WebXR-compatible browser and VR headset for VR features

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

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal)

## VR Mode

To experience the cafe in VR:
1. Use a WebXR-compatible browser (like Chrome or Firefox)
2. Connect your VR headset
3. Click the "Enter VR" button in the application

## Scene Layout

The virtual cafe features:
- A 2x2 grid of dining sets with comfortable spacing
- Wall-mounted artwork:
  - Starry Night by Van Gogh
  - Mona Lisa by Leonardo da Vinci
- Decorative wall sconces with warm lighting
- A bookshelf with interactive books
- Ambient and spot lighting for atmosphere

## Controls

- **Desktop Mode:**
  - Mouse to look around
  - Click to interact with objects

- **VR Mode:**
  - Use VR controllers to interact with objects
  - Point and select to interact with dining sets
  - Natural head movement for looking around

## Development

The project uses TypeScript for type safety and better development experience. Key components:

- `CafeScene.tsx`: Main scene component
- `WoodenDiningSet.tsx`: Dining set component
- Various helper components for lighting and decorations

## License

[Your chosen license]

## Acknowledgments

- 3D Models from [appropriate credits]
- Artwork textures used with appropriate permissions
- React Three Fiber and Three.js communities 