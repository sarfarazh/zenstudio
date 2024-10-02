"use client";
import React, { useEffect, useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { useVideoData } from '@/app/_context/useVideoData';  // Custom hook for state
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { useUser } from "@clerk/nextjs"; // Clerk's useUser hook to get the logged-in user's info
import PlayerDialog from '../_components/PlayerDialog';


function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); // Retrieve the user object from Clerk

  const [playVideo,setPlayVideo]=useState(true);
  const [videoId,setVideoId]=useState(20);
  
  // Access the primary email address of the logged-in user
  const userEmail = user?.primaryEmailAddress?.emailAddress || "user@example.com"; // Fallback to a default email if unavailable

  // Using video data from the context
  const {
    videoScript,
    audioFileUrl,
    captions,
    imageList,
    setVideoScript,
    setAudioFileUrl,
    setCaptions,
    setImageList,
  } = useVideoData();  // Custom hook to manage video data

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // Ensure the form is only submitted when this button is clicked
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
        setVideoScript(result.data.result);  // Use context's dispatch for video script
        await GenerateAudioFile(result.data.result);  // Pass videoScriptData directly
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
      const response = await axios.post('/api/generate-audio', { text: script, id });
      console.log('Audio generation response:', response.data);
      setAudioFileUrl(response.data.Result);  // Update context with audio file URL
      await GenerateAudioCaption(response.data.Result, videoScriptData);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-caption', { audioFileUrl: fileUrl });
      console.log(response.data.result);
      setCaptions(response.data.result);  // Update context with captions
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
  
    let images = [];
    try {
      const imagePromises = videoScriptData.map(async (element) => {
        const resp = await axios.post('/api/generate-image', { prompt: element?.imagePrompt });
        return resp.data.result;
      });
  
      images = await Promise.all(imagePromises);
      console.log(images);
      setImageList(images);  // Update context with image list
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to save video data to the database
const saveVideoData = async (data) => {
  try {
    // Insert the collected video data into the VideoData table
    await db.insert(VideoData).values(data);
    const insertedRecord = await db.insert(VideoData).values(data).returning(); // Use .returning() to get inserted data

    console.log('Video data saved to database successfully');

    // Set videoId and playVideo to trigger the Remotion PlayerDialog
    setVideoId(insertedRecord[0].id);  // Set the videoId from the inserted record
    setPlayVideo(true)

  } catch (error) {
    console.error('Error saving video data to database:', error);
  }
};


// Call this function after all the data (videoScript, audioFileUrl, captions, imageList) is ready
useEffect(() => {
  if (videoScript.length > 0 && audioFileUrl && captions.length > 0 && imageList.length > 0) {
    const videoData = {
      videoScript,
      audioFileUrl,
      captions,
      imageList,
      createdBy: userEmail,  // Set to the logged-in user's email
    };
    // Save video data to the database
    saveVideoData(videoData);
  }
}, [videoScript, audioFileUrl, captions, imageList]);


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
      <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
        Create Short Video
      </Button>
    </div>

    {/* Only render CustomLoading when loading is true */}
    {loading && <CustomLoading loading={loading} />}
    <PlayerDialog playVideo={playVideo} videoId={videoId}/>
  </div>
);
}

export default CreateNew;