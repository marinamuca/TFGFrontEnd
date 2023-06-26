/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.4 ../../public/models/FloorRounded.glb -t
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

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

  return (
    <group {...props.groupProps} dispose={null} >
      <mesh  geometry={nodes.Suelo.geometry} material={materialSuelo} position={[0, 1.3, 0]}  />
      {props.type != CellType.floor? 
        <mesh  geometry={nodes.Pared.geometry} material={materialPared} position={[0, 1.3, 0]}  /> : 
        null }
    </group>
  )
}

useGLTF.preload(gltfRoute)
