import video from '@/assets/video.mp4';
import './VideoPlayer.styles.css';
import {VideoPlayerProps} from './VideoPlayer.types';
import {useEffect, useRef} from 'react';

const VideoPlayer = ({isPlay}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlay]);
  return (
    <video ref={videoRef} muted loop className="video" src={video}></video>
  );
};

export {VideoPlayer};
