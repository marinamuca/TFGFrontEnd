import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../components/DeleteDialog/DeleteDialog";
import { PROFILE_PATH } from "../../../constants";
import {
  useChangeProfileMutation,
  useGetUserProfileQuery,
} from "../../../domain/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/appHooks";
import { selectUser } from "../../../redux/authSlice";
import {
  openModal,
  closeModal,
  setTitle,
  setContent,
} from "../../../redux/modalSlice";
import ConfirmChangeDialog from "../components/ConfirmDialog/ConfirmChangeDialog";
import ExhibitionForm from "../components/ExhibitionForm";

const useProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const modalContentNewExibition = <ExhibitionForm />;
  const [changeProfile, response] = useChangeProfileMutation();
  const navigate = useNavigate();

  const handleCreateExhibitionClick = () => {
    dispatch(openModal());
    dispatch(setTitle("Crear Exposición"));
    dispatch(setContent(modalContentNewExibition));
  };

  const {
    data: userProfile,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserProfileQuery(user?.profile);

  const handleChangeProfileType = useCallback(() => {
    dispatch(openModal());
    dispatch(setTitle("¿Seguro que quiere cambiar el perfil?"));
    dispatch(
      setContent(
        <ConfirmChangeDialog
          handleCancelClick={() => {
            dispatch(closeModal());
          }}
          handleConfirmClick={() => {
            changeProfile({}).then(() => {
              location.reload();
            });
          }}
          isArtist={userProfile.is_artist}
        />
      )
    );
  }, [userProfile, isSuccess]);

  return {
    user,
    isLoading,
    isFetching,
    userProfile,
    handleCreateExhibitionClick,
    handleChangeProfileType,
  };
};

export default useProfile;
