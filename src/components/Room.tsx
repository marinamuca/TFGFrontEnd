
import * as THREE from 'three'
import React from 'react'
import { Euler, Vector3 } from '@react-three/fiber';
import { RoomCell, CellType, EdgeType } from './RoomCell';
;

interface roomProps{
    rows: number;
    cols: number;
    materialSuelo?: THREE.Material;
    materialPared?: THREE.Material;
}

function checkCorner(i: number,j: number, rows: number, cols: number){
    return( i==0 && j==0 || 
            i==0 && j==cols-1 || 
            i==rows-1 && j==0 || 
            i==rows-1 && j==cols-1)
}

function cornerRotation(i: number, j: number, rows: number, cols: number){
    let rotation = [0,0,0] as Euler
    if(i==0 && j==cols-1)   
        rotation = [0,Math.PI/2,0]
    else if (i==rows-1 && j==cols-1)
        rotation = [0,Math.PI,0]
    else if (i==rows-1 && j==0)
        rotation = [0,(3*Math.PI/2),0]
    
    return rotation
}

function checkEdge(i: number,j: number, rows: number, cols: number){
    return( i==0 || j==0 || i==rows-1 || j==cols-1)
}

function edgeRotation(i: number, j: number, rows: number, cols: number){
    let rotation = [0,0,0] as Euler
    if(j == cols-1)
        rotation = [0,Math.PI/2,0]
    else if (i == rows-1)
        rotation = [0,Math.PI,0]
    else if (j == 0)
        rotation = [0,(3*Math.PI/2),0]
    return rotation
}

export function Room(props: roomProps) {
    let roomComps = []
    const floorWidth = 2

    for (let i = 0; i < props.rows; i++) {
        for (let j = 0; j < props.cols; j++) {
            let position = [0+i*floorWidth,0,0+j*floorWidth] as Vector3
            let rotation = [0,0,0] as Euler
            let material = new THREE.MeshStandardMaterial()
            let cellType = CellType.floor
            let edgeType = EdgeType.rounded

            if( checkCorner(i, j, props.rows, props.cols)){ 
                // CORNER
                material.color = new THREE.Color(0x00ff00)  
                cellType = CellType.corner
                rotation = cornerRotation(i, j, props.rows, props.cols)
            } else if (checkEdge(i, j, props.rows, props.cols)) {
                // EDGE
                material.color = new THREE.Color(0xff00ff)  
                cellType = CellType.wall
                rotation = edgeRotation(i, j, props.rows, props.cols)
            } //INTERIOR
            roomComps.push(<RoomCell    materialSuelo={material} materialPared={material} 
                                        type={cellType} edgeType={edgeType} 
                                        groupProps={{position: position, rotation: rotation}} />)   
        }
    }
    return (
        <>
            {...roomComps}
        </>
    )
}
