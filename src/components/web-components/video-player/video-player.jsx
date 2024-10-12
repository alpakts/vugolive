import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { IoMdClose } from "react-icons/io";

const VideoPlayer = (props) => {
  const { user, src, open, callback } = props;

  const videoRef = React.useRef(null);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true); 
  const [isPlaying, setIsPlaying] = useState(false); 
  let hideTimeout;

  const closeModal = () => {
    videoRef.current.pause();
    setProgress(0);
    setIsPlaying(false);
    document.body.classList.remove("overflow-hidden");
    callback(false);
  };

  const closeVideo = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    resetHideTimeout(); 
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    const newTime = (e.target.value / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(e.target.value);
    resetHideTimeout();
  };

  const resetHideTimeout = () => {
    clearTimeout(hideTimeout);
    setShowControls(true);

    hideTimeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  useEffect(() => {

    window.addEventListener("mousemove", resetHideTimeout);

    return () => {
      window.removeEventListener("mousemove", resetHideTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    }
  }, [open]);

  return (
    <div
      id="videoModal"
      className={`${open ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-500 fixed h-screen w-screen bg-black z-50 top-0 left-0`}
    >
      <div className="h-screen w-screen flex justify-center items-center relative z-10">
        
        <div className="video-container relative">
        <div onClick={closeModal} className="absolute right-4 top-5 z-[99999] bg-black ">
          <IoMdClose className="text-white" size={24} />
        </div>
          <video
            id="myVideo"
            className="custom-video w-full aspect-auto rounded-3xl max-h-[100vh]"
            ref={videoRef}
            alt={user?.name?.first}
            poster={user?.avatar}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={src} type="video/mp4" />
            Tarayıcınız bu videoyu desteklemiyor.
          </video>

          {showControls && (
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary  p-3 rounded-full"
              onClick={closeVideo}
            >
              {isPlaying ? (
                <Image src={"pause.svg"} width={30} height={30} />
              ) : (
                <Image src={"/play.svg"} width={30} height={30} />
              )}
            </button>
          )}

          <div
            className={`controls absolute w-full bottom-2 px-2 mb-5 bg-secondary bg-opacity-50 h-5 ${
              showControls ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          >
            <input
              type="range"
              id="progressBar"
              className="progress-bar w-full"
              value={progress}
              max="100"
              onChange={handleProgressChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
