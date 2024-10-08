import React, { useEffect, useState } from 'react';
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function PlayerDialog({ playVideo, videoId, setOpenPlayerDialog }) {
  const [isExporting, setIsExporting] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [openDialog, setOpenDialog] = useState(playVideo); // Initialize with playVideo prop
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const [dataFetched, setDataFetched] = useState(false); // Track if data was fetched
  const [exportResponse, setExportResponse] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    console.log("playVideo:", playVideo);
    if (playVideo && videoId && !dataFetched) {
      console.log("Opening dialog, fetching video data for ID:", videoId);
      setOpenDialog(true); // Open the dialog
      GetVideoData(); // Fetch video data
    }
  }, [playVideo, videoId, dataFetched]);

  const GetVideoData = async () => {
    console.log("Fetching video data from DB for video ID:", videoId);
    try {
      const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
      console.log("Video data fetched:", result);
      setVideoData(result[0]);  // Ensure the data is set correctly
      setDataFetched(true);  // Prevent refetching of the same data
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // Function to handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenPlayerDialog(false);  // Close the player dialog
    setDataFetched(false);  // Reset dataFetched so new video data can be fetched next time
  };

  const handleExport = async () => {
    try {
      setIsExporting(true)

      const body = {
        id: "WordBasedComposition",
        inputProps: {
          slides: videoData.imageList,
          audioSrc: videoData.audioFileUrl,
          transcription: {
            transcription: videoData.captions.map(caption => ({
              "word": caption.text,
              "start": caption.start,
              "end": caption.end,
            }))
          },
          videoSettings: {
            word_composition: {
              subtitle_position: 'center',
              subtitle_textAlign: 'center',
              subtitle_font: 'Anton',
              subtitle_font_size: 40,
              subtitle_color: '#FFFFFF',
            }
          }
        }
      }

      const response = await fetch(`http://localhost:3003/api/lambda/render`, {
        method: 'POST',
        body: JSON.stringify(body)
      })

      const data = await response.json();

      console.log("render response data", data);

      setExportResponse(data)

      const pollProgress = async () => {
        const progressResponse = await fetch(`http://localhost:3003/api/lambda/progress`, {
          method: 'POST',
          body: JSON.stringify({
            id: data.id,
            bucketName: data.bucketName,
          }),
        });

        const progressData = await progressResponse.json();
        console.log("Progress:", progressData);

        setProgress(progressData);

        // Check if the task is complete (assuming `progressData.status` indicates completion)
        if (progressData.status === 'done') {
          // Step 3: Stop polling and show the URL
          setDownloadUrl(progressData.url); // Assuming the URL is provided in the response
        } else {
          // Step 4: Keep polling every 2 seconds if not done
          setTimeout(pollProgress, 2000);
        }
      };

      pollProgress();

    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
      <DialogContent
        className="bg-white flex flex-col items-center"
        style={{
          maxWidth: '480px', // Control dialog width
          width: '40%', // Ensure dialog fits the screen
          maxHeight: '90vh', // Limit dialog height to 90% of the viewport
          overflowY: 'auto', // Allow scrolling if the content overflows
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
              setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
            }}
            style={{ width: '100%', height: '100%' }} // Ensure the player scales correctly
          />
        </div>

        <div className="flex space-x-4 mt-5">
          <Button onClick={handleExport}>{isExporting ? 'Exporting...' : 'Export'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
