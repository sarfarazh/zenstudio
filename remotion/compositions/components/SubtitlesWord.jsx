import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const SubtitlesWord = ({
  transcription,
  fontFamily,
  fontSize,
  color,
  position,
  textAlign,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const currentWord = transcription.find(
    (word) => frame >= word.start * fps && frame <= word.end * fps
  );

  if (!currentWord) {
    return null;
  }

  const opacity = interpolate(frame, [currentWord.start * fps, currentWord.end * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitlePosition = () => {
    switch (position) {
      case 'top':
        return { top: height * 0.2 };  // 20% from top
      case 'center':
        return { top: '50%', transform: 'translateY(-50%)' };  // Vertically center
      case 'bottom':
      default:
        return { bottom: height * 0.2 };  // 20% from bottom
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        textAlign,
        fontFamily,
        fontSize: `${fontSize}px`,
        color,
        opacity,
        ...subtitlePosition(),
      }}
    >
      {currentWord.word}
    </div>
  );
};
