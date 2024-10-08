import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const SubtitlesSentence = ({
  transcription,
  fontFamily,
  fontSize,
  color,
  position,
  textAlign,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const currentSentence = transcription.find(
    (sentence) => frame >= sentence.start * fps && frame <= sentence.end * fps
  );

  if (!currentSentence) {
    return null;
  }

  const opacity = interpolate(
    frame,
    [currentSentence.start * fps, currentSentence.end * fps],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const subtitlePosition = () => {
    switch (position) {
      case 'top':
        return { top: height * 0.2 }; // 20% from top
      case 'center':
        return { top: '50%', transform: 'translateY(-50%)' }; // Vertically center
      case 'bottom':
      default:
        return { bottom: height * 0.2 }; // 20% from bottom
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
      {currentSentence.sentence}
    </div>
  );
};
