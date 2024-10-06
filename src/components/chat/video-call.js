"use client";

import { useEffect, useRef, useState } from "react";
import AgoraRTC, {
  AgoraRTCProvider,
  LocalAudioTrack,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsMic,
  BsMicMute,
} from "react-icons/bs";
import { MdCallEnd, MdCameraswitch } from "react-icons/md";
import Loading from "@/app/loading";

async function Call(props) {
  if (!window) {
    return;
  }
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName} AppID={props.appId} />
    </AgoraRTCProvider>
  );
}

function Videos(props) {

  const { AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const [availableCameras, setAvailableCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);

  const inactivityTimeout = useRef(null);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });
  useEffect(() => {
    AgoraRTC.getCameras().then((cameras) => {
      setAvailableCameras(cameras);
    });

    resetInactivityTimer();
    window.addEventListener("touchstart", resetInactivityTimerOnClick);
    window.addEventListener("click", resetInactivityTimerOnClick);

    return () => {
      window.removeEventListener("touchstart", resetInactivityTimerOnClick);
      window.removeEventListener("click", resetInactivityTimerOnClick);

      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
    };
  }, []);

  const resetInactivityTimer = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    setIsControlsVisible(true);
    inactivityTimeout.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 2000);
  };

  const resetInactivityTimerOnClick = () => {
    if (isControlsVisible) {
      setIsControlsVisible(false);
    }
    resetInactivityTimer();
  };

  audioTracks.map((track) => track.play());
  const deviceLoading = isLoadingMic || isLoadingCam;

  if (deviceLoading) {
    return (
      <Loading></Loading>
    );
  }
  const switchCamera = async () => {
    if (availableCameras.length > 1) {
      const nextCameraIndex =
        (currentCameraIndex + 1) % availableCameras.length;
      const newCameraDeviceId = availableCameras[nextCameraIndex].deviceId;
      localCameraTrack.setDevice(newCameraDeviceId);

      setCurrentCameraIndex(nextCameraIndex);
    }
  };
  const handleMute = () => {
    if (isMuted) {
      localMicrophoneTrack.setEnabled(true);
    } else {
      localMicrophoneTrack.setEnabled(false);
    }
    setIsMuted(!isMuted);
  };

  const handleCameraToggle = () => {
    if (isCameraOff) {
      localCameraTrack.setEnabled(true);
    } else {
      localCameraTrack.setEnabled(false);
    }
    setIsCameraOff(!isCameraOff);
  };

  const unit = "minmax(0, 1fr) ";
  return (
    <div className="flex flex-col justify-between w-full h-screen p-1">
      <div
        className={`grid gap-1 flex-1`}
        style={{
          gridTemplateColumns:
            remoteUsers.length > 9
              ? unit.repeat(4)
              : remoteUsers.length > 4
              ? unit.repeat(3)
              : remoteUsers.length > 1
              ? unit.repeat(2)
              : unit,
        }}
      >
        {/* Local Video Track */}
        <div className="relative w-full h-full">
          {isCameraOff ? (
            // Kamera kapalıysa ikon göster
            <div className="flex justify-center items-center w-full h-full bg-black relative">
              <BsCameraVideoOff
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                size={80}
                color="white"
              />
            </div>
          ) : (
            // Kamera açıksa video oynat
            <LocalVideoTrack
              track={localCameraTrack}
              play={true}
              className="w-full h-full relative"
            >
              {isMuted && (
                <div className="absolute flex justify-center items-center w-full top-0 h-full bg-transparent z-10">
                  <BsMicMute size={80} color="white" />
                </div>
              )}
            </LocalVideoTrack>
          )}
        </div>

        {/* Remote Users Video Tracks */}
        {remoteUsers.map((remoteUser) => {
          return (
            <div key={remoteUser.uid} className="relative w-full h-full">
              {remoteUser.hasVideo ? (
                <RemoteUser user={remoteUser} className="w-full h-full">
                  {!remoteUser.audioTrack && (
                    <div className="flex justify-center items-center w-full h-full bg-transparent">
                      <BsMicMute size={80} color="white" />
                    </div>
                  )}
                </RemoteUser>
              ) : (
                <div className="flex justify-center items-center w-full h-full bg-black relative">
                  <BsCameraVideoOff
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    size={80}
                    color="white"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isControlsVisible && (
        <div className="fixed z-10 left-0 right-0 flex justify-center w-fit mx-auto p-4 rounded-2xl bg-gray-900 bottom-5">
          <button
            onClick={handleMute}
            className={` text-base font-medium text-center text-white rounded-lg mx-2`}
          >
            {isMuted ? <BsMicMute size={50} /> : <BsMic size={50} />}
          </button>
          <button
            onClick={handleCameraToggle}
            className={` text-base font-medium text-center text-white rounded-lg mx-2`}
          >
            {isCameraOff ? (
              <BsCameraVideoOff size={50} />
            ) : (
              <BsCameraVideo size={50} />
            )}
          </button>
          <button
            onClick={switchCamera}
            className={` text-base font-medium text-center text-white rounded-lg mx-2`}
          >
            <MdCameraswitch size={50} />
          </button>

          <a
            className="text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 mx-2"
            href="/"
          >
            <MdCallEnd size={50} />
          </a>
        </div>
      )}
    </div>
  );
}

export default Call;
