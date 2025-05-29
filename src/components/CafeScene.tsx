import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Plane, Cylinder } from '@react-three/drei'
import { Interactive, useXR } from '@react-three/xr'
import * as THREE from 'three'

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
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={COLORS.FLOOR}
          roughness={0.8}
          metalness={0.2}
          toneMapped={false}
        />
      </Plane>

      {/* Character */}
      <InteractiveObject objectId="character">
        <group position={[-2, 0, 0]} rotation={[0, Math.PI * 0.25, 0]}>
          {/* Body */}
          <group position={[0, 0.9, 0]}>
            {/* Torso */}
            <Box args={[0.4, 0.6, 0.2]} position={[0, 0.3, 0]} castShadow receiveShadow>
              <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
            </Box>
            
            {/* Name Tag */}
            <group position={[0.12, 0.4, 0.101]}>
              {/* Tag Background */}
              <Box 
                args={[0.12, 0.04, 0.001]} 
                castShadow
              >
                <meshStandardMaterial 
                  color={COLORS.NAME_TAG}
                  metalness={0.7}
                  roughness={0.3}
                />
              </Box>
              {/* Tag Border */}
              <Box 
                args={[0.13, 0.05, 0.002]} 
                position={[0, 0, -0.001]}
              >
                <meshStandardMaterial 
                  color={COLORS.BLACK}
                  roughness={0.8}
                />
              </Box>
              {/* Name Text - using simple shapes for "Emma" */}
              <group position={[-0.05, 0, 0.001]} scale={[0.4, 0.4, 0.4]}>
                {/* E */}
                <Box args={[0.02, 0.08, 0.001]} position={[0, 0, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.04, 0.02, 0.001]} position={[0.02, 0.03, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.04, 0.02, 0.001]} position={[0.02, 0, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.04, 0.02, 0.001]} position={[0.02, -0.03, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                {/* m */}
                <Box args={[0.02, 0.06, 0.001]} position={[0.08, -0.01, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.02, 0.06, 0.001]} position={[0.12, -0.01, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.02, 0.06, 0.001]} position={[0.16, -0.01, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.1, 0.02, 0.001]} position={[0.12, 0.02, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                {/* m */}
                <Box args={[0.02, 0.06, 0.001]} position={[0.20, -0.01, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.02, 0.06, 0.001]} position={[0.24, -0.01, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.02, 0.06, 0.001]} position={[0.28, -0.01, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.1, 0.02, 0.001]} position={[0.24, 0.02, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                {/* a */}
                <Box args={[0.02, 0.06, 0.001]} position={[0.32, -0.01, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.02, 0.06, 0.001]} position={[0.36, -0.01, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.06, 0.02, 0.001]} position={[0.34, 0.02, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.06, 0.02, 0.001]} position={[0.34, -0.02, 0]}>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
              </group>
            </group>

            {/* Waist */}
            <Box args={[0.35, 0.2, 0.2]} position={[0, -0.1, 0]} castShadow receiveShadow>
              <meshStandardMaterial color={COLORS.DARK_GRAY} />
            </Box>
          </group>

          {/* Head and Neck */}
          <group position={[0, 1.8, 0]}>
            {/* Neck */}
            <Cylinder args={[0.08, 0.1, 0.1, 16]} position={[0, -0.1, 0]} castShadow receiveShadow>
              <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
            </Cylinder>
            {/* Head */}
            <group position={[0, 0.1, 0]}>
              {/* Main head */}
              <Cylinder args={[0.15, 0.15, 0.25, 16]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
              </Cylinder>
              {/* Face details */}
              <Box args={[0.12, 0.04, 0.02]} position={[0, 0, 0.15]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.DARK_GRAY} />
              </Box>
              {/* Eyes */}
              <group position={[0, 0.02, 0.15]}>
                <Box args={[0.03, 0.03, 0.02]} position={[0.04, 0, 0]} castShadow receiveShadow>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
                <Box args={[0.03, 0.03, 0.02]} position={[-0.04, 0, 0]} castShadow receiveShadow>
                  <meshStandardMaterial color={COLORS.BLACK} />
                </Box>
              </group>

              {/* Blonde Hair */}
              {/* Top hair */}
              <Box 
                args={[0.32, 0.1, 0.32]} 
                position={[0, 0.15, 0]}
                castShadow
              >
                <meshStandardMaterial color={COLORS.BLONDE_HAIR} />
              </Box>
              {/* Side hair pieces */}
              {[0.16, -0.16].map((x, index) => (
                <Box
                  key={`hair-side-${index}`}
                  args={[0.08, 0.35, 0.15]}
                  position={[x, -0.05, 0]}
                  castShadow
                >
                  <meshStandardMaterial color={COLORS.BLONDE_HAIR} />
                </Box>
              ))}
              {/* Back hair */}
              <Box
                args={[0.3, 0.4, 0.1]}
                position={[0, -0.05, -0.12]}
                castShadow
              >
                <meshStandardMaterial color={COLORS.BLONDE_HAIR} />
              </Box>
            </group>
          </group>

          {/* Arms and Hands */}
          <group position={[0, 1.4, 0]}>
            {/* Left Arm */}
            <group position={[-0.25, 0, 0]}>
              <Cylinder args={[0.05, 0.05, 0.4, 8]} position={[-0.1, -0.2, 0]} rotation={[0, 0, 0.4]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
              </Cylinder>
              <Cylinder args={[0.05, 0.05, 0.4, 8]} position={[-0.25, -0.5, 0]} rotation={[0, 0, 0.1]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
              </Cylinder>
              {/* Left Hand */}
              <group position={[-0.3, -0.7, 0]}>
                <Box args={[0.08, 0.12, 0.04]} castShadow receiveShadow>
                  <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
                </Box>
                {/* Fingers */}
                <Box args={[0.08, 0.06, 0.03]} position={[0, -0.08, 0.02]} castShadow receiveShadow>
                  <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
                </Box>
              </group>
            </group>
            {/* Right Arm */}
            <group position={[0.25, 0, 0]}>
              <Cylinder args={[0.05, 0.05, 0.4, 8]} position={[0.1, -0.2, 0]} rotation={[0, 0, -0.4]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
              </Cylinder>
              <Cylinder args={[0.05, 0.05, 0.4, 8]} position={[0.25, -0.5, 0]} rotation={[0, 0, -0.1]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
              </Cylinder>
              {/* Right Hand */}
              <group position={[0.3, -0.7, 0]}>
                <Box args={[0.08, 0.12, 0.04]} castShadow receiveShadow>
                  <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
                </Box>
                {/* Fingers */}
                <Box args={[0.08, 0.06, 0.03]} position={[0, -0.08, 0.02]} castShadow receiveShadow>
                  <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
                </Box>
              </group>
            </group>
          </group>

          {/* Legs */}
          <group position={[0, 0.5, 0]}>
            {/* Left Leg */}
            <group position={[-0.1, 0, 0]}>
              <Cylinder args={[0.07, 0.07, 0.5, 8]} position={[0, -0.25, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.DARK_GRAY} />
              </Cylinder>
              <Cylinder args={[0.07, 0.07, 0.4, 8]} position={[0, -0.7, 0.05]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
              </Cylinder>
              {/* Foot */}
              <Box args={[0.1, 0.1, 0.2]} position={[0, -0.9, 0.1]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.DARK_GRAY} />
              </Box>
            </group>
            {/* Right Leg */}
            <group position={[0.1, 0, 0]}>
              <Cylinder args={[0.07, 0.07, 0.5, 8]} position={[0, -0.25, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.DARK_GRAY} />
              </Cylinder>
              <Cylinder args={[0.07, 0.07, 0.4, 8]} position={[0, -0.7, 0.05]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.LIGHT_GRAY} />
              </Cylinder>
              {/* Foot */}
              <Box args={[0.1, 0.1, 0.2]} position={[0, -0.9, 0.1]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.DARK_GRAY} />
              </Box>
            </group>
          </group>
        </group>
      </InteractiveObject>

      {/* Round Table with Cup */}
      <InteractiveObject objectId="table">
        <group position={[1.5, 0, 0]}>
          {/* Table Top */}
          <Cylinder args={[0.9, 0.9, 0.05, 32]} position={[0, 0.7, 0]} castShadow receiveShadow>
            <meshStandardMaterial
              color={COLORS.DARK_BROWN}
              roughness={0.7}
              metalness={0.1}
              emissive={hoveredObject === 'table' ? COLORS.DARK_BROWN : '#000000'}
              emissiveIntensity={0.2}
              toneMapped={false}
            />
          </Cylinder>
          {/* Table Leg */}
          <Cylinder args={[0.08, 0.08, 0.7, 8]} position={[0, 0.35, 0]} castShadow receiveShadow>
            <meshStandardMaterial
              color={COLORS.DARK_BROWN}
              roughness={0.7}
              metalness={0.1}
            />
          </Cylinder>
          {/* Base */}
          <Cylinder args={[0.4, 0.4, 0.05, 16]} position={[0, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial
              color={COLORS.DARK_BROWN}
              roughness={0.7}
              metalness={0.1}
            />
          </Cylinder>
          
          {/* Coffee Cup */}
          <group position={[0.3, 0.75, 0]}>
            {/* Cup Body */}
            <Cylinder args={[0.06, 0.04, 0.12, 16]} castShadow receiveShadow>
              <meshStandardMaterial color={COLORS.WHITE} roughness={0.2} metalness={0.1} />
            </Cylinder>
            {/* Cup Handle */}
            <group position={[0.06, 0, 0]} rotation={[0, -Math.PI/2, 0]}>
              <Cylinder args={[0.03, 0.03, 0.02, 8]} position={[0, 0, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.WHITE} />
              </Cylinder>
              <Cylinder args={[0.03, 0.03, 0.04, 8]} position={[0, 0.04, 0]} rotation={[Math.PI/2, 0, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.WHITE} />
              </Cylinder>
              <Cylinder args={[0.03, 0.03, 0.02, 8]} position={[0, 0.08, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={COLORS.WHITE} />
              </Cylinder>
            </group>
            {/* Coffee Surface */}
            <Cylinder args={[0.055, 0.055, 0.01, 16]} position={[0, 0.06, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4A2C2A" roughness={0.3} />
            </Cylinder>
          </group>
          
          {/* Rose Vase */}
          <group position={[-0.2, 0.75, 0]}>
            {/* Glass Vase */}
            <Cylinder 
              args={[0.04, 0.03, 0.12, 16]} 
              castShadow 
              receiveShadow
            >
              <meshStandardMaterial 
                color={COLORS.WHITE} 
                transparent={true} 
                opacity={0.6}
                roughness={0.1}
                metalness={0.3}
              />
            </Cylinder>

            {/* Water effect */}
            <Cylinder 
              args={[0.035, 0.025, 0.08, 16]} 
              position={[0, -0.01, 0]}
            >
              <meshStandardMaterial 
                color="#ADD8E6"
                transparent={true}
                opacity={0.3}
                roughness={0.1}
              />
            </Cylinder>

            {/* Rose Stems */}
            {Array.from({ length: 3 }).map((_, index) => {
              const angle = (index * Math.PI * 2) / 3 + Math.random() * 0.5
              const radius = 0.01 + Math.random() * 0.01
              return (
                <group key={`stem-${index}`} position={[radius * Math.cos(angle), 0.06, radius * Math.sin(angle)]}>
                  <Cylinder 
                    args={[0.003, 0.003, 0.15, 8]} 
                    position={[0, 0.075, 0]}
                    rotation={[0.2 * Math.random(), 0, 0.2 * Math.random()]}
                    castShadow
                  >
                    <meshStandardMaterial color={COLORS.ROSE_GREEN} />
                  </Cylinder>
                  
                  {/* Rose Flower */}
                  <group position={[0, 0.15, 0]} rotation={[0.2 * Math.random(), 0, 0.2 * Math.random()]}>
                    {/* Center of the rose */}
                    <Cylinder 
                      args={[0.015, 0.015, 0.02, 16]} 
                      castShadow
                    >
                      <meshStandardMaterial color={COLORS.ROSE_RED} />
                    </Cylinder>
                    
                    {/* Rose petals */}
                    {Array.from({ length: 8 }).map((_, petalIndex) => {
                      const petalAngle = (petalIndex * Math.PI * 2) / 8
                      return (
                        <group 
                          key={`petal-${petalIndex}`} 
                          position={[
                            0.01 * Math.cos(petalAngle),
                            0,
                            0.01 * Math.sin(petalAngle)
                          ]}
                          rotation={[
                            0.3 + Math.random() * 0.2,
                            petalAngle,
                            0.5 + Math.random() * 0.2
                          ]}
                        >
                          <Box 
                            args={[0.02, 0.01, 0.02]} 
                            castShadow
                          >
                            <meshStandardMaterial 
                              color={COLORS.ROSE_RED}
                              roughness={0.6}
                            />
                          </Box>
                        </group>
                      )
                    })}
                  </group>

                  {/* Small Leaves */}
                  {Array.from({ length: 2 }).map((_, leafIndex) => (
                    <group 
                      key={`leaf-${index}-${leafIndex}`}
                      position={[0, 0.05 + leafIndex * 0.06, 0]}
                      rotation={[0, Math.PI * 2 * Math.random(), 0]}
                    >
                      <Box 
                        args={[0.02, 0.01, 0.04]}
                        castShadow
                      >
                        <meshStandardMaterial color={COLORS.ROSE_GREEN} />
                      </Box>
                    </group>
                  ))}
                </group>
              )
            })}
          </group>
        </group>
      </InteractiveObject>

      {/* Chairs */}
      {[
        [3.5, 0], // First chair position - moved further right
        [0, 0]  // Second chair position - moved further left
      ].map(([x, z], index) => (
        <InteractiveObject key={`chair-${index}`} objectId={`chair-${index}`}>
          <group position={[x, 0, z]} rotation={[0, index === 0 ? Math.PI * 0.1 : -Math.PI * 0.1, 0]}>
            {/* Seat */}
            <Box args={[0.45, 0.05, 0.45]} position={[0, 0.45, 0]} castShadow receiveShadow>
              <meshStandardMaterial
                color={COLORS.LIGHT_BROWN}
                roughness={0.9}
                metalness={0.1}
                emissive={hoveredObject === `chair-${index}` ? COLORS.LIGHT_BROWN : '#000000'}
                emissiveIntensity={0.2}
                toneMapped={false}
              />
            </Box>
            {/* Back */}
            <Box args={[0.45, 0.5, 0.05]} position={[0, 0.7, -0.2]} castShadow receiveShadow>
              <meshStandardMaterial
                color={COLORS.LIGHT_BROWN}
                roughness={0.9}
                metalness={0.1}
              />
            </Box>
            {/* Legs */}
            {[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].map(([legX, legZ], legIndex) => (
              <Box
                key={`leg-${legIndex}`}
                args={[0.05, 0.45, 0.05]}
                position={[legX, 0.225, legZ]}
                castShadow
                receiveShadow
              >
                <meshStandardMaterial color={COLORS.LIGHT_BROWN} />
              </Box>
            ))}
          </group>
        </InteractiveObject>
      ))}

      {/* Wall-mounted Shelf */}
      <InteractiveObject objectId="shelf">
        <group position={[3, 2, -7.8]}>
          {/* Main shelf board */}
          <Box 
            args={[2, 0.08, 0.3]} 
            castShadow 
            receiveShadow
          >
            <meshStandardMaterial color={COLORS.WHITE} roughness={0.6} metalness={0.1} />
          </Box>

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
          <meshStandardMaterial color={COLORS.WALL_COLOR} />
        </Box>

        {/* Wall Sconces */}
        {[-1.8, 1.8].map((x, index) => (
          <group key={`sconce-${index}`} position={[x, 4.2, 0.2]}>
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

        {/* Painting Frame */}
        <group position={[0, 3, 0.1]}>
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
      </group>

      {/* Plant Pot with Leaves */}
      <InteractiveObject objectId="plant">
        <group position={[4.2, 0, 0.3]} rotation={[0, Math.PI * 0.15, 0]}>
          {/* Pot base */}
          <Cylinder 
            args={[0.25, 0.2, 0.05, 32]} 
            position={[0, 0.025, 0]} 
            castShadow 
            receiveShadow
          >
            <meshStandardMaterial color={COLORS.POT_BROWN} roughness={0.8} />
          </Cylinder>

          {/* Pot body */}
          <Cylinder 
            args={[0.2, 0.25, 0.5, 32]} 
            position={[0, 0.3, 0]} 
            castShadow 
            receiveShadow
          >
            <meshStandardMaterial color={COLORS.POT_BROWN} roughness={0.8} />
          </Cylinder>

          {/* Plant stems and leaves */}
          <group position={[0, 0.55, 0]}>
            {/* Center tall stem with leaves */}
            <group rotation={[0, Math.random() * Math.PI * 2, 0]}>
              <Cylinder 
                args={[0.02, 0.02, 1, 8]} 
                position={[0, 0.5, 0]} 
                rotation={[0.1, 0, 0]} 
                castShadow
              >
                <meshStandardMaterial color={COLORS.PLANT_GREEN} />
              </Cylinder>
              {/* Leaves for center stem */}
              {[0.4, 0.6, 0.8].map((height, index) => (
                <group key={`center-leaf-${index}`} position={[0, height, 0]}>
                  <Box 
                    args={[0.25, 0.02, 0.4]} 
                    rotation={[0.3, Math.PI * 0.2 * (index % 2 ? 1 : -1), 0]}
                    castShadow
                  >
                    <meshStandardMaterial color={COLORS.PLANT_GREEN} />
                  </Box>
                </group>
              ))}
            </group>

            {/* Side stems with leaves */}
            {Array.from({ length: 6 }).map((_, index) => {
              const angle = (index * Math.PI / 3) + Math.random() * 0.5
              const tilt = 0.4 + Math.random() * 0.3
              return (
                <group key={`stem-${index}`} rotation={[0, angle, 0]}>
                  <Cylinder 
                    args={[0.015, 0.015, 0.7, 8]} 
                    position={[0.15, 0.35, 0]} 
                    rotation={[tilt, 0, 0.2]} 
                    castShadow
                  >
                    <meshStandardMaterial color={COLORS.PLANT_GREEN} />
                  </Cylinder>
                  {/* Leaves for side stems */}
                  {[0.3, 0.5].map((height, leafIndex) => (
                    <group 
                      key={`leaf-${index}-${leafIndex}`} 
                      position={[0.15, height, 0]}
                      rotation={[tilt, 0, 0.2]}
                    >
                      <Box 
                        args={[0.2, 0.02, 0.35]} 
                        rotation={[0.3, Math.PI * 0.2 * (leafIndex % 2 ? 1 : -1), 0]}
                        castShadow
                      >
                        <meshStandardMaterial color={COLORS.PLANT_LIGHT_GREEN} />
                      </Box>
                    </group>
                  ))}
                </group>
              )
            })}
          </group>
        </group>
      </InteractiveObject>

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
      {/* Additional spot light for the painting */}
      <spotLight
        position={[0, 4, -6]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1.2}
        target-position={[0, 3, -7.9]}
        castShadow
      />
    </group>
  )
} 