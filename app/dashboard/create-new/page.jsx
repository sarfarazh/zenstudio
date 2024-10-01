"use client";
import React, { useContext, useEffect, useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);  // Initialize as an empty array
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState([]);
  const { user } = useUser();
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const [isPipelineComplete, setIsPipelineComplete] = useState(false);

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

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
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} story along with a detailed 60 words AI image generation prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, no Plain text`;
  
    try {
      const result = await axios.post('/api/get-video-script', { prompt });
      if (result.data && Array.isArray(result.data.result)) {
        const videoScriptData = result.data.result;
        console.log('Valid videoScript:', videoScriptData);
  
        // Generate audio and captions sequentially and pass them to GenerateImage
        const audioFileUrl = await GenerateAudioFile(videoScriptData);
        const captions = await GenerateAudioCaption(audioFileUrl, videoScriptData);
        
        // Now pass everything to GenerateImage
        await GenerateImage(videoScriptData, captions, audioFileUrl);
  
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
    let script = videoScriptData.map(item => item.contentText).join(' ');
    const id = uuidv4();
  
    if (!script.trim()) {
      console.error('Script is empty or undefined.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('/api/generate-audio', { text: script, id });
      console.log('Audio generation response:', response.data);
  
      // Return audioFileUrl for further steps
      return response.data.Result;
  
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
      console.log('Captions response:', response.data.result);
  
      // Return captions for further steps
      return response.data.result;
  
    } catch (error) {
      console.error('Error generating captions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const GenerateImage = async (videoScriptData, captions, audioFileUrl) => {
    if (!videoScriptData || !Array.isArray(videoScriptData)) {
      console.error('videoScriptData is not defined or is not an array');
      setLoading(false);
      return;
    }
  
    let images = [];
    try {
      const imagePromises = videoScriptData.map(async (element) => {
        const resp = await axios.post('/api/generate-image', {
          prompt: element?.imagePrompt,
        });
        console.log('Image generation response:', resp.data.result);
        return resp.data.result;
      });
  
      images = await Promise.all(imagePromises);
      console.log('Generated images:', images);
  
      // Instead of updating videoData step by step, we batch all updates together at the end
      setVideoData(prev => ({
        ...prev,
        videoScript: videoScriptData,
        audioFileUrl: audioFileUrl,
        captions: captions,
        imageList: images,  // Ensure imageList is correctly set
      }));
  
      setIsPipelineComplete(true);  // Mark the pipeline as complete
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    console.log('Pipeline Status:', isPipelineComplete);  // Log pipeline status
    console.log('Video Data Status:', videoData);  // Log current videoData
  
    // Ensure SaveVideoData is only called when the pipeline is complete and all fields exist
    if (
      isPipelineComplete && 
      videoData?.videoScript && 
      videoData?.audioFileUrl && 
      videoData?.captions && 
      videoData?.imageList
    ) {
      console.log('Pipeline complete. Saving video data...');
      
      if (!videoData.isSaved) {
        console.log('Calling SaveVideoData for the first time...');
        SaveVideoData(videoData);  // Only call if videoData hasn't been saved yet
      } else {
        console.log('Data has already been saved, skipping...');
      }
    }
  }, [videoData, isPipelineComplete]);  // Watch both videoData and isPipelineComplete
  
  const SaveVideoData = async (videoData) => {
    try {
      // Check for circular references in videoData
      try {
        JSON.stringify(videoData); // If this throws an error, there is a circular reference
      } catch (err) {
        console.error('Circular reference detected in videoData:', err);
        return; // Exit to prevent further execution
      }
  
      // Guard clause to prevent repeated calls
      if (videoData.isSaved) {
        console.log('Video data already saved. Skipping save...');
        return; // Exit if videoData has already been saved
      }
  
      console.log('Saving video data to the database...');
      console.log('Size of videoScript:', JSON.stringify(videoData?.videoScript).length);
      console.log('Size of audioFileUrl:', videoData?.audioFileUrl?.length);
      console.log('Size of captions:', JSON.stringify(videoData?.captions).length);
      console.log('Size of imageList:', JSON.stringify(videoData?.imageList).length);
  
      const result = await db
        .insert(VideoData)
        .values({
          script: videoData?.videoScript,
          audioFileUrl: videoData?.audioFileUrl,
          captions: videoData?.captions,
          imageList: videoData?.imageList,
          createdBy: user?.primaryEmailAddress?.emailAddress
        })
        .returning('id');
  
      console.log('Inserted ID:', result[0]?.id);
  
      // Mark videoData as saved to avoid future calls
      setVideoData(prev => ({ ...prev, isSaved: true }));
  
    } catch (error) {
      console.error('Error inserting video data:', error);
    } finally {
      setLoading(false);  // Ensure loading state is properly toggled off
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

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>

      {/* Only render CustomLoading when loading is true */}
      {loading && <CustomLoading loading={loading} />}
    </div>
  );
}

export default CreateNew;
