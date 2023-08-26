
import React, { useCallback, useEffect, useState } from "react";
import { useDeleteExhibitionMutation, useGetUserQuery, useLazyGetUserQuery } from "../../../../../domain/api/apiSlice";
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
import { EXHIBITION_PATH, PROFILE_PATH } from "../../../../../constants";

const useExhibitionCard = (id: string, artist: string) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(selectUserID);
  const [deleteExhibition, response] = useDeleteExhibitionMutation();
  const {data: user , isLoading, isFetching} = useGetUserQuery(artist);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

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

  useEffect(() => {
    if(!isLoading && !isFetching)
      setUsername(user.username)
  }, [isLoading, isFetching])

  const handleDeleteClick = useCallback(() => {
    dispatch(openModal());
    dispatch(setTitle("confirmDelete"));
    dispatch(setContent(modalContent))
  }, [id]);

  const handleExhibitionClick = useCallback(() => {
    navigate(`${EXHIBITION_PATH}/${id}`)
  }, [id])

  const hanldeProfileClick = useCallback(() => {
    navigate(`${PROFILE_PATH}/${artist}`)
  }, [artist])

  return { handleDeleteClick, userID, handleExhibitionClick, hanldeProfileClick, username};
};

export default useExhibitionCard;
