import React from 'react'
import { useState } from "react";
import { Vector3 } from 'three';
//three.js

interface propsSphere{
    color: string,
    position: Vector3
}

const Sphere = (props: propsSphere) => {

    const [color, setcolor] = useState(props.color)
    return (
        <mesh position={props.position} onClick={(e) => setcolor('#ff00ff')}>
            <sphereGeometry />
            <meshPhongMaterial color={color} wireframe />
        </mesh>
    )
}

export default Sphere