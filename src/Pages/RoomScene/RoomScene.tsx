import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Room from "./components/Room/Room";
import { APP_BAR_HEIGHT } from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useGetExhibitionByIDQuery } from "../../domain/api/apiSlice";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import { useAppSelector } from "../../hooks/appHooks";
import { selectUserID } from "../../redux/authSlice";

type params = {
  id: string;
};

const RoomScene = () => {
  const { id } = useParams<params>();
  const {
    data: exhibition,
    isLoading,
    isFetching,
  } = useGetExhibitionByIDQuery(id);
  const userID = useAppSelector(selectUserID);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  let illustrations = exhibition.illustrations;

  return (
    <>
      <Canvas style={{ height: `calc(100vh - ${APP_BAR_HEIGHT}px)` }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Room
            rows={exhibition.room_width}
            cols={exhibition.room_length}
            illustrations={illustrations}
            artist={exhibition.artist}
          ></Room>
          <Environment preset="forest" />
        </Suspense>
        <OrbitControls />
        <spotLight intensity={0.3} position={[5, 20, 20]} />
      </Canvas>
      {userID == exhibition.artist ? <ColorPicker /> : ""}
    </>
  );
};

export default React.memo(RoomScene);
