
import React, { useCallback, useEffect } from "react";
import { useDeleteExhibitionMutation } from "../../../../../domain/api/apiSlice";
import DeleteDialog from "../../../../DeleteDialog/DeleteDialog";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/appHooks";
import {
  openModal,
  setContent,
  setTitle,
  closeModal,
} from "../../../../../redux/modalSlice";
import { selectUser, selectUserID } from "../../../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { EXHIBITION_PATH } from "../../../../../constants";

const useExhibitionCard = (id: string) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(selectUserID);
  const [deleteExhibition, response] = useDeleteExhibitionMutation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (response.isError) {
      console.log(response.error);
    } else if (response.isSuccess) {
      location.reload();
    }
  }, [response])

  const handleDeleteClick = useCallback(() => {
    dispatch(openModal());
    dispatch(setTitle("¿Seguro que quiere eliminar?"));
    dispatch(setContent(modalContent))
  }, [id]);

  const handleExhibitionClick = useCallback(() => {
    navigate(`${EXHIBITION_PATH}/${id}`)
  }, [])

  return { handleDeleteClick, userID, handleExhibitionClick};
};

export default useExhibitionCard;
