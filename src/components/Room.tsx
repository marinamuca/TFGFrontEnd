
import * as THREE from 'three'
import React, { useState } from 'react'
import { Euler, Vector3 } from '@react-three/fiber';
import { RoomCell, CellType, EdgeType } from './RoomCell';
import {HexColorPicker} from "react-colorful";
import {proxy, useSnapshot} from "valtio"

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

const state = proxy({
    showPicker: false,
    color: "#ffffff"
  })

export function Room(props: roomProps) {
    let roomComps = []
    const floorWidth = 2

    const snap = useSnapshot(state);
    let material = new THREE.MeshStandardMaterial()
    material.color = new THREE.Color(snap.color);

    for (let i = 0; i < props.rows; i++) {
        for (let j = 0; j < props.cols; j++) {
            let position = [0+i*floorWidth,0,0+j*floorWidth] as Vector3
            let rotation = [0,0,0] as Euler
            let cellType = CellType.floor
            let edgeType = EdgeType.rounded

            if( checkCorner(i, j, props.rows, props.cols)){ 
                // CORNER
                cellType = CellType.corner
                rotation = cornerRotation(i, j, props.rows, props.cols)
            } else if (checkEdge(i, j, props.rows, props.cols)) {
                // EDGE
                cellType = CellType.wall
                rotation = edgeRotation(i, j, props.rows, props.cols)
            } //INTERIOR
            roomComps.push(<RoomCell    materialSuelo={material} materialPared={material}
                                        type={cellType} edgeType={edgeType} 
                                        groupProps={{   position: position, rotation: rotation, 
                                                        onClick: ((e) => {state.showPicker = !snap.showPicker}) }} />)   
        }
    }

    return (
        <group>
            {...roomComps}
        </group>
    )
}

export function ColorPicker() {
    const snap = useSnapshot(state)
    return(
        <div style={{display: snap.showPicker? "block":"none"}}>
            <HexColorPicker className='picker' color = {snap.color} onChange={(color) => (state.color = color)}/>
        </div>
    )
}
