import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber';
import {Box, Picker} from "../components/Box";
import { OrbitControls, Environment } from '@react-three/drei';
import { Wall } from '../components/Wall';
import { Illustration } from '../components/Illustration';
import { Room } from "../components/Room";

const GltfScene = () => {
    const [texture, setTexture] = useState('textures/1.jpg')
    return (
        <>
            <Picker/>
            <Canvas>
                <ambientLight intensity={0.5}/>
                <Suspense fallback={null}>
                    {/* <Wall/> */}
                    {/* <Illustration meshProps={ {position: [-0.9999,1.3,0], rotation: [0,Math.PI/2,0], onClick: ((e) => {setTexture('textures/2.jpg')}) } } imgUrl={texture}></Illustration> */}
                    <Room rows={3} cols={3}></Room>
                    <Environment files="textures/hdr.hdr"/>
                </Suspense>
                <OrbitControls/>
                <spotLight intensity={0.3} position={[5,20,20]}/>
            </Canvas>
        </>
    )
}

export default GltfScene
