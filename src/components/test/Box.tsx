/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 -t ../blenderModels/box_comp.glb
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {proxy, useSnapshot} from "valtio"
import { useState } from 'react'
import {HexColorPicker} from "react-colorful"
import { MeshStandardMaterial } from 'three'

const state = proxy({
  current: "",
  color: "#ff00ff"
})

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export function Box(props: JSX.IntrinsicElements['group']) {
  const [hovered, setHovered] = useState(false);
  const { nodes, materials } = useGLTF('/box_comp.glb') as GLTFResult
  const snap = useSnapshot(state);
  return (
    <group {...props} dispose={null}
      onPointerOver = {(e) => {e.stopPropagation(); setHovered(true)}}
      onPointerOut = {(e) => {e.intersections.length===0 && setHovered(false)}}
      onPointerDown = {(e) => {e.stopPropagation(); state.current = ((e.object as THREE.Mesh).material as MeshStandardMaterial).name}}
      onPointerMissed = {(e) => {state.current = ""}}
    >
      <mesh material-color={snap.color} geometry={nodes.Cube.geometry} material={materials.Material} />
    </group>
  )
}

export function Picker() {
  const snap = useSnapshot(state);
  return(
    <div style={{display: snap.current==""? "none":"block"}}>
      <HexColorPicker className='picker' color = {snap.color} onChange={(color) => (state.color = color)}/>
    </div>
  )
}

useGLTF.preload('/box_comp.glb')