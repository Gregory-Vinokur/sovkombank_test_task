import video from '@/assets/video.mp4';
import './VideoPlayer.styles.css';
import {VideoPlayerProps} from './VideoPlayer.types';
import {useEffect, useRef, useState} from 'react';

const VideoPlayer = ({isPlay}: VideoPlayerProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setIsVideoError(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlay]);
  return (
    <>
      {isVideoError && (
        <span className="video__text">Ошибка загрузки видео</span>
      )}
      {!isVideoLoaded && !isVideoError && (
        <span className="video__text">Загрузка...</span>
      )}
      <video
        ref={videoRef}
        muted
        loop
        className="video"
        src={video}
        onLoadedData={handleVideoLoaded}
        onError={handleVideoError}
      ></video>
    </>
  );
};

export {VideoPlayer};
