import { loadFont } from "@remotion/google-fonts/Inter";
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import React, { useEffect, useState } from 'react';
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  useVideoConfig,
} from 'remotion';
import { Slide } from './components/Slide';
import { SubtitlesWord } from './components/SubtitlesWord';

export const WordBasedComposition = ({ slides, audioSrc = "", transcription, videoSettings }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const [handle] = useState(() => delayRender());


  useEffect(() => {
    const { waitUntilDone } = loadFont();
    
    waitUntilDone().then(() => {
      continueRender(handle);
    });

    
    // TODO
    console.log(audioSrc)
  }, [handle]);

  const position = videoSettings.word_composition.subtitle_position
  const textAlign = videoSettings.word_composition.subtitle_textAlign
  const slideDuration = Math.floor(durationInFrames / slides.length);

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {Array(Math.ceil(durationInFrames / slideDuration))
          .fill(0)
          .map((_, index) => (
            <React.Fragment key={index}>
              <TransitionSeries.Sequence durationInFrames={slideDuration}>
                <Slide src={slides[index % slides.length]} />
              </TransitionSeries.Sequence>
              
              {index < Math.ceil(durationInFrames / slideDuration) - 1 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({
                    durationInFrames: Math.floor(fps / 2),
                  })}
                />
              )}
            </React.Fragment>
          ))}
      </TransitionSeries>

      {/* <AudioComponent src={audioSrc} /> */}

      <SubtitlesWord
        transcription={transcription.transcription}
        fontFamily={videoSettings.word_composition.subtitle_font}
        fontSize={videoSettings.word_composition.subtitle_font_size}
        color={videoSettings.word_composition.subtitle_color}
        position={position}
        textAlign={textAlign}
      />
    </AbsoluteFill>
  );
};
