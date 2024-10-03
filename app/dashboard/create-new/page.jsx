"use client";
import React, { useEffect, useState, useContext } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import PlayerDialog from '../_components/PlayerDialog';
import { db } from '@/configs/db';
import { VideoData, Users } from '@/configs/schema';
import { eq, sql } from 'drizzle-orm';
import { CreditsContext } from '../../_context/CreditsContext';

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(''); // New state to track current stage
  const { user } = useUser();

  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { fetchCredits } = useContext(CreditsContext);

  const userEmail = user?.primaryEmailAddress?.emailAddress || 'user@example.com';

  let videoScriptData = [];
  let audioFileUrlData = '';
  let captionsData = [];
  let imageListData = [];

  useEffect(() => {
    setVideoId(null);
    setPlayVideo(false);
    console.log("Component mounted, reset videoId and playVideo state.");
  }, []);

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(`Input Change - Field: ${fieldName}, Value: ${fieldValue}`);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    console.log("Create Button Clicked, Form Data:", formData);
    GetVideoScript();
  };

  const GetVideoScript = async () => {
    setLoading(true);
    setCurrentStage('Generating Video Script...'); // Track stage

    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} story along with a detailed AI image generation prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, no Plain text`;

    console.log("Sending API request to generate video script with prompt:", prompt);

    try {
      const result = await axios.post('/api/get-video-script', { prompt });
      console.log("API Response from /api/get-video-script:", result.data);

      if (result.data && Array.isArray(result.data.result)) {
        videoScriptData = result.data.result;
        console.log("Valid Video Script Data:", videoScriptData);
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
    setCurrentStage('Generating Audio...'); // Track stage

    let script = '';
    const id = uuidv4();

    videoScriptData.forEach((item) => {
      script += item.contentText ? item.contentText + ' ' : '';
    });

    if (!script.trim()) {
      console.error('Script is empty or undefined.');
      setLoading(false);
      return;
    }

    console.log("Sending API request to generate audio for script:", script);

    try {
      const response = await axios.post('/api/generate-audio', {
        text: script,
        id,
      });
      console.log("API Response from /api/generate-audio:", response.data);

      audioFileUrlData = response.data.Result;
      await GenerateAudioCaption(audioFileUrlData, videoScriptData);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    setCurrentStage('Generating Captions...'); // Track stage

    console.log("Sending API request to generate captions for audio file URL:", fileUrl);

    try {
      const response = await axios.post('/api/generate-caption', {
        audioFileUrl: fileUrl,
      });
      console.log("API Response from /api/generate-caption:", response.data);

      captionsData = response.data.result;
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
    setCurrentStage('Generating Images...'); // Track stage

    let images = [];
    console.log("Generating images for video script data:", videoScriptData);

    try {
      const imagePromises = videoScriptData.map(async (element) => {
        const resp = await axios.post('/api/generate-image', {
          prompt: element?.imagePrompt,
        });
        console.log("API Response from /api/generate-image:", resp.data);
        return resp.data.result;
      });

      images = await Promise.all(imagePromises);
      console.log("Generated images:", images);
      imageListData = images;

      const videoData = {
        videoScript: videoScriptData,
        audioFileUrl: audioFileUrlData,
        captions: captionsData,
        imageList: imageListData,
        createdBy: userEmail,
      };

      if (
        videoData.videoScript.length === 0 ||
        !videoData.audioFileUrl ||
        videoData.captions.length === 0 ||
        videoData.imageList.length === 0
      ) {
        console.error('One or more fields are empty, not saving to database.');
      } else {
        console.log("Saving video data to the database:", videoData);
        await saveVideoData(videoData);
        await deductCredits();
      }
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveVideoData = async (data) => {
    try {
      setCurrentStage('Saving Video Data...'); // Track stage
      console.log("Attempting to save video data to the database:", data);
      const insertedRecord = await db
        .insert(VideoData)
        .values(data)
        .returning();
      console.log("Inserted record:", insertedRecord);
      setVideoId(insertedRecord[0].id);
      setPlayVideo(true);
    } catch (error) {
      console.error('Error saving video data to database:', error);
    }
  };

  const deductCredits = async () => {
    try {
      setCurrentStage('Deducting Credits...'); // Track stage
      console.log("Deducting credits for user:", userEmail);
      await db
        .update(Users)
        .set({ credits: sql`${Users.credits} - 10` })
        .where(eq(Users.email, userEmail));
      console.log('Credits deducted successfully');
      fetchCredits();
    } catch (error) {
      console.error('Error deducting credits:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Create New</h2>
      </div>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button
          className="mt-10 w-full"
          onClick={onCreateClickHandler}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Short Video'}
        </Button>
      </div>
      {loading && <CustomLoading loading={loading} currentStage={currentStage} />} {/* Pass the currentStage */}
      {playVideo && videoId && (
        <PlayerDialog
          playVideo={playVideo}
          videoId={videoId}
          setOpenPlayerDialog={setPlayVideo}
        />
      )}
    </div>
  );
}

export default CreateNew;
