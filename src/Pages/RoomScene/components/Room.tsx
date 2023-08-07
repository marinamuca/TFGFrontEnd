
import * as THREE from 'three'
import React, { useState } from 'react'
import { Euler, Vector3 } from '@react-three/fiber';
import { RoomCell, CellType, EdgeType } from './RoomCell';
import {HexColorPicker} from "react-colorful";
import {proxy, useSnapshot} from "valtio"
import { Illustration } from '../../../domain/types/types';
import { useAppDispatch } from '../../../hooks/appHooks';
import { openModal, setContent, setTitle } from '../../../redux/modalSlice';
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { useUpdateIllustrationMutation } from '../../../domain/api/apiSlice';

interface roomProps{
    rows: number;
    cols: number;
    illustrations: any;
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

function placeFrame( position: number, illustrations: any ){
    let frame = {} as Illustration;

    if(illustrations[0] && illustrations[0].position == position){
        frame = illustrations[0]
        illustrations.shift();
    }
    
    return frame
}

const state = proxy({
    showPicker: false,
    color: "#ffffff"
  })

export function Room(props: roomProps) {
    let roomCells = []
    const floorWidth = 2 // TODO: TURN INTO GLOBAL CONSTANT

    let placed_illustrations = props.illustrations.filter( (illustration: any) => illustration.position > -1 )

    const snap = useSnapshot(state);
    let material = new THREE.MeshStandardMaterial()
    material.color = new THREE.Color(snap.color);

    let frame_pos = -1; 

    const dispatch = useAppDispatch();
    const [updateIllustration, response] = useUpdateIllustrationMutation();

    const handleFrameChange = ( illustration: Illustration, frame: Illustration ) => {
      let auxFrame = (({ image, ...o }) => o)(frame);
      auxFrame.position = -1;
      updateIllustration({ id: auxFrame.id, body: auxFrame });

      let auxIllustration = (({ image, ...o }) => o)(illustration);
      auxIllustration.position = frame.position;
      updateIllustration({ id: illustration.id, body: auxIllustration });
    };

    const handleFrameClick = (frame: Illustration) => {
      dispatch(openModal());
      dispatch(setTitle("Añadir ilustracion"));
      dispatch(
        setContent(
          <Container>
            <List>
              {props.illustrations.map((illustration: any) => {
                return (
                  <ListItemButton
                    key={illustration.id}
                    onClick={(e) => {
                      handleFrameChange(illustration, frame);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={illustration.image} variant="square" />
                    </ListItemAvatar>
                    <ListItemText primary={illustration.title} />
                  </ListItemButton>
                );
              })}
            </List>
          </Container>
        )
      );
    };

    for (let i = 0; i < props.rows; i++) {
        for (let j = 0; j < props.cols; j++) {
            let position = [0+i*floorWidth,0,0+j*floorWidth] as Vector3
            let rotation = [0,0,0] as Euler
            let cellType = CellType.floor
            let edgeType = EdgeType.rounded
            let frames = [] as Illustration[];

            if( checkCorner(i, j, props.rows, props.cols)){ 
                // CORNER
                cellType = CellType.corner
                rotation = cornerRotation(i, j, props.rows, props.cols)

                frame_pos += 2;    
                frames.push(placeFrame(frame_pos - 1 , placed_illustrations))
                frames.push(placeFrame(frame_pos, placed_illustrations))
            } else if (checkEdge(i, j, props.rows, props.cols)) {
                // EDGE
                cellType = CellType.wall
                rotation = edgeRotation(i, j, props.rows, props.cols)

                frame_pos++;
                frames.push(placeFrame(frame_pos, placed_illustrations))
            } //INTERIOR
            roomCells.push(<RoomCell    materialSuelo={material} materialPared={material}
                                        type={cellType} edgeType={edgeType} 
                                        groupProps={{   position: position, rotation: rotation, 
                                                        onClick: ((e) => {state.showPicker = !snap.showPicker}) }}
                                        handleFrameClick={handleFrameClick}
                                        frames={frames}/>)   
        }
    }

    return (
        <group>
            {...roomCells}
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
