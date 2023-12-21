import video from '@/assets/video.mp4';
import './VideoPlayer.styles.css';

const VideoPlayer = () => {
  return <video loop className="video" src={video}></video>;
};

export { VideoPlayer };
