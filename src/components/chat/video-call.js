"use client";

import { useEffect, useRef, useState } from "react";
import AgoraRTC, {
  AgoraRTCProvider,
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
import Loading from "@/app/(app)/loading";
import Image from "next/image";
import {  getUserProfile} from "@/lib/services/api-service";
import { useAppSelector } from "@/lib/hooks";
import { FaUser } from "react-icons/fa";
import { sendNotification, transactVideoCallDiamonds } from "@/lib/services/firebase-service";
import { useRouter } from "next/navigation";

async function Call(props) {
  if (!window) {
    return;
  }
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName} AppID={props.appId} calledUser={props.calledUser} />
    </AgoraRTCProvider>
  );
}

function Videos(props) {
  const router = useRouter();
  const { AppID, channelName, calledUser } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const [availableCameras, setAvailableCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [host,setHost] = useState(null);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isCalling, setIsCalling] = useState(true); 
  const [isNotificationSent, setIsNotificationSent] = useState(false);
  const intervalRef = useRef(null);
  const inactivityTimeout = useRef(null);
  const [firstPayment, setFirstPayment] = useState(false);
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

    // Kullanıcı katılma durumu
    if (remoteUsers.length > 0) {
      setIsCalling(false);
    } else {
      setIsCalling(true); // Katılmadıysa aranıyor ekranı göster
    }

    return () => {
      window.removeEventListener("touchstart", resetInactivityTimerOnClick);
      window.removeEventListener("click", resetInactivityTimerOnClick);
     
    };
  }, [remoteUsers]);
  useEffect(() => {
    if (apiUser && host && apiUser.id != calledUser && !isCalling && !firstPayment) {
      transactVideoCallDiamonds(apiUser,host);
      setFirstPayment(true);
        intervalRef.current = setInterval(async () => {
          transactVideoCallDiamonds(apiUser,host);
        }, 60000); 
    }else{
      if (intervalRef.current) {
        setFirstPayment(false);
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
    }
  }, [isCalling,host]);
  useEffect(() => {
    if (apiUser && calledUser && apiUser.id != calledUser) {
      getUserProfile(calledUser).then((response) => {
        setHost(response.data.data);
      });
      
    }
  }, [apiUser]);
  useEffect(() => {
    
   if (host) {
    sendNotification(host.deviceToken, 'Gelen Arama', apiUser.fullName,{url:window.location.origin+'/chat/channel/'+channelName+'?calledUser='+host.id,type:'videoCall',callerName:apiUser.fullName,callerAvatar:apiUser.profileimages || apiUser.images[0]?.image});
    setIsNotificationSent(true);
    
   }
  }, [host]);

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
    return <Loading />;
  }

  const switchCamera = async () => {
    if (availableCameras.length > 1) {
      const nextCameraIndex = (currentCameraIndex + 1) % availableCameras.length;
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
  
  // Aranıyor ekranı
  if (isCalling) {
    return (
<div className="flex flex-col items-center justify-center w-full h-screen bg-black text-white relative">
  {/* Dalga Efektleri */}
  {host?.profileimages || host?.images?.length > 0 ? (
    <div className="relative flex items-center justify-center">
      {/* Dalga efektleri */}
      <div className="absolute w-32 h-32  rounded-full bg-secondary opacity-30 animate-wave transform left-0 top-0"></div>
      <div className="absolute w-32 h-32 rounded-full bg-secondary opacity-30 animate-wave transform left-0 top-0 animation-delay-1"></div>
      <div className="absolute w-32 h-32 rounded-full bg-secondary opacity-30 animate-wave transform left-0 top-0 animation-delay-2"></div>

      {/* Profil Resmi */}
      <Image
        src={
          host.profileimages
            ? fileBaseUrl + host.profileimages
            : fileBaseUrl + host.images[0]?.image
        }
        alt={`${host.fullName}'s profile`}
        width={128}
        height={128}
        className="w-32 h-32 rounded-full object-cover z-10"
      />
    </div>
  ) : (
    <FaUser className="w-32 h-32 rounded-full object-cover z-10" />
  )}

  {/* Aranıyor... Metni */}
  <p className="text-2xl mb-4 z-10 mt-5">Aranıyor...</p>

  {/* Çağrıyı Sonlandır Butonu */}
  <div className="flex justify-center items-center space-x-4 z-10">
    <MdCallEnd
      size={50}
      className="cursor-pointer"
      color="red"
      onClick={() => {
        router.push(`/chat/${host.id}`);
      }}
    />
  </div>
</div>

    );
  }

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
            <div className="flex justify-center items-center w-full h-full bg-black relative">
              <BsCameraVideoOff
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                size={80}
                color="white"
              />
            </div>
          ) : (
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
        {remoteUsers.map((remoteUser) => (
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
        ))}
      </div>

      {isControlsVisible && (
        <div className="fixed z-10 left-0 right-0 flex justify-center w-fit mx-auto p-4 rounded-2xl bg-gray-900 bottom-5">
          <button onClick={handleMute} className="text-base font-medium text-center text-white rounded-lg mx-2">
            {isMuted ? <BsMicMute size={50} /> : <BsMic size={50} />}
          </button>
          <button onClick={handleCameraToggle} className="text-base font-medium text-center text-white rounded-lg mx-2">
            {isCameraOff ? <BsCameraVideoOff size={50} /> : <BsCameraVideo size={50} />}
          </button>
          <button onClick={switchCamera} className="text-base font-medium text-center text-white rounded-lg mx-2">
            <MdCameraswitch size={50} />
          </button>
          <a href="/" className="text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 mx-2">
            <MdCallEnd size={50} />
          </a>
        </div>
      )}
    </div>
  );
}

export default Call;
