import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useDeleteLikeMutation,
  useGetExhibitionByIDQuery,
  useLazyCheckLikeQuery,
  useSendLikeMutation,
} from "../../../domain/api/apiSlice";
import {
  useAppDispatch,
  useAppSelector,
  useDimensions,
} from "../../../hooks/appHooks";
import { selectUserID } from "../../../redux/authSlice";
import { openModal, setContent, setTitle } from "../../../redux/modalSlice";
import ExhibitionForm from "../../Profile/components/ExhibitionForm";
import IllustrationForm from "../components/IllustrationForm/IllustrationForm";

type params = {
  id: string;
};

const initLike = {
  has_like: false,
  id: "-1",
};

const useExhibitionCard = () => {
  const { id } = useParams<params>();
  const [like, setLike] = useState(initLike);
  const dispatch = useAppDispatch();
  const userID = useAppSelector(selectUserID);
  const [isLoading, setIsLoading] = useState(true);
  const { data: exhibition, isSuccess: isSuccessExhibition } =
    useGetExhibitionByIDQuery(id);
  const [checkLike, { data: likeResponse, isSuccess: isSuccessLike }] =
    useLazyCheckLikeQuery();

  const [sendLike, responseSendLike] = useSendLikeMutation();
  const [deleteLike, responseDeleteLike] = useDeleteLikeMutation();

  const [maxIllustrations, setMaxIllustrations] = useState<number>(0);
  useEffect(() => {
    if (isSuccessExhibition) {
      setMaxIllustrations(
        useDimensions(exhibition.room_width, exhibition.room_length).max
      );
      checkLike(exhibition.id);
    }
  }, [isSuccessExhibition]);

  useEffect(() => {
    if (isSuccessLike) {
      setLike({
        has_like: likeResponse.has_like,
        id: likeResponse.like ?? "-1",
      });
      setIsLoading(false);
    }
  }, [likeResponse]);

  useEffect(() => {
    if ("data" in responseSendLike) {
      setLike({
        has_like: true,
        id: responseSendLike.data.id as string,
      });
    }
  }, [responseSendLike]);

  const handleCreateIlustrationClick = () => {
    dispatch(openModal());
    dispatch(setTitle("createIllustration"));
    dispatch(
      setContent(
        <IllustrationForm id_exhibition={exhibition.id}></IllustrationForm>
      )
    );
  };

  const handleEditClick = () => {
    dispatch(openModal());
    dispatch(setTitle("updateExhibition"));
    dispatch(setContent(<ExhibitionForm exhibition={exhibition} />));
  };

  const handleLikeClick = useCallback(() => {
    if (like.has_like) {
      deleteLike(like.id);
      setLike(initLike);
    } else {
      sendLike({
        user_profile: userID,
        exhibition: exhibition.id,
      });
    }
  }, [like, exhibition]);

  return {
    handleCreateIlustrationClick,
    handleEditClick,
    exhibition,
    isLoading,
    maxIllustrations,
    userID,
    handleLikeClick,
    like,
  };
};
export default useExhibitionCard;
