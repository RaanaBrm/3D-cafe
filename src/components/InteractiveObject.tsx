import { ReactNode, useState, useRef } from 'react'
import { Interactive, useXR } from '@react-three/xr'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface InteractiveObjectProps {
  children: ReactNode
  objectId: string
  position?: [number, number, number]
  canPickup?: boolean
  canRotate?: boolean
  onHover?: (isHovered: boolean) => void
  onSelect?: () => void
}

export default function InteractiveObject({
  children,
  objectId,
  position = [0, 0, 0],
  canPickup = true,
  canRotate = true,
  onHover,
  onSelect
}: InteractiveObjectProps) {
  const { isPresenting } = useXR()
  const groupRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isGrabbed, setIsGrabbed] = useState(false)
  const [initialPosition] = useState<[number, number, number]>(position)
  const [initialRotation] = useState<[number, number, number]>([0, 0, 0])
  
  // Animation states
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>(position)
  const [targetRotation, setTargetRotation] = useState<[number, number, number]>([0, 0, 0])
  
  useFrame(() => {
    if (!groupRef.current) return
    
    // Smooth position lerping
    groupRef.current.position.lerp(new THREE.Vector3(...targetPosition), 0.1)
    
    // Smooth rotation lerping
    const currentRotation = new THREE.Euler().setFromQuaternion(groupRef.current.quaternion)
    const targetEuler = new THREE.Euler(...targetRotation)
    
    currentRotation.x = THREE.MathUtils.lerp(currentRotation.x, targetEuler.x, 0.1)
    currentRotation.y = THREE.MathUtils.lerp(currentRotation.y, targetEuler.y, 0.1)
    currentRotation.z = THREE.MathUtils.lerp(currentRotation.z, targetEuler.z, 0.1)
    
    groupRef.current.setRotationFromEuler(currentRotation)
    
    // Hover effect - slight floating animation
    if (isHovered && !isGrabbed) {
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.003) * 0.02
    }
  })
  
  const handleSelect = (e: any) => {
    if (!canPickup) return
    
    setIsGrabbed(!isGrabbed)
    if (!isGrabbed) {
      // Start grabbing - move object to controller position
      setTargetPosition([
        e.controller.controller.position.x,
        e.controller.controller.position.y,
        e.controller.controller.position.z
      ])
    } else {
      // Release object - return to initial position
      setTargetPosition(initialPosition)
      setTargetRotation(initialRotation)
    }
    
    onSelect?.()
  }
  
  const handleMove = (e: any) => {
    if (!isGrabbed || !canPickup) return
    
    // Update position and rotation based on controller
    const controller = e.controller.controller
    setTargetPosition([
      controller.position.x,
      controller.position.y,
      controller.position.z
    ])
    
    if (canRotate) {
      setTargetRotation([
        controller.rotation.x,
        controller.rotation.y,
        controller.rotation.z
      ])
    }
  }
  
  const handleHover = (isHovering: boolean) => {
    setIsHovered(isHovering)
    onHover?.(isHovering)
  }

  return (
    <Interactive
      onSelect={handleSelect}
      onHover={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      onMove={handleMove}
    >
      <group
        ref={groupRef}
        position={position}
      >
        {children}
        {/* Hover indicator */}
        {isHovered && isPresenting && (
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.01, 32]} />
            <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
          </mesh>
        )}
        {/* Grab points */}
        {isHovered && canPickup && isPresenting && (
          <>
            {[[-0.3, 0, 0], [0.3, 0, 0]].map((pos, i) => (
              <mesh key={i} position={pos as [number, number, number]}>
                <sphereGeometry args={[0.03]} />
                <meshBasicMaterial color="#ffff00" />
              </mesh>
            ))}
          </>
        )}
      </group>
    </Interactive>
  )
} 