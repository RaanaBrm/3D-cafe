import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { ThreeEvent } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material
  }
}

interface WoodenDiningSetProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  onHover?: (isHovered: boolean) => void
  onSelect?: () => void
}

export default function WoodenDiningSet({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  onHover,
  onSelect
}: WoodenDiningSetProps) {
  const { scene: originalScene } = useGLTF('/simple-dining-table/source/dining-table.glb') as GLTFResult
  
  // Clone the scene for each instance
  const scene = useMemo(() => {
    const clonedScene = originalScene.clone(true)
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clonedScene
  }, [originalScene])

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        onHover?.(true)
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        onHover?.(false)
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        onSelect?.()
      }}
    />
  )
}

useGLTF.preload('/simple-dining-table/source/dining-table.glb') 