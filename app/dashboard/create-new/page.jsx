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
    const prompt =
      'Write a script to generate ' +
      formData.duration +
      ' video on topic: ' +
      formData.topic +
      ' story along with a detailed 60 words AI image generation prompt in ' +
      formData.imageStyle +
      ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, no Plain text';
    console.log('Prompt:', prompt);
  
    try {
      const result = await axios.post('/api/get-video-script', {
        prompt: prompt,
      });
  
      console.log('API response:', result.data);
  
      // Check if the result is an array and contains the expected fields
      if (result.data && Array.isArray(result.data.result)) {
        console.log('Valid videoScript:', result.data.result);
        setVideoData(prev => ({
          ...prev,
          'videoScript': result.data.result  // Ensure videoScript field matches your schema
        }));
        setVideoScript(result.data.result);  // Update state asynchronously
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
  
    // Ensure we have valid `contentText`
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
        id: id,
      });
  
      console.log('Audio generation response:', response.data);
      setVideoData(prev => ({
        ...prev,
        'audioFileUrl': response.data.Result  // Ensure audioFileUrl is correctly set
      }));
      setAudioFileUrl(response.data.Result);
  
      // Pass videoScriptData to GenerateAudioCaption
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
      const response = await axios.post('/api/generate-caption', {
        audioFileUrl: fileUrl,
      });
      console.log('Captions response:', response.data.result);
      setVideoData(prev => ({
        ...prev,
        'captions': response.data.result  // Ensure captions field is correctly set
      }));
      setCaptions(response?.data?.result);
  
      // Directly pass videoScriptData to GenerateImage
      await GenerateImage(videoScriptData);
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
  
      // Batch update videoData after all steps are completed
      setVideoData({
        videoScript: videoScriptData,
        audioFileUrl: audioFileUrl,
        captions: captions,
        imageList: images,
      });
  
      setIsPipelineComplete(true);  // Mark the pipeline as complete
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    // Ensure SaveVideoData is called only once when all fields are set and pipeline is fully complete
    if (
      isPipelineComplete && 
      videoData?.videoScript && 
      videoData?.audioFileUrl && 
      videoData?.captions && 
      videoData?.imageList
    ) {
      console.log('Pipeline complete. Saving video data...');
  
      // Use a guard to ensure that SaveVideoData is called only once
      if (!videoData.isSaved) {
        SaveVideoData({ ...videoData, isSaved: true });  // Add a flag to prevent multiple saves
      }
    }
  }, [videoData, isPipelineComplete]);
  
  const SaveVideoData = async (videoData) => {
    try {
      setLoading(true);
  
      // Log sizes of individual data components
      console.log('Size of videoScript:', JSON.stringify(videoData?.videoScript).length);
      console.log('Size of audioFileUrl:', videoData?.audioFileUrl?.length);
      console.log('Size of captions:', JSON.stringify(videoData?.captions).length);
      console.log('Size of imageList:', JSON.stringify(videoData?.imageList).length);
  
      console.log('Saving video data to the database...');
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
    } catch (error) {
      console.error('Error inserting video data:', error);
    } finally {
      setLoading(false);
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
