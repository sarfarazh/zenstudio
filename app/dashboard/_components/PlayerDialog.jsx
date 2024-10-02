import React, { useEffect, useState } from 'react';
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame]=useState(100);

  useEffect(() => {
    setOpenDialog(playVideo); 
    videoId && GetVideoData(); 
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    const result = await db.select().from(VideoData)
      .where(eq(VideoData.id, videoId));
    setVideoData(result[0]);  // Ensure the data is set correctly
  };

  return (
    <Dialog open={openDialog}>
  <DialogContent 
    className="bg-white flex flex-col items-center" 
    style={{
      maxWidth: '480px',        // Control dialog width
      width: '40%',            // Ensure dialog fits the screen
      maxHeight: '90vh',        // Limit dialog height to 90% of the viewport
      // padding: '10px',          // Add padding for spacing
      overflowY: 'auto',        // Allow scrolling if the content overflows
    }}
  >
    <DialogHeader>
      <DialogTitle className="text-3xl font-bold mt-5">
        Your Video is Ready
      </DialogTitle>
    </DialogHeader>
    <p>Playing video with ID: {videoId}</p>

    <div style={{ width: '100%', aspectRatio: '9/16', overflow: 'hidden' }}>
      <Player
        component={RemotionVideo}
        durationInFrames={Number(durationInFrame.toFixed(0))}
        compositionWidth={720}
        compositionHeight={1280}
        fps={30}
        controls={true}
        inputProps={{
          ...videoData,
          setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
        }}
        style={{ width: '100%', height: '100%' }} // Ensure the player scales correctly
      />
    </div>

    <div className="flex space-x-4 mt-5">
      <Button variant="ghost">Cancel</Button>
      <Button>Export</Button>
    </div>
  </DialogContent>
</Dialog>


  );
}

export default PlayerDialog;
