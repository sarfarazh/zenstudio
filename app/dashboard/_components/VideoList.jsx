import React, { useState, useEffect } from 'react';
import { Thumbnail } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

function VideoList({ videoList }) {
  console.log("Rendering VideoList component with videoList:", videoList);

  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const handleOpenDialog = (id) => {
    console.log("Opening dialog for video ID:", id); // Should fire when thumbnail is clicked
    setVideoId(id);
    setOpenPlayerDialog(true);
  };

  useEffect(() => {
    console.log("Dialog state changed: ", openPlayerDialog);
  }, [openPlayerDialog]);

  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
      {videoList.map((video, index) => (
        <div key={index} className="mb-5">
          {/* Removing the debug text from the UI */}
          <div onClick={() => {
              console.log("Div clicked for video ID:", video?.id);
              handleOpenDialog(video?.id);
            }}
          >
            <Thumbnail
              className='rounded-lg cursor-pointer hover:scale-105 transition-all'
              component={RemotionVideo}
              compositionWidth={270}
              compositionHeight={480}
              frameToDisplay={30}
              durationInFrames={120}
              fps={30}
              inputProps={{
                ...video,
                setDurationInFrame: (v) => console.log("Duration set:", v)
              }}
            />
          </div>
        </div>
      ))}
      {openPlayerDialog && (
        <PlayerDialog
          playVideo={openPlayerDialog}
          videoId={videoId}
          setOpenPlayerDialog={setOpenPlayerDialog}
        />
      )}
    </div>
  );
}

export default VideoList;
