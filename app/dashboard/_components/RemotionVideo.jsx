import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

function RemotionVideo({ videoScript, imageList, audioFileUrl, captions,setDurationInFrame }) {

    const {fps}=useVideoConfig();
    const frame=useCurrentFrame();
    const getDurationFrame=()=>{
      setDurationInFrame(captions[captions?.length-1]?.end/1000*fps)
      return captions[captions?.length-1]?.end/1000*fps
    }


    const getCurrentCaptions=()=>{
      const currentTime=frame/30*1000; //Convert frame number to miliseconds (30fps)
      const getCurrentCaption=captions.find((word)=>currentTime>=word.start && currentTime<=word.end);
      return getCurrentCaption?getCurrentCaption?.text:'';
    }


  return (
    
    <AbsoluteFill className="bg-black">
  {/* Video elements like audio, images, captions can be added here */}
  {imageList?.map((item, index) => (
    <Sequence 
      key={index} 
      from={(index * getDurationFrame()) / imageList?.length} 
      durationInFrames={getDurationFrame()}
    >
      <AbsoluteFill className="flex justify-center items-center">
        <Img
          src={item}
          className="w-full h-full object-cover"
        />
        
        <AbsoluteFill className="flex justify-center items-center absolute bottom-12 h-[150px] text-center w-full text-white">
          <h2 className="text-4xl">{getCurrentCaptions()}</h2>
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  ))}
  {audioFileUrl && <Audio src={audioFileUrl} />}
</AbsoluteFill>

  );
}

export default RemotionVideo;
