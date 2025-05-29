import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { VRButton, XR, useXR } from '@react-three/xr'
import { Suspense } from 'react'
import CafeScene from './components/CafeScene'
import SimpleController from './components/SimpleController'

function VREnvironment() {
  const { isPresenting } = useXR()

  return (
    <>
      <color attach="background" args={['#808080']} />
      <fog attach="fog" args={['#808080', 10, 20]} />
      <Suspense fallback={null}>
        <CafeScene />
        {isPresenting && (
          <>
            <SimpleController hand="right" />
            <SimpleController hand="left" />
          </>
        )}
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          makeDefault
        />
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <>
      <VRButton className="vr-button" />
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas
          camera={{ 
            position: [0, 1.6, 3],
            fov: 50,
            near: 0.1,
            far: 1000
          }}
          shadows="soft"
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            logarithmicDepthBuffer: true
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            touchAction: 'none'
          }}
        >
          <XR
            referenceSpace="local"
          >
            <VREnvironment />
          </XR>
        </Canvas>
      </div>
      <style>{`
        .vr-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          z-index: 1000;
        }
        .vr-button:hover {
          background: #333333;
        }
      `}</style>
    </>
  )
} 