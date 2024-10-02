import React, { useEffect } from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

function RemotionVideo({ videoScript, imageList, audioFileUrl, captions, setDurationInFrame }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const getDurationFrame = () => {
    if (captions?.length && captions[captions.length - 1]?.end) {
      return (captions[captions.length - 1].end / 1000) * fps;
    }
    return 1; // Return a small positive value to avoid division by 0
  };

  useEffect(() => {
    const duration = getDurationFrame();
    if (duration > 1) {
      setDurationInFrame(duration);
    }
  }, [captions, fps, setDurationInFrame]);

  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000;
    const currentCaption = captions?.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption.text : '';
  };

  const scale = (index, startTime, duration) => {
    return interpolate(
      frame,
      [startTime, startTime + duration / 2, startTime + duration],
      index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8], // Alternate zoom effect for even and odd indexes
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
  };

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => {
        const duration = getDurationFrame();
        const startTime = (index * duration) / imageList?.length;

        if (duration <= 1) return null; // Avoid invalid duration

        const imageScale = scale(index, startTime, duration);

        return (
          <Sequence
            key={index}
            from={Math.floor(startTime)} 
            durationInFrames={Math.floor(duration)}
          >
            <AbsoluteFill className="flex justify-center items-center">
              <Img
                src={item}
                className="w-full h-full object-cover"
                style={{ transform: `scale(${imageScale})` }} // Apply alternating zoom in/zoom out
              />

              <AbsoluteFill className="flex justify-center items-center absolute bottom-12 h-[150px] text-center w-full text-white">
                <h2 className="text-6xl">{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  );
}

export default RemotionVideo;
