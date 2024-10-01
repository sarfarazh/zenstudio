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

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]); // Initialize as an empty array
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState([]);
  const {videoData,setVideoData}=useContext(VideoDataContext);

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
    console.log(prompt);
  
    try {
      const result = await axios.post('/api/get-video-script', {
        prompt: prompt,
      });
  
      console.log('API response:', result.data);
  
      // Check if the result is an array and contains the expected fields
      if (result.data && Array.isArray(result.data.result)) {
        console.log('Valid videoScript:', result.data.result);
        setVideoData(prev=>({
          ...prev,
          'videoScript':result.data.result
        }))
        setVideoScript(result.data.result); // Update state asynchronously
        await GenerateAudioFile(result.data.result); // Pass videoScriptData directly
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
  
    // Ensure we have valid contentText
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
      setVideoData(prev=>({
        ...prev,
        'audioFileUrl':response.data.Result
      }))
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
      setVideoData(prev=>({
        ...prev,
        'captions':response.data.result
      }))
      console.log(response.data.result);
      setCaptions(response?.data?.result);
  
      // Directly pass videoScriptData to GenerateImage
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
      // Use Promise.all to run image generation in parallel
      const imagePromises = videoScriptData.map(async (element) => {
        const resp = await axios.post('/api/generate-image', {
          prompt: element?.imagePrompt,
        });
        console.log(resp.data.result);
        return resp.data.result;
      });
  
      images = await Promise.all(imagePromises);
      console.log(images);
      setVideoData(prev=>({
        ...prev,
        'imageList': images // Corrected to use images
      }))
      setImageList(images);
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(()=>{
    console.log(videoData);
  },[videoData])

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