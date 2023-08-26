import React from "react";
import { useGetExhibitionsQuery } from "../../../domain/api/apiSlice";
import { useAppDispatch } from "../../../hooks/appHooks";
import { openModal, setContent, setTitle } from "../../../redux/modalSlice";
import ExhibitionForm from "../../Profile/components/ExhibitionForm";

const useHome = () => {
  const dispatch = useAppDispatch();
  const modalContent = <ExhibitionForm />;
  const {
    data: exhibitions,
    isLoading,
    isFetching,
  } = useGetExhibitionsQuery({});

  const handleCreateExhibitionClick = () => {
    dispatch(openModal());
    dispatch(setTitle("createExhibition"));
    dispatch(setContent(modalContent));
  };

  return { handleCreateExhibitionClick, isLoading, isFetching, exhibitions };
};

export default useHome;
