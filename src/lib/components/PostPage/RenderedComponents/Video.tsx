import styled from "styled-components";

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 2em auto;

  border-radius: 8px;
  overflow: hidden;

  background-color: #000;

  box-shadow: 0 5px 15px
    rgba(0, 0, 0, 0.1);
`;

const VideoPlayer = styled.video`
  display: block;

  width: 100%;
  max-height: 600px;

  background-color: #000;
`;

interface VideoProps {
  url: string;
}

/**
 * @name Video
 * @desc Display a video added by the post creator.
 */
const Video = ({
  url,
}: VideoProps) => (
  <VideoWrapper>
    <VideoPlayer
      src={url}
      controls
      preload="metadata"
    >
      Your browser does not support
      video playback.
    </VideoPlayer>
  </VideoWrapper>
);

export default Video;