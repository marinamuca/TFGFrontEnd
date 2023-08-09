
import React, { useCallback } from "react";
import { useDeleteIllustrationMutation } from "../../../../../domain/api/apiSlice";
import DeleteDialog from "../../../../DeleteDialog/DeleteDialog";
import { useAppDispatch } from "../../../../../hooks/appHooks";
import Box from '@mui/material/Box';
import {
  openModal,
  setContent,
  setTitle,
  closeModal,
} from "../../../../../redux/modalSlice";

const useIllustrationCard = (id: string, image: string) => {
  const dispatch = useAppDispatch();
  const [deleteIllustration, response] = useDeleteIllustrationMutation();
  const modalContent = (
    <DeleteDialog
      handleCancelClick={() => {
        dispatch(closeModal());
      }}
      handleDeleteClick={() => {
        deleteIllustration(id);
      }}
    />
  );

  const handleDeleteClick = useCallback(() => {
    dispatch(openModal());
    dispatch(setTitle("¿Seguro que quiere eliminar?"));
    dispatch(setContent(modalContent))
  }, [id]);

  const handleIllustrationClick = useCallback(() => {
    dispatch(openModal());
    dispatch(setContent(<img src={image} className="imgPreview"/>))
  }, [image]); 
  return { handleDeleteClick, responseDelete: response, handleClick: handleIllustrationClick};
};

export default useIllustrationCard;
