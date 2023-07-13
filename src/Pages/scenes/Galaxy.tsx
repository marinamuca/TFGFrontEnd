import React from 'react'
// three.js
import Sphere from "../../components/Sphere";
import { Vector3 } from 'three'; 'three'
// drei
import {OrbitControls, Stars} from '@react-three/drei'
import { Canvas } from '@react-three/fiber';

const Galaxy = () => {
  return (
    <Canvas>
        <color attach="background" args={['#161c24']} />
        <Sphere color="#00ff00" position={new Vector3(-2,0,0)}/>
        <Sphere color="#0000ff" position={new Vector3(2,0,0)}/>
        <ambientLight/>
        <OrbitControls autoRotate/>
        <Stars/>
    </Canvas>
  )
}

export default Galaxy