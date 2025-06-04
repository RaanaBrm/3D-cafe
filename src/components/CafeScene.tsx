import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Plane, Cylinder, useGLTF } from '@react-three/drei'
import { Interactive, useXR } from '@react-three/xr'
import * as THREE from 'three'
import WoodenDiningSet from './WoodenDiningSet'

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

  const InteractiveObject = ({ children, objectId }: { children: React.ReactNode, objectId: string }) => (
    <Interactive 
      onSelect={() => handleSelect(objectId)}
      onHover={() => handleHover(objectId, true)}
      onBlur={() => handleHover(objectId, false)}
    >
      {children}
    </Interactive>
  )

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
      <InteractiveObject objectId="dining-set-1">
        <WoodenDiningSet
          position={[-3.5, 0, -4]}
          rotation={[0, 0, 0]}
          scale={0.0015}
          onHover={(isHovered) => setHoveredObject(isHovered ? 'dining-set-1' : null)}
          onSelect={() => handleSelect('dining-set-1')}
        />
      </InteractiveObject>

      {/* First Woman Model */}
      <WomanModel1 
        position={[-2.2, 0, -3.8]} 
        rotation={[0, Math.PI * 1.5, 0]}
        scale={0.0008}
      />

      {/* Second Dining Set - Back Right */}
      <InteractiveObject objectId="dining-set-2">
        <WoodenDiningSet
          position={[3.5, 0, -4]}
          rotation={[0, 0, 0]}
          scale={0.0015}
          onHover={(isHovered) => setHoveredObject(isHovered ? 'dining-set-2' : null)}
          onSelect={() => handleSelect('dining-set-2')}
        />
      </InteractiveObject>

      {/* First Woman Model */}
      <WomanModel1 
        position={[-2.2, 0, -3.8]} 
        rotation={[0, Math.PI * 1.5, 0]}
        scale={0.0008}
      />

      {/* Second Woman Model */}
      <WomanModel2 
        position={[4.8, 0, -0.8]} 
        rotation={[0, Math.PI * 1.5, 0]}
        scale={0.0008}
      />

      {/* Third Dining Set - Front Left */}
      <InteractiveObject objectId="dining-set-3">
        <WoodenDiningSet
          position={[-3.5, 0, -1]}
          rotation={[0, 0, 0]}
          scale={0.0015}
          onHover={(isHovered) => setHoveredObject(isHovered ? 'dining-set-3' : null)}
          onSelect={() => handleSelect('dining-set-3')}
        />
      </InteractiveObject>

      {/* Fourth Dining Set - Front Right */}
      <InteractiveObject objectId="dining-set-4">
        <WoodenDiningSet
          position={[3.5, 0, -1]}
          rotation={[0, 0, 0]}
          scale={0.0015}
          onHover={(isHovered) => setHoveredObject(isHovered ? 'dining-set-4' : null)}
          onSelect={() => handleSelect('dining-set-4')}
        />
      </InteractiveObject>

      {/* Wall-mounted Shelf */}
      <InteractiveObject objectId="shelf">
        <group position={[4.5, 2, -7.8]}>
          {/* Main shelf board */}
          <Box 
            args={[2, 0.08, 0.3]} 
            castShadow 
            receiveShadow
          >
            <meshStandardMaterial color={COLORS.WHITE} roughness={0.6} metalness={0.1} />
          </Box>

          {/* Logo above the shelf */}
          <group position={[0, 1.5, 0.1]}>
            {/* Logo Frame */}
            <Box 
              args={[1.6, 0.8, 0.1]} 
              castShadow 
              receiveShadow
            >
              <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
            </Box>

            {/* Logo Canvas */}
            <Box 
              args={[1.4, 0.6, 0.05]} 
              position={[0, 0, 0.05]}
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

            {/* Frame Details */}
            {/* Top */}
            <Box 
              args={[1.8, 0.12, 0.15]} 
              position={[0, 0.4, 0.05]}
              castShadow
            >
              <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
            </Box>
            {/* Bottom */}
            <Box 
              args={[1.8, 0.12, 0.15]} 
              position={[0, -0.4, 0.05]}
              castShadow
            >
              <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
            </Box>
            {/* Left */}
            <Box 
              args={[0.12, 1, 0.15]} 
              position={[-0.8, 0, 0.05]}
              castShadow
            >
              <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
            </Box>
            {/* Right */}
            <Box 
              args={[0.12, 1, 0.15]} 
              position={[0.8, 0, 0.05]}
              castShadow
            >
              <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
            </Box>
          </group>

          {/* Shelf supports */}
          {[-0.8, 0.8].map((x, index) => (
            <group key={`support-${index}`} position={[x, -0.1, 0]}>
              <Box 
                args={[0.08, 0.2, 0.3]} 
                castShadow 
                receiveShadow
              >
                <meshStandardMaterial color={COLORS.WHITE} roughness={0.6} metalness={0.1} />
              </Box>
            </group>
          ))}

          {/* Books on shelf */}
          {Array.from({ length: 5 }).map((_, bookIndex) => {
            const bookWidth = 0.2
            const startX = -0.8
            const x = startX + bookIndex * bookWidth
            const height = 0.3 + Math.random() * 0.1
            const thickness = 0.05 + Math.random() * 0.03
            const tilt = Math.random() * 0.1 - 0.05

            // Alternate between textured and colored books
            const useTexture = bookIndex % 2 === 0
            const textureIndex = (bookIndex % 3) + 1 // Cycle through 3 textures

            return (
              <group 
                key={`book-${bookIndex}`} 
                position={[x, height/2 + 0.04, 0]} 
                rotation={[0, 0, tilt]}
              >
                {/* Book body */}
                <Box 
                  args={[thickness, height, 0.25]} 
                  castShadow 
                  receiveShadow
                >
                  <meshStandardMaterial 
                    color={useTexture ? '#FFFFFF' : COLORS.BOOK_COLORS[Math.floor(Math.random() * COLORS.BOOK_COLORS.length)]}
                    map={useTexture ? new THREE.TextureLoader().load(`/books/book${textureIndex}.jpg`) : null}
                    roughness={0.7}
                  />
                </Box>

                {/* Book spine details */}
                <Box 
                  args={[thickness + 0.001, height * 0.1, 0.252]} 
                  position={[0, height * 0.2, 0]} 
                  castShadow 
                  receiveShadow
                >
                  <meshStandardMaterial color={COLORS.WHITE} roughness={0.8} />
                </Box>

                {/* Book edges */}
                <Box 
                  args={[thickness, height, 0.01]} 
                  position={[0, 0, 0.13]} 
                  castShadow 
                  receiveShadow
                >
                  <meshStandardMaterial color="#F5F5DC" roughness={0.5} />
                </Box>
                <Box 
                  args={[thickness, height, 0.01]} 
                  position={[0, 0, -0.13]} 
                  castShadow 
                  receiveShadow
                >
                  <meshStandardMaterial color="#F5F5DC" roughness={0.5} />
                </Box>
              </group>
            )
          })}

          {/* Small decorative plant */}
          <Box 
            args={[0.15, 0.15, 0.15]} 
            position={[0.9, 0.15, 0]} 
            castShadow 
            receiveShadow
          >
            <meshStandardMaterial color={COLORS.PLANT_GREEN} roughness={0.8} />
          </Box>
        </group>
      </InteractiveObject>

      {/* Back Wall with Painting */}
      <group position={[0, 0, -8]}>
        {/* Wall */}
        <Box 
          args={[20, 6, 0.1]} 
          position={[0, 3, 0]}
          receiveShadow
        >
          <meshStandardMaterial 
            map={new THREE.TextureLoader().load('/wall.jpg')}
            roughness={0.8}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </Box>

        {/* Wall Sconces */}
        {[-2, 2].map((x, index) => (
          <group key={`sconce-${index}`} position={[x, 4.8, 0.2]}>
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
              {/* Top ring */}
              <Cylinder 
                args={[0.12, 0.12, 0.02, 16]} 
                position={[0, 0.1, 0]} 
                castShadow
              >
                <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
              </Cylinder>
              {/* Shade */}
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
              {/* Bottom ring */}
              <Cylinder 
                args={[0.08, 0.08, 0.02, 16]} 
                position={[0, -0.1, 0]}
                castShadow
              >
                <meshStandardMaterial color={COLORS.LAMP_GOLD} metalness={0.7} roughness={0.3} />
              </Cylinder>
              {/* Light source */}
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

        {/* Starry Night Painting Frame */}
        <group position={[-2, 3, 0.1]}>
          {/* Main Frame */}
          <Box 
            args={[3.2, 2.2, 0.1]} 
            castShadow 
            receiveShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>

          {/* Painting Canvas */}
          <Box 
            args={[3, 2, 0.05]} 
            position={[0, 0, 0.05]}
            castShadow
          >
            <meshStandardMaterial
              map={new THREE.TextureLoader().load('/starry-night.jpg')}
              roughness={0.5}
              metalness={0.1}
            />
          </Box>

          {/* Frame Details */}
          {/* Top */}
          <Box 
            args={[3.4, 0.15, 0.15]} 
            position={[0, 1.1, 0.05]}
            castShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>
          {/* Bottom */}
          <Box 
            args={[3.4, 0.15, 0.15]} 
            position={[0, -1.1, 0.05]}
            castShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>
          {/* Left */}
          <Box 
            args={[0.15, 2.4, 0.15]} 
            position={[-1.6, 0, 0.05]}
            castShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>
          {/* Right */}
          <Box 
            args={[0.15, 2.4, 0.15]} 
            position={[1.6, 0, 0.05]}
            castShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>
        </group>

        {/* Mona Lisa Painting Frame */}
        <group position={[2, 3, 0.1]}>
          {/* Main Frame */}
          <Box 
            args={[2.2, 3.2, 0.1]} 
            castShadow 
            receiveShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>

          {/* Painting Canvas */}
          <Box 
            args={[2, 3, 0.05]} 
            position={[0, 0, 0.05]}
            castShadow
          >
            <meshStandardMaterial
              map={new THREE.TextureLoader().load('/mona-lisa.jpg')}
              roughness={0.5}
              metalness={0.1}
            />
          </Box>

          {/* Frame Details */}
          {/* Top */}
          <Box 
            args={[2.4, 0.15, 0.15]} 
            position={[0, 1.6, 0.05]}
            castShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>
          {/* Bottom */}
          <Box 
            args={[2.4, 0.15, 0.15]} 
            position={[0, -1.6, 0.05]}
            castShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>
          {/* Left */}
          <Box 
            args={[0.15, 3.4, 0.15]} 
            position={[-1.1, 0, 0.05]}
            castShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>
          {/* Right */}
          <Box 
            args={[0.15, 3.4, 0.15]} 
            position={[1.1, 0, 0.05]}
            castShadow
          >
            <meshStandardMaterial color={COLORS.FRAME_COLOR} roughness={0.7} />
          </Box>
        </group>

        {/* Additional spot lights for the paintings */}
        <spotLight
          position={[-2, 4, -6]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={1.2}
          target-position={[-2, 3, -7.9]}
          castShadow
        />
        <spotLight
          position={[2, 4, -6]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={1.2}
          target-position={[2, 3, -7.9]}
          castShadow
        />

        {/* Additional spotlight for the logo */}
        <spotLight
          position={[4.5, 4, -6]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={1}
          target-position={[4.5, 3.5, -7.9]}
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