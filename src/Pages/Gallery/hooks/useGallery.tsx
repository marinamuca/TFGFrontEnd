import React from "react";
import { useGetUserDetailQuery } from "../../../domain/api/apiSlice";
import { useAppDispatch } from '../../../hooks/appHooks';
import { openModal, setContent, setTitle } from '../../../redux/modalSlice';
import ExhibitionForm from '../components/ExhibitionForm';

const useGallery = () => {

  const {data: user} = useGetUserDetailQuery(null);
  const dispatch = useAppDispatch();
  const modalContent = <ExhibitionForm />;

  const handleCreateExhibitionClick = () => {
    dispatch(openModal());
    dispatch(setTitle("Crear Exposición"));
    dispatch(setContent(modalContent));
  };

  return { handleCreateExhibitionClick };
};

export default useGallery;