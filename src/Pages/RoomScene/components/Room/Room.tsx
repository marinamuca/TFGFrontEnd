
import * as THREE from 'three'
import { Euler, Vector3 } from '@react-three/fiber';
import { Illustration } from '../../../../domain/types/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks/appHooks';
import { closeModal, openModal, setContent, setTitle } from '../../../../redux/modalSlice';
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import useRoom from './hooks/useRoom';
import useGenerateRoom from './hooks/useGenerateRoom';
import DeleteDialog from '../../../../components/DeleteDialog/DeleteDialog';

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

export default Room;