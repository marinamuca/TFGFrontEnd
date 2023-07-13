import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber';
import {Picker} from "../../components/Box";
import { OrbitControls, Environment } from '@react-three/drei';
import { ColorPicker, Room } from "../../components/Room";

const RoomScene = () => {
    return (
        <>
            <Picker/>
            <Canvas>
                <ambientLight intensity={0.5}/>
                <Suspense fallback={null}>
                    <Room rows={3} cols={3}></Room>
                    <Environment files="textures/hdr.hdr"/>
                </Suspense>
                <OrbitControls/>
                <spotLight intensity={0.3} position={[5,20,20]}/>
            </Canvas>
            <ColorPicker/>
        </>
    )
}

export default RoomScene
