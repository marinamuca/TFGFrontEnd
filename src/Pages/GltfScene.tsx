import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import {Box, Picker} from "../components/Box";
import { OrbitControls, Environment } from '@react-three/drei';
import { Room } from '../components/Room';

const GltfScene = () => {
    return (
        <>
            <Picker/>
            <Canvas>
                <ambientLight intensity={0.5}/>
                <Suspense fallback={null}>
                    {/* <Wall rotation={[0,-Math.PI/2,0]}/> */}
                    <Room rows={9} cols={3}></Room>
                    <Environment files="textures/hdr.hdr"/>
                </Suspense>
                <OrbitControls/>
                <spotLight intensity={0.3} position={[5,20,20]}/>
            </Canvas>
        </>
    )
}

export default GltfScene
