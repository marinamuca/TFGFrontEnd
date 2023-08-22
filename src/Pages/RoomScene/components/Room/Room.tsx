
import * as THREE from 'three'
import useRoom from './hooks/useRoom';
import useGenerateRoom from './hooks/useGenerateRoom';
import React from 'react';

interface roomProps{
    rows: number;
    cols: number;
    illustrations: any;
    materialSuelo?: THREE.Material;
    materialPared?: THREE.Material;
}

function Room(props: roomProps) {
    let placed_illustrations = props.illustrations.filter( (illustration: any) => illustration.position > -1 )

    const { handleFrameChange, handleDeleteFrame, color} = useRoom(props.illustrations, placed_illustrations);
      
    const { generateRoom } = useGenerateRoom(props.rows, props.cols, props.illustrations, handleFrameChange, handleDeleteFrame, color);
   

    return (
        <group>
            {...generateRoom()}
        </group>
    )
}

export default React.memo(Room);