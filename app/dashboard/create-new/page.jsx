"use client";
import React, { useEffect, useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'; // Clerk's useUser hook to get the logged-in user's info
import PlayerDialog from '../_components/PlayerDialog';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); // Retrieve the user object from Clerk

  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // Access the primary email address of the logged-in user
  const userEmail =
    user?.primaryEmailAddress?.emailAddress || 'user@example.com'; // Fallback to a default email if unavailable

  // Local variables to hold data
  let videoScriptData = [];
  let audioFileUrlData = '';
  let captionsData = [];
  let imageListData = [];

  // Reset state on component mount
  useEffect(() => {
    setVideoId(null);
    setPlayVideo(false);
  }, []);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
  };

  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      'Write a script to generate ' +
      formData.duration +
      ' video on topic: ' +
      formData.topic +
      ' story along with a detailed 60 words AI image generation prompt in ' +
      formData.imageStyle +
      ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, no Plain text';
    console.log(prompt);

    try {
      const result = await axios.post('/api/get-video-script', { prompt });
      console.log('API response:', result.data);

      if (result.data && Array.isArray(result.data.result)) {
        console.log('Valid videoScript:', result.data.result);
        videoScriptData = result.data.result;
        await GenerateAudioFile(videoScriptData);
      } else {
        console.error('Invalid or missing videoScript in API response.');
      }
    } catch (error) {
      console.error('Error generating video script:', error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = '';
    const id = uuidv4();

    videoScriptData.forEach((item) => {
      script += item.contentText ? item.contentText + ' ' : '';
    });

    console.log('Final script for Text-to-Speech:', script);

    if (!script.trim()) {
      console.error('Script is empty or undefined.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/generate-audio', {
        text: script,
        id,
      });
      console.log('Audio generation response:', response.data);
      audioFileUrlData = response.data.Result; // Store in local variable
      await GenerateAudioCaption(audioFileUrlData, videoScriptData);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-caption', {
        audioFileUrl: fileUrl,
      });
      console.log(response.data.result);
      captionsData = response.data.result; // Store in local variable
      await GenerateImage(videoScriptData);
    } catch (error) {
      console.error('Error generating captions:', error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateImage = async (videoScriptData) => {
    if (!videoScriptData || !Array.isArray(videoScriptData)) {
      console.error('videoScriptData is not defined or is not an array');
      setLoading(false);
      return;
    }

    setLoading(true);
    let images = [];
    try {
      const imagePromises = videoScriptData.map(async (element) => {
        const resp = await axios.post('/api/generate-image', {
          prompt: element?.imagePrompt,
        });
        return resp.data.result;
      });

      images = await Promise.all(imagePromises);
      console.log('Generated images:', images);
      imageListData = images; // Store in local variable

      // After all data is ready, save video data
      const videoData = {
        videoScript: videoScriptData,
        audioFileUrl: audioFileUrlData,
        captions: captionsData,
        imageList: imageListData,
        createdBy: userEmail, // Set to the logged-in user's email
      };

      console.log('Saving video data with:', videoData);

      // Check if any of the fields are empty
      if (
        videoData.videoScript.length === 0 ||
        !videoData.audioFileUrl ||
        videoData.captions.length === 0 ||
        videoData.imageList.length === 0
      ) {
        console.error('One or more fields are empty, not saving to database.');
      } else {
        await saveVideoData(videoData);
      }
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to save video data to the database
  const saveVideoData = async (data) => {
    try {
      const insertedRecord = await db
        .insert(VideoData)
        .values(data)
        .returning(); // Use .returning() to get inserted data
      console.log('Video data saved to database successfully');
      setVideoId(insertedRecord[0].id); // Set the videoId from the inserted record
      setPlayVideo(true);
    } catch (error) {
      console.error('Error saving video data to database:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Create New</h2>
      </div>
      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Select Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button
          className="mt-10 w-full"
          onClick={onCreateClickHandler}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Short Video'}
        </Button>
      </div>

      {/* Only render CustomLoading when loading is true */}
      {loading && <CustomLoading loading={loading} />}

      {/* Render PlayerDialog only when playVideo is true */}
      {playVideo && videoId && (
        <PlayerDialog
          playVideo={playVideo}
          videoId={videoId}
          setOpenPlayerDialog={setPlayVideo} // Pass the setter to allow closing the dialog
        />
      )}
    </div>
  );
}

export default CreateNew;
