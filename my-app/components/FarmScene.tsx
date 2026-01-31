"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Float, Center, Html } from "@react-three/drei";
import * as ONE from "three";

function Model(props: any) {
     const { scene } = useGLTF("/farm_scene.glb");
     const modelRef = useRef<ONE.Group>(null);

     useFrame((state) => {
          if (modelRef.current) {
               modelRef.current.rotation.y += 0.002;
          }
     });

     return (
          <primitive
               object={scene}
               ref={modelRef}
               {...props}
          />
     );
}

function LoaderComponent() {
     return (
          <Html center>
               <div className="text-emerald-500 font-bold text-lg animate-pulse">Loading Farm...</div>
          </Html>
     );
}

export default function FarmScene() {
     return (
          <div className="w-full h-full min-h-[400px] relative">
               <Canvas
                    camera={{ position: [5, 4, 5], fov: 45 }}
                    gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
                    dpr={[1, 2]}
                    shadows
               >
                    <Suspense fallback={<LoaderComponent />}>
                         <ambientLight intensity={2} />
                         <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={3} castShadow />
                         <pointLight position={[-10, -5, -10]} intensity={2} color="#4ade80" />

                         <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[0, 0.5]}>
                              <Center top>
                                   <Model scale={[2.8, 2.8, 2.8]} />
                              </Center>
                         </Float>

                         <Environment preset="forest" />
                         <OrbitControls
                              enableZoom={false}
                              enablePan={false}
                              minPolarAngle={Math.PI / 3}
                              maxPolarAngle={Math.PI / 2}
                              autoRotate
                              autoRotateSpeed={0.8}
                         />
                    </Suspense>
               </Canvas>
          </div>
     );
}

useGLTF.preload("/farm_scene.glb");
