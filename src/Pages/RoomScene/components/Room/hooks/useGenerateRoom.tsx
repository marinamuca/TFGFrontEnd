import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Euler, Vector3 } from "@react-three/fiber";
import React, { useCallback } from "react";
import * as THREE from "three";
import DeleteDialog from "../../../../../components/DeleteDialog/DeleteDialog";
import { NO_POSITION, TILE_SIZE } from "../../../../../constants";
import { Illustration } from "../../../../../domain/types/types";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/appHooks";
import { selectUserID } from "../../../../../redux/authSlice";
import { showPicker } from "../../../../../redux/colorPickerSlice";
import {
  openModal,
  closeModal,
  setContent,
  setTitle,
} from "../../../../../redux/modalSlice";
import { RoomCell, CellType, EdgeType } from "../../RoomCell";

const useGenerateRoom = (
  rows: number,
  cols: number,
  illustrations: any,
  handleFrameChange: any,
  handleDeleteFrame: any,
  color: string,
  artist: string
) => {
  let placed_illustrations = illustrations.filter(
    (illustration: any) => illustration.position > -1
  );
  const dispatch = useAppDispatch();
  const userID = useAppSelector(selectUserID);

  const checkCorner = useCallback(
    (i: number, j: number) => {
      return (
        (i == 0 && j == 0) ||
        (i == 0 && j == cols - 1) ||
        (i == rows - 1 && j == 0) ||
        (i == rows - 1 && j == cols - 1)
      );
    },
    [rows, cols]
  );
  const cornerRotation = useCallback(
    (i: number, j: number) => {
      let rotation = [0, 0, 0] as Euler;
      if (i == 0 && j == cols - 1) rotation = [0, Math.PI / 2, 0];
      else if (i == rows - 1 && j == cols - 1) rotation = [0, Math.PI, 0];
      else if (i == rows - 1 && j == 0) rotation = [0, (3 * Math.PI) / 2, 0];

      return rotation;
    },
    [rows, cols]
  );

  const checkEdge = useCallback(
    (i: number, j: number) => {
      return i == 0 || j == 0 || i == rows - 1 || j == cols - 1;
    },
    [rows, cols]
  );

  const edgeRotation = useCallback(
    (i: number, j: number) => {
      let rotation = [0, 0, 0] as Euler;
      if (j == cols - 1) rotation = [0, Math.PI / 2, 0];
      else if (i == rows - 1) rotation = [0, Math.PI, 0];
      else if (j == 0) rotation = [0, (3 * Math.PI) / 2, 0];
      return rotation;
    },
    [rows, cols]
  );

  const placeFrame = useCallback(
    (position: number) => {
      let frame = { position: position } as Illustration;

      if (
        placed_illustrations[0] &&
        placed_illustrations[0].position == position
      ) {
        frame = placed_illustrations[0];
        placed_illustrations.shift();
      }

      return frame;
    },
    [placed_illustrations]
  );

  const frameClick = useCallback(
    (frame: Illustration) => {
      if (artist == userID) {
        dispatch(openModal());
        dispatch(setTitle("updateFrame"));
        dispatch(
          setContent(
            <Container>
              <List>
                {illustrations.map((illustration: any) => {
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
              {frame.image ? (
                <DeleteDialog
                  handleDeleteClick={() => {
                    handleDeleteFrame(frame);
                  }}
                  handleCancelClick={() => {
                    dispatch(closeModal());
                  }}
                />
              ) : (
                ""
              )}
            </Container>
          )
        );
      }
    },
    [illustrations]
  );

  const generateRoom = useCallback(() => {
    const floorWidth = TILE_SIZE;
    let frame_pos = NO_POSITION;
    let roomCells = [];
    let material = new THREE.MeshStandardMaterial();
    material.color = new THREE.Color(color);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let position = [0 + i * floorWidth, 0, 0 + j * floorWidth] as Vector3;
        let rotation = [0, 0, 0] as Euler;
        let cellType = CellType.floor;
        let edgeType = EdgeType.rounded;
        let frames = [] as Illustration[];

        if (checkCorner(i, j)) {
          // CORNER
          cellType = CellType.corner;
          rotation = cornerRotation(i, j);

          frame_pos += 2;
          frames.push(placeFrame(frame_pos - 1));
          frames.push(placeFrame(frame_pos));
        } else if (checkEdge(i, j)) {
          // EDGE
          cellType = CellType.wall;
          rotation = edgeRotation(i, j);

          frame_pos++;
          frames.push(placeFrame(frame_pos));
        } //INTERIOR
        roomCells.push(
          <RoomCell
            materialSuelo={material}
            materialPared={material}
            type={cellType}
            edgeType={edgeType}
            groupProps={{
              position: position,
              rotation: rotation,
              onClick: (e) => {
                dispatch(showPicker());
              },
            }}
            handleFrameClick={frameClick}
            frames={frames}
          />
        );
      }
    }
    return roomCells;
  }, [rows, cols, illustrations, color]);

  return { generateRoom };
};
export default useGenerateRoom;
