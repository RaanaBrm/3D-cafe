import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Plane, Cylinder, useGLTF } from '@react-three/drei'
import { Interactive, useXR } from '@react-three/xr'
import * as THREE from 'three'
import WoodenDiningSet from './WoodenDiningSet'
import InteractiveObject from './InteractiveObject'

function WomanModel1({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/woman_dress_2.glb')
  
  // Log when the model loads
  console.log('Woman model loaded:', scene)
  
  return (
    <primitive 
      object={scene} 
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  )
}

function WomanModel2({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/woman_dress_2.glb')
  return (
    <primitive 
      object={scene.clone()} 
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  )
}

// Preload the model
useGLTF.preload('/models/woman_dress_2.glb')

// Door Model Component
interface DoorProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  isOpen: boolean
  onToggle: () => void
}

function Door({ position = [0, 0, 0], rotation = [0, 0, 0], isOpen, onToggle }: DoorProps) {
  const { scene } = useGLTF('/door.glb')
  const doorRef = useRef<THREE.Group>()

  useFrame(() => {
    if (doorRef.current) {
      const targetRotation = isOpen ? Math.PI / 2 : 0
      doorRef.current.rotation.y = THREE.MathUtils.lerp(
        doorRef.current.rotation.y,
        targetRotation,
        0.1
      )
    }
  })

  return (
    <Interactive onSelect={onToggle}>
      <primitive
        ref={doorRef}
        object={scene}
        position={position}
        rotation={rotation}
        scale={[0.0015, 0.0015, 0.0015]} // Adjusted scale to match scene proportions
        castShadow
        receiveShadow
      />
    </Interactive>
  )
}

// Preload door model
useGLTF.preload('/door.glb')

// Colors
const COLORS = {
  DARK_BROWN: '#4A3728', // Darker brown for table
  LIGHT_BROWN: '#8B7355', // Light brown for chairs
  BLACK: '#2C2C2C', // Dark gray for shelf
  LIGHT_GRAY: '#E8E8E8', // Light gray for character
  DARK_GRAY: '#A0A0A0', // Dark gray for character details
  WHITE: '#FFFFFF', // White for cup and shelf
  FLOOR: '#808080', // Gray for floor
  LAMP_GOLD: '#CFB53B', // Gold color for lamp
  LAMP_SHADE: '#FFF8E7', // Warm white for lampshade
  PLANT_GREEN: '#355E3B', // Dark green for plant
  PLANT_LIGHT_GREEN: '#90EE90', // Light green for plant highlights
  POT_BROWN: '#5C4033', // Brown for plant pot
  WALL_COLOR: '#F5F5F5', // Off-white for wall
  FRAME_COLOR: '#8B4513', // Dark brown for frame
  ROSE_RED: '#FF033E', // Bright red for rose
  ROSE_GREEN: '#228B22', // Forest green for stems
  NAME_TAG: '#FFD700', // Gold for name tag
  BLONDE_HAIR: '#FFE4B5', // Moccasin blonde for hair
  BOOK_COLORS: [
    '#8B4513', // Saddle Brown
    '#A0522D', // Sienna
    '#6B4423', // Dark Brown
    '#800000', // Maroon
    '#8B0000', // Dark Red
    '#006400', // Dark Green
    '#191970', // Midnight Blue
    '#4B0082', // Indigo
    '#663399', // Rebecca Purple
    '#8B008B', // Dark Magenta
  ]
}

export default function CafeScene() {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)
  const { isPresenting } = useXR()

  useFrame((state) => {
    if (groupRef.current && !isPresenting) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  const handleSelect = (objectId: string) => {
    if (!isPresenting) return
    console.log(`Selected in VR: ${objectId}`)
  }

  const handleHover = (objectId: string, isHovered: boolean) => {
    if (!isPresenting) return
    setHoveredObject(isHovered ? objectId : null)
  }

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <Plane
        args={[24, 24]} // Increased room size
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('/floor.jpg', (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(8, 8); // Adjusted tiling for larger floor
          })}
          roughness={0.8}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Dining Sets with VR pickup interaction */}
      {[
        { position: [-8, 0, -5], rotation: Math.PI / 6 },
        { position: [8, 0, -5], rotation: -Math.PI / 6 },
        { position: [-8, 0, -1], rotation: Math.PI / 6 },
        { position: [8, 0, -1], rotation: -Math.PI / 6 }
      ].map((set, index) => (
        <InteractiveObject
          key={`dining-set-${index}`}
          objectId={`dining-set-${index}`}
          position={[set.position[0], set.position[1], set.position[2]]}
          onHover={(isHovered) => handleHover(`dining-set-${index}`, isHovered)}
          onSelect={() => handleSelect(`dining-set-${index}`)}
          canPickup={true}
        >
          <WoodenDiningSet
            position={[0, 0, 0]}
            rotation={[0, set.rotation, 0]}
            scale={0.002}
          />
        </InteractiveObject>
      ))}

      {/* Characters standing to the left of right tables */}
      <WomanModel1 
        position={[5.5, 0, -5]}
        rotation={[0, Math.PI * 0.1, 0]}
        scale={0.0011}
      />

      <WomanModel2 
        position={[5.5, 0, -1]}
        rotation={[0, Math.PI * 0.1, 0]}
        scale={0.0011}
      />

      {/* Main Cafe Interaction */}
      <InteractiveObject
        objectId="cafe-space"
        position={[0, 0, 0]}
        onHover={(isHovered) => handleHover('cafe-space', isHovered)}
        onSelect={() => handleSelect('cafe-space')}
      >
        {/* First Dining Set - Back Left */}
        <WoodenDiningSet
          position={[-8, 0, -5]}
          rotation={[0, Math.PI / 6, 0]}
          scale={0.002}
        />

        {/* Second Dining Set - Back Right */}
        <WoodenDiningSet
          position={[8, 0, -5]}
          rotation={[0, -Math.PI / 6, 0]}
          scale={0.002}
        />

        {/* Third Dining Set - Front Left */}
        <WoodenDiningSet
          position={[-8, 0, -1]}
          rotation={[0, Math.PI / 6, 0]}
          scale={0.002}
        />

        {/* Fourth Dining Set - Front Right */}
        <WoodenDiningSet
          position={[8, 0, -1]}
          rotation={[0, -Math.PI / 6, 0]}
          scale={0.002}
        />
      </InteractiveObject>

      {/* Mona Lisa on Left Wall */}
      <group position={[-11.8, 3, -2]}>
        {/* Main Frame */}
        <Box 
          args={[0.1, 3, 2.4]}
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color="#4a3c2c" roughness={0.7} />
        </Box>

        {/* Painting Canvas */}
        <Box 
          args={[0.05, 2.8, 2.2]}
          position={[0.08, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            map={new THREE.TextureLoader().load('/mona-lisa.jpg')}
            roughness={0.5}
            metalness={0.1}
          />
        </Box>

        {/* Two Wall Sconces above Mona Lisa */}
        {[-0.8, 0.8].map((z, index) => (
          <group key={`sconce-mona-${index}`} position={[0, 1.8, z]}>
            <Box args={[0.1, 0.15, 0.2]} position={[0, 0, 0]} castShadow>
              <meshStandardMaterial color="#c4a484" metalness={0.7} roughness={0.3} />
            </Box>
            <Cylinder args={[0.12, 0.12, 0.02, 16]} position={[0, 0, 0.15]} castShadow>
              <meshStandardMaterial color="#c4a484" metalness={0.7} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.12, 0.08, 0.2, 16]} position={[0, 0, 0.25]} castShadow>
              <meshStandardMaterial color="#f5f5f5" transparent opacity={0.8} emissive="#f5f5f5" emissiveIntensity={0.2} />
            </Cylinder>
            <pointLight position={[0, 0, 0.25]} intensity={0.4} distance={3} decay={2} color="#FFF8E7" />
          </group>
        ))}

        {/* Spotlight for Mona Lisa */}
        <spotLight
          position={[1, 2, 0]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={0.8}
          target-position={[0, 0, 0]}
          castShadow
          distance={3}
        />
      </group>

      {/* Starry Night on Right Wall */}
      <group position={[11.8, 3, 2]}>
        {/* Main Frame */}
        <Box 
          args={[0.1, 2.6, 3.8]}
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color="#4a3c2c" roughness={0.7} />
        </Box>

        {/* Painting Canvas */}
        <Box 
          args={[0.05, 2.4, 3.6]}
          position={[-0.08, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            map={new THREE.TextureLoader().load('/starry-night.jpg')}
            roughness={0.5}
            metalness={0.1}
          />
        </Box>

        {/* Two Wall Sconces above Starry Night */}
        {[-1.2, 1.2].map((z, index) => (
          <group key={`sconce-starry-${index}`} position={[0, 1.8, z]}>
            <Box args={[0.1, 0.15, 0.2]} position={[0, 0, 0]} castShadow>
              <meshStandardMaterial color="#c4a484" metalness={0.7} roughness={0.3} />
            </Box>
            <Cylinder args={[0.12, 0.12, 0.02, 16]} position={[0, 0, 0.15]} castShadow>
              <meshStandardMaterial color="#c4a484" metalness={0.7} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.12, 0.08, 0.2, 16]} position={[0, 0, 0.25]} castShadow>
              <meshStandardMaterial color="#f5f5f5" transparent opacity={0.8} emissive="#f5f5f5" emissiveIntensity={0.2} />
            </Cylinder>
            <pointLight position={[0, 0, 0.25]} intensity={0.4} distance={3} decay={2} color="#FFF8E7" />
          </group>
        ))}

        {/* Spotlight for Starry Night */}
        <spotLight
          position={[-1, 2, 0]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={0.8}
          target-position={[0, 0, 0]}
          castShadow
          distance={3}
        />
      </group>

      {/* Logo on Back Wall */}
      <group position={[0, 3, -7.9]}>
        {/* Logo Frame */}
        <Box 
          args={[5, 2.5, 0.1]}
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color="#4a3c2c" roughness={0.7} />
        </Box>

        {/* Logo Canvas */}
        <Box 
          args={[4.8, 2.3, 0.05]}
          position={[0, 0, 0.08]}
          castShadow
        >
          <meshStandardMaterial
            map={new THREE.TextureLoader().load('/logo.png')}
            transparent={true}
            roughness={0.2}
            metalness={0.1}
            alphaTest={0.5}
            side={THREE.DoubleSide}
          />
        </Box>

        {/* Two Wall Sconces above Logo */}
        {[-2, 2].map((x, index) => (
          <group key={`sconce-logo-${index}`} position={[x, 1.8, 0]}>
            <Box args={[0.1, 0.15, 0.2]} position={[0, 0, 0]} castShadow>
              <meshStandardMaterial color="#c4a484" metalness={0.7} roughness={0.3} />
            </Box>
            <Cylinder args={[0.12, 0.12, 0.02, 16]} position={[0, 0, 0.15]} castShadow>
              <meshStandardMaterial color="#c4a484" metalness={0.7} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.12, 0.08, 0.2, 16]} position={[0, 0, 0.25]} castShadow>
              <meshStandardMaterial color="#f5f5f5" transparent opacity={0.8} emissive="#f5f5f5" emissiveIntensity={0.2} />
            </Cylinder>
            <pointLight position={[0, 0, 0.25]} intensity={0.4} distance={3} decay={2} color="#FFF8E7" />
          </group>
        ))}
      </group>

      {/* Walls with increased height */}
      <group>
        {/* Back Wall */}
        <Box 
          args={[24, 5.5, 0.2]} 
          position={[0, 2.75, -8]}
          receiveShadow
        >
          <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
        </Box>

        {/* Left Wall */}
        <Box 
          args={[0.2, 5.5, 16]} 
          position={[-12, 2.75, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
        </Box>

        {/* Right Wall */}
        <Box 
          args={[0.2, 5.5, 16]} 
          position={[12, 2.75, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
        </Box>
      </group>

      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} /> // Reduced ambient light for more contrast
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.4}
        shadow-bias={-0.0001}
      />

      {/* Additional point lights for atmosphere */}
      <pointLight
        position={[-4, 2.5, -5]}
        intensity={0.3}
        distance={6}
        decay={2}
        color="#FFF8E7"
      />
      <pointLight
        position={[4, 2.5, -5]}
        intensity={0.3}
        distance={6}
        decay={2}
        color="#FFF8E7"
      />
      <pointLight
        position={[-4, 2.5, -1]}
        intensity={0.3}
        distance={6}
        decay={2}
        color="#FFF8E7"
      />
      <pointLight
        position={[4, 2.5, -1]}
        intensity={0.3}
        distance={6}
        decay={2}
        color="#FFF8E7"
      />
    </group>
  )
} 