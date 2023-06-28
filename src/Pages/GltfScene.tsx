import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import {Box, Picker} from "../components/Box";
import { OrbitControls, Environment } from '@react-three/drei';
import { Room } from '../components/Room';
import { Wall } from '../components/Wall';
import { Illustration } from '../components/Illustration';

const GltfScene = () => {
    return (
        <>
            <Picker/>
            <Canvas>
                <ambientLight intensity={0.5}/>
                <Suspense fallback={null}>
                    <Wall/>
                    <Illustration meshProps={ {position: [-0.9999,1.3,0], rotation: [0,Math.PI/2,0]} } imgUrl='textures/1.jpg'></Illustration>
                    <Environment files="textures/hdr.hdr"/>
                </Suspense>
                <OrbitControls/>
                <spotLight intensity={0.3} position={[5,20,20]}/>
            </Canvas>
        </>
    )
}

export default GltfScene
