import React from "react";
import { useAppDispatch } from '../../../hooks/appHooks';
import { openModal, setContent, setTitle } from '../../../redux/modalSlice';
import NewExhibitionForm from '../components/NewExhibitionForm';

const useGallery = () => {
  const dispatch = useAppDispatch();
  const modalContent = <NewExhibitionForm />;

  const handleCreateExhibitionClick = () => {
    dispatch(openModal());
    dispatch(setTitle("Crear Exposición"));
    dispatch(setContent(modalContent));
  };

  return { handleCreateExhibitionClick };
};

export default useGallery;