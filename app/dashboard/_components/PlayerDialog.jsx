import React, { useEffect, useState } from 'react';
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function PlayerDialog({ playVideo, videoId }) { // Destructure props

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(playVideo);  // Update openDialog state based on playVideo prop
  }, [playVideo]);

  return (
    <Dialog open={openDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">Your Video is Ready</DialogTitle>
        </DialogHeader>
        {/* Use block-level element (div) instead of p tag for the Player component */}
        <DialogDescription>
        </DialogDescription>
        <div>
            <Player
              component={RemotionVideo}
              durationInFrames={120}
              compositionWidth={720}
              compositionHeight={1280}
              fps={30}
            />
          </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
