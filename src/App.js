import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows, MeshWobbleMaterial,OrbitControls } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSpring, a } from 'react-spring/three';


softShadows();

const SpaceShip = () => {
  const [model,setModel]=useState();
  useEffect(() => {
    new GLTFLoader().load('/scene.gltf', setModel);
  })
  return (model? <primitive object={model.scene} /> : null)
}


const Box = () => {
  const mesh = useRef(null);
  const [expand, setExpand] = useState(false)
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  useFrame(() => { mesh.current.rotation.x = mesh.current.rotation.y += 0.01 });
  return (
    <a.mesh onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      ref={mesh}>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <MeshWobbleMaterial
        attach='material'
        color='lightgray'
        speed={1}
        factor={0.6} />
    </a.mesh>
  )
}


function App() {
  return (
    <>
      <Canvas 
        shadowMap
        colorManagement camera={{ position: [-5, 2, 10], fov: 60 }} >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* <spotLight position={[15,20,5]} penumbra={1} castShadow/> */}

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
        </group>
        {/* <Box /> */}
        <OrbitControls />
        <SpaceShip/>
      </Canvas>
    </>
  );
}

export default App;
