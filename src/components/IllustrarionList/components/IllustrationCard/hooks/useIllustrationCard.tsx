
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
import IllustrationForm from "../../../../../pages/Exhibition/components/IllustrationForm";

const useIllustrationCard = (illustration: any, image: string) => {
  const dispatch = useAppDispatch();
  const [deleteIllustration, response] = useDeleteIllustrationMutation();
  const modalContent = (
    <DeleteDialog
      handleCancelClick={() => {
        dispatch(closeModal());
      }}
      handleDeleteClick={() => {
        deleteIllustration(illustration.id);
      }}
    />
  );

  const handleDeleteClick = useCallback(() => {
    dispatch(openModal());
    dispatch(setTitle("¿Seguro que quiere eliminar?"));
    dispatch(setContent(modalContent))
  }, [illustration]);
  
  const handleIllustrationClick = useCallback(() => {
    dispatch(openModal());
    dispatch(setContent(<img src={image} className="imgPreview"/>))
  }, [image]); 
  
  const handleEditClick = useCallback(() => {
    dispatch(openModal());
    dispatch(setTitle("Editar Ilustracion"));
    console.log(illustration)
    dispatch(setContent(<IllustrationForm id_exhibition={illustration.exhibition} illustration={illustration}></IllustrationForm>))
  }, [illustration]);

  return { handleDeleteClick, responseDelete: response, handleClick: handleIllustrationClick, handleEditClick};
};

export default useIllustrationCard;
