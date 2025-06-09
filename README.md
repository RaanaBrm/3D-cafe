# Immersive VR Café

A virtual reality café experience built with React Three Fiber and WebXR, featuring an elegant interior design with interactive furniture, artwork, and character models.

## 🌟 Features

- **VR Support**: Full VR compatibility using WebXR
- **Interactive Environment**:
  - Movable dining sets in VR mode
  - Realistic lighting with wall sconces
  - Marble flooring and elegant wall design
- **Art Gallery**:
  - Mona Lisa on the left wall
  - Starry Night on the right wall
  - Custom café logo on the back wall
- **Realistic Elements**:
  - Four wooden dining sets
  - Two character models
  - Ambient lighting with wall sconces
  - Custom wall decorations

## 🔧 Technical Stack

- React
- Three.js
- React Three Fiber
- WebXR
- TypeScript

## 📋 Prerequisites

- Node.js (v14 or higher)
- A WebXR-compatible browser
- A VR headset (for VR mode)

## 🚀 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Cafe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 💻 Usage

### Desktop Mode
- Use your mouse to look around
- Click the "Enter VR" button to switch to VR mode

### VR Mode
- Use VR controllers to interact with objects
- Point at dining sets to highlight them
- Grab and move dining sets
- Explore the space in full virtual reality

## 🎮 Controls

### Desktop
- **Mouse**: Look around
- **Click**: Select objects
- **VR Button**: Enter VR mode

### VR Controllers
- **Trigger**: Select/Grab objects
- **Grip**: Move objects
- **Thumbstick**: Teleport (if supported)

## 🏗️ Project Structure

```
Cafe/
├── src/
│   ├── components/
│   │   ├── CafeScene.tsx      # Main café environment
│   │   ├── WoodenDiningSet.tsx # Dining set model
│   │   ├── InteractiveObject.tsx # Interactive object wrapper
│   │   └── SimpleController.tsx  # VR controller
│   ├── App.tsx                # Main application
│   └── main.tsx              # Entry point
├── public/
│   ├── models/               # 3D models
│   ├── textures/            # Textures
│   └── images/              # Images
└── package.json
```

## 🎨 Scene Details

- **Room Dimensions**: Large open space with high ceilings
- **Lighting**: Ambient lighting with accent wall sconces
- **Artwork**: 
  - Left Wall: Mona Lisa with two sconces
  - Right Wall: Starry Night with two sconces
  - Back Wall: Café logo with two sconces
- **Furniture**: 
  - 4 wooden dining sets
  - Each set includes a table and chairs
- **Characters**:
  - Two character models positioned near right-side tables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Three.js community
- React Three Fiber team
- WebXR contributors
- Model and texture creators 