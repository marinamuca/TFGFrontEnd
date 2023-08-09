
import React, { useCallback } from "react";
import { useDeleteExhibitionMutation } from "../../../../../domain/api/apiSlice";
import DeleteDialog from "../../../../DeleteDialog/DeleteDialog";
import { useAppDispatch } from "../../../../../hooks/appHooks";
import {
  openModal,
  setContent,
  setTitle,
  closeModal,
} from "../../../../../redux/modalSlice";

const useExhibitionCard = (id: string) => {
  const dispatch = useAppDispatch();
  const [deleteExhibition, response] = useDeleteExhibitionMutation();
  const modalContent = (
    <DeleteDialog
      handleCancelClick={() => {
        dispatch(closeModal());
      }}
      handleDeleteClick={() => {
        deleteExhibition(id);
      }}
    />
  );

  const handleDeleteClick = useCallback(() => {
    dispatch(openModal());
    dispatch(setTitle("¿Seguro que quiere eliminar?"));
    dispatch(setContent(modalContent))
    console.log(id);
  }, [id]);
  return { handleDeleteClick, responseDelete: response};
};

export default useExhibitionCard;
