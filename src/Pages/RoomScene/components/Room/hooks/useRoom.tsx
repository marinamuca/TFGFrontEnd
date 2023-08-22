import React, { useCallback, useMemo } from "react";
import { useUpdateIllustrationMutation } from "../../../../../domain/api/apiSlice";
import { Illustration } from "../../../../../domain/types/types";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/appHooks";
import { openModal, setContent, setTitle } from "../../../../../redux/modalSlice";
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { NO_POSITION } from "../../../../../constants";

const useRoom = (illustrations: any, placed_illustrations: any) => {
  const dispatch = useAppDispatch();
  const [updateIllustration, response] = useUpdateIllustrationMutation();

  const handleFrameChange = useCallback(
    (illustration: Illustration, frame: Illustration) => {
      let auxIllustration = (({ image, ...o }) => o)(illustration); // get illlustration without image field
      auxIllustration.position = frame.position; // Change to new position

      // Update the new illustration
      updateIllustration({ id: illustration.id, body: auxIllustration }).then(
        (response) => {
          if (frame.image) {
            let auxFrame = (({ image, ...o }) => o)(frame);
            auxFrame.position = illustration.position;

            updateIllustration({ id: auxFrame.id, body: auxFrame }).then(
              (responseFrame) => {
                if (responseFrame.data) location.reload();
              }
            );
          } else {
            if (response.data) location.reload();
          }
        }
      );
    },
    []
  );

  const handleDeleteFrame = useCallback(
    (frame: Illustration) => {
      let auxFrame = (({ image, ...o }) => o)(frame);
      auxFrame.position = NO_POSITION;
      updateIllustration({ id: auxFrame.id, body: auxFrame }).then((response) => {
        if (response.data) location.reload();
      })
    },
    []
  );

  const { color } = useAppSelector((state) => state.colorPicker)

  return { handleFrameChange, handleDeleteFrame, color };
};
export default useRoom;
