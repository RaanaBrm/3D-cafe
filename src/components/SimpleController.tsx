import { useRef } from 'react'
import { Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

export default function SimpleController({ hand = 'right' }: { hand?: 'left' | 'right' }) {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef}>
      {/* Handle */}
      <Cylinder 
        args={[0.02, 0.025, 0.12, 8]} 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, 0, -0.05]}
      >
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      
      {/* Main body */}
      <Box args={[0.06, 0.06, 0.15]} position={[0, 0, 0.02]}>
        <meshStandardMaterial color="#444444" />
      </Box>

      {/* Trigger */}
      <Box 
        args={[0.02, 0.02, 0.04]} 
        position={[0, -0.03, 0]}
        rotation={[0.3, 0, 0]}
      >
        <meshStandardMaterial color="#222222" />
      </Box>

      {/* Ray */}
      <Cylinder
        args={[0.002, 0.002, 1, 4]}
        position={[0, 0, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="#00ff00" opacity={0.5} transparent />
      </Cylinder>
    </group>
  )
} 