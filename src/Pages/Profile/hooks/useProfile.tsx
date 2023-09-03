import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useChangeProfileMutation,
  useLazyGetLikedExhibitionsQuery,
  useLazyGetUserQuery,
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

type params = {
  id: string;
};

const useProfile = () => {
  const { id } = useParams<params>();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const modalContentNewExibition = <ExhibitionForm />;
  const [changeProfile, changeResponse] = useChangeProfileMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(currentUser);
  const [selfProfile, setSelfProfile] = useState(false);
  const [getLiked, { data: liked, isSuccess: isSuccessLiked }] = useLazyGetLikedExhibitionsQuery();

  const [getUser, { data, isFetching, isSuccess: isSuccessUser }] =
    useLazyGetUserQuery();

  useEffect(() => {
    if (id) {
      getUser(id);
      setSelfProfile(false);
    } else {
      setSelfProfile(true);
      getUser(currentUser?.id);
    }
  }, [id]);

  useEffect(() => {
    if (isSuccessUser) {
      setUser(data);

      if (!user?.profile_data.is_artist) {
        getLiked({});
      } else {
        setIsLoading(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if(isSuccessLiked){
      setIsLoading(false)
    }
  }, [liked])

  const handleCreateExhibitionClick = () => {
    console.log(user);
    dispatch(openModal());
    dispatch(setTitle("createExhibition"));
    dispatch(setContent(modalContentNewExibition));
  };

  const handleChangeProfileType = useCallback(() => {
    console.log(user);
    dispatch(openModal());
    dispatch(setTitle("changeProfile"));
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
          isArtist={user?.profile_data.is_artist!}
        />
      )
    );
  }, [user]);

  return {
    user,
    selfProfile,
    isLoading,
    isFetching,
    handleCreateExhibitionClick,
    handleChangeProfileType,
    liked,
  };
};

export default useProfile;
