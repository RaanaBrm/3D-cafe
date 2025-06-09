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
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('/floor.jpg', (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(6, 6); // Adjust this value to control texture tiling
          })}
          roughness={0.8}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* First Dining Set - Back Left */}
      <InteractiveObject
        objectId="dining-set-1"
        position={[-3.5, 0, -4]}
        onHover={(isHovered) => handleHover('dining-set-1', isHovered)}
        onSelect={() => handleSelect('dining-set-1')}
      >
        <WoodenDiningSet
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.0015}
        />
      </InteractiveObject>

      {/* First Woman Model */}
      <WomanModel1 
        position={[-2.2, 0, -3.8]} 
        rotation={[0, Math.PI * 1.5, 0]}
        scale={0.0008}
      />

      {/* Second Dining Set - Back Right */}
      <InteractiveObject
        objectId="dining-set-2"
        position={[3.5, 0, -4]}
        onHover={(isHovered) => handleHover('dining-set-2', isHovered)}
        onSelect={() => handleSelect('dining-set-2')}
      >
        <WoodenDiningSet
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.0015}
        />
      </InteractiveObject>

      {/* Second Woman Model */}
      <WomanModel2 
        position={[4.8, 0, -0.8]} 
        rotation={[0, Math.PI * 1.5, 0]}
        scale={0.0008}
      />

      {/* Third Dining Set - Front Left */}
      <InteractiveObject
        objectId="dining-set-3"
        position={[-3.5, 0, -1]}
        onHover={(isHovered) => handleHover('dining-set-3', isHovered)}
        onSelect={() => handleSelect('dining-set-3')}
      >
        <WoodenDiningSet
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.0015}
        />
      </InteractiveObject>

      {/* Fourth Dining Set - Front Right */}
      <InteractiveObject
        objectId="dining-set-4"
        position={[3.5, 0, -1]}
        onHover={(isHovered) => handleHover('dining-set-4', isHovered)}
        onSelect={() => handleSelect('dining-set-4')}
      >
        <WoodenDiningSet
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.0015}
        />
      </InteractiveObject>

      {/* Walls */}
      {/* Left Wall */}
      <Box
        args={[0.1, 6, 16]}
        position={[-8, 3, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('/wall.jpg')}
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </Box>

      {/* Mona Lisa on Left Wall */}
      <InteractiveObject
        objectId="mona-lisa"
        position={[-7.9, 3, 0]}
        canPickup={false}
        onHover={(isHovered) => handleHover('mona-lisa', isHovered)}
        onSelect={() => handleSelect('mona-lisa')}
      >
        {/* Main Frame */}
        <Box 
          args={[0.1, 3.2, 2.2]} 
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
        </Box>

        {/* Painting Canvas */}
        <Box 
          args={[0.05, 3, 2]} 
          position={[0.05, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            map={new THREE.TextureLoader().load('/mona-lisa.jpg')}
            roughness={0.5}
            metalness={0.1}
          />
        </Box>

        {/* Wall Sconces above Mona Lisa */}
        {[0].map((_, index) => (
          <group key={`sconce-left-${index}`} position={[0.1, 1.8, 0]}>
            {/* Wall Mount */}
            <Box 
              args={[0.1, 0.2, 0.1]} 
              castShadow
            >
              <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
            </Box>
            {/* Arm */}
            <Box 
              args={[0.2, 0.05, 0.05]} 
              position={[0.1, 0, 0]}
              castShadow
            >
              <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
            </Box>
            {/* Lampshade */}
            <group position={[0.2, 0, 0]}>
              <Cylinder 
                args={[0.12, 0.12, 0.02, 16]} 
                rotation={[0, 0, Math.PI/2]}
                position={[0, 0.1, 0]} 
                castShadow
              >
                <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
              </Cylinder>
              <Cylinder 
                args={[0.12, 0.08, 0.2, 16]} 
                rotation={[0, 0, Math.PI/2]}
                position={[0, 0, 0]}
                castShadow
              >
                <meshStandardMaterial 
                  color={COLORS.LAMP_SHADE}
                  transparent={true}
                  opacity={0.8}
                  emissive={COLORS.LAMP_SHADE}
                  emissiveIntensity={0.2}
                />
              </Cylinder>
              <Cylinder 
                args={[0.08, 0.08, 0.02, 16]} 
                rotation={[0, 0, Math.PI/2]}
                position={[0, -0.1, 0]}
                castShadow
              >
                <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
              </Cylinder>
              <pointLight
                position={[0, 0, 0]}
                intensity={0.4}
                distance={3}
                decay={2}
                color="#FFF8E7"
              />
            </group>
          </group>
        ))}

        {/* Spotlight for Mona Lisa */}
        <spotLight
          position={[0.5, 1.8, 0]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={1.2}
          target-position={[0, 0, 0]}
          castShadow
        />
      </InteractiveObject>

      {/* Right Wall */}
      <Box
        args={[0.1, 6, 16]}
        position={[8, 3, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('/wall.jpg')}
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </Box>

      {/* Starry Night on Right Wall */}
      <InteractiveObject
        objectId="starry-night"
        position={[7.9, 3, 0]}
        canPickup={false}
        onHover={(isHovered) => handleHover('starry-night', isHovered)}
        onSelect={() => handleSelect('starry-night')}
      >
        {/* Main Frame */}
        <Box 
          args={[0.1, 2.2, 3.2]} 
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
        </Box>

        {/* Painting Canvas */}
        <Box 
          args={[0.05, 2, 3]} 
          position={[-0.05, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            map={new THREE.TextureLoader().load('/starry-night.jpg')}
            roughness={0.5}
            metalness={0.1}
          />
        </Box>

        {/* Wall Sconces above Starry Night */}
        {[0].map((_, index) => (
          <group key={`sconce-right-${index}`} position={[-0.1, 1.8, 0]}>
            {/* Wall Mount */}
            <Box 
              args={[0.1, 0.2, 0.1]} 
              castShadow
            >
              <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
            </Box>
            {/* Arm */}
            <Box 
              args={[0.2, 0.05, 0.05]} 
              position={[-0.1, 0, 0]}
              castShadow
            >
              <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
            </Box>
            {/* Lampshade */}
            <group position={[-0.2, 0, 0]}>
              <Cylinder 
                args={[0.12, 0.12, 0.02, 16]} 
                rotation={[0, 0, -Math.PI/2]}
                position={[0, 0.1, 0]} 
                castShadow
              >
                <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
              </Cylinder>
              <Cylinder 
                args={[0.12, 0.08, 0.2, 16]} 
                rotation={[0, 0, -Math.PI/2]}
                position={[0, 0, 0]}
                castShadow
              >
                <meshStandardMaterial 
                  color={COLORS.LAMP_SHADE}
                  transparent={true}
                  opacity={0.8}
                  emissive={COLORS.LAMP_SHADE}
                  emissiveIntensity={0.2}
                />
              </Cylinder>
              <Cylinder 
                args={[0.08, 0.08, 0.02, 16]} 
                rotation={[0, 0, -Math.PI/2]}
                position={[0, -0.1, 0]}
                castShadow
              >
                <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
              </Cylinder>
              <pointLight
                position={[0, 0, 0]}
                intensity={0.4}
                distance={3}
                decay={2}
                color="#FFF8E7"
              />
            </group>
          </group>
        ))}

        {/* Spotlight for Starry Night */}
        <spotLight
          position={[-0.5, 1.8, 0]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={1.2}
          target-position={[0, 0, 0]}
          castShadow
        />
      </InteractiveObject>

      {/* Back Wall */}
      <Box 
        args={[16, 6, 0.1]} 
        position={[0, 3, -8]}
        receiveShadow
      >
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('/wall.jpg')}
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </Box>

      {/* Back Wall with Logo */}
      <group position={[0, 0, -8]}>
        {/* Logo Frame */}
        <Box 
          args={[4, 2, 0.1]} 
          position={[0, 3.5, 0.1]}
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
        </Box>

        {/* Logo Canvas */}
        <Box 
          args={[3.8, 1.8, 0.05]} 
          position={[0, 3.5, 0.15]}
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

        {/* Wall Sconces above Logo */}
        {[-2, 2].map((x, index) => (
          <group key={`sconce-back-${index}`} position={[x, 4.8, 0.2]}>
            {/* Wall Mount */}
            <Box 
              args={[0.1, 0.2, 0.1]} 
              castShadow
            >
              <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
            </Box>
            {/* Arm */}
            <Box 
              args={[0.05, 0.05, 0.2]} 
              position={[0, 0, 0.1]}
              castShadow
            >
              <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
            </Box>
            {/* Lampshade */}
            <group position={[0, 0, 0.2]}>
              <Cylinder 
                args={[0.12, 0.12, 0.02, 16]} 
                position={[0, 0.1, 0]} 
                castShadow
              >
                <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
              </Cylinder>
              <Cylinder 
                args={[0.12, 0.08, 0.2, 16]} 
                position={[0, 0, 0]}
                castShadow
              >
                <meshStandardMaterial 
                  color={COLORS.LAMP_SHADE}
                  transparent={true}
                  opacity={0.8}
                  emissive={COLORS.LAMP_SHADE}
                  emissiveIntensity={0.2}
                />
              </Cylinder>
              <Cylinder 
                args={[0.08, 0.08, 0.02, 16]} 
                position={[0, -0.1, 0]}
                castShadow
              >
                <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
              </Cylinder>
              <pointLight
                position={[0, 0, 0]}
                intensity={0.4}
                distance={3}
                decay={2}
                color="#FFF8E7"
              />
            </group>
          </group>
        ))}

        {/* Spotlights for Logo */}
        <spotLight
          position={[-2, 4.8, -6]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={1}
          target-position={[0, 3.5, -7.9]}
          castShadow
        />
        <spotLight
          position={[2, 4.8, -6]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={1}
          target-position={[0, 3.5, -7.9]}
          castShadow
        />
      </group>

      {/* Enhanced Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.7} 
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.3}
        shadow-bias={-0.0001}
      />
    </group>
  )
} 