/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.4 ../../public/models/FloorRounded.glb -t
*/

import * as THREE from 'three'
import React, {useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { FrameModel } from './FrameModel'
import { useAppDispatch } from '../hooks/appHooks'
import { openModal, setContent, setTitle } from '../features/modalSlice'
import { ThreeEvent } from '@react-three/fiber'
import { Frame } from '../features/types'

type GLTFResult = GLTF & {
  nodes: {
    Suelo: THREE.Mesh
    Pared: THREE.Mesh
  }
  materials: {
    MaterialSuelo: THREE.MeshStandardMaterial
    MaterialPared: THREE.MeshStandardMaterial
  }
}

export enum CellType{
  wall = 'Wall',
  floor = 'Floor',
  corner = 'Corner'
}

export enum EdgeType{
  rounded = 'Rounded',
  sharp = 'Sharp'
}

interface propsRoomCell{
  groupProps: JSX.IntrinsicElements['group'];
  frames: Frame[];
  handleFrameClick: Function;
  materialSuelo?: THREE.Material;
  materialPared?: THREE.Material;
  type: CellType;
  edgeType: EdgeType;
}

let gltfRoute = ""

export function RoomCell(props: propsRoomCell) {
  gltfRoute = '/models/' + props.type + props.edgeType + '.glb';
  const { nodes, materials } = useGLTF(gltfRoute) as GLTFResult

  let materialSuelo = materials.MaterialSuelo as THREE.Material
  if (props.materialSuelo){
    materialSuelo = props.materialSuelo
  }
  let materialPared = materials.MaterialPared as THREE.Material
  if (props.materialPared){
    materialPared = props.materialPared
  }

  

  const [texture, setTexture] = useState('/textures/2.jpg')
  return (
    <group {...props.groupProps} dispose={null} >
      <mesh  geometry={nodes.Suelo.geometry} material={materialSuelo} position={[0, 1.3, 0]} />
      {props.type != CellType.floor? 
        <>
          <mesh  geometry={nodes.Pared.geometry} material={materialPared} position={[0, 1.3, 0]}  />
          <FrameModel meshProps={ {position: [-0.999,1.3,0], rotation: [0,Math.PI/2,0], onClick: ( (e) => {props.handleFrameClick(props.frames[0].position); e.stopPropagation(); })} } imgUrl={props.frames[0].image}></FrameModel>
        </> : null }
        {props.type == CellType.corner? 
        <FrameModel meshProps={ {position: [0,1.3,-0.999], onClick: ( (e) => {props.handleFrameClick(props.frames[1].position); e.stopPropagation(); })  } } imgUrl={props.frames[1].image}></FrameModel>
        : null}
        
    </group>
  )
}

useGLTF.preload(gltfRoute)
