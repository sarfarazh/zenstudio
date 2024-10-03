import { useContext } from 'react';
import { VideoDataContext } from './VideoDataContext';

// Custom hook to access and update video data
export const useVideoData = () => {
  const context = useContext(VideoDataContext);

  if (!context) {
    throw new Error('useVideoData must be used within a VideoDataProvider');
  }

  const { state, dispatch } = context;

  // Helper functions to update state via dispatch
  const setVideoScript = (videoScript) => {
    dispatch({ type: 'SET_VIDEO_SCRIPT', payload: videoScript });
  };

  const setAudioFileUrl = (audioFileUrl) => {
    dispatch({ type: 'SET_AUDIO_URL', payload: audioFileUrl });
  };

  const setCaptions = (captions) => {
    dispatch({ type: 'SET_CAPTIONS', payload: captions });
  };

  const setImageList = (imageList) => {
    dispatch({ type: 'SET_IMAGE_LIST', payload: imageList });
  };

  const setCreatedBy = (createdBy) => {
    dispatch({ type: 'SET_CREATED_BY', payload: createdBy });
  };

  // Method to reset all video data
  const resetVideoData = () => {
    dispatch({ type: 'RESET_VIDEO_DATA' });
  };

  // Return the state and the helper functions
  return {
    videoScript: state.videoScript,
    audioFileUrl: state.audioFileUrl,
    captions: state.captions,
    imageList: state.imageList,
    createdBy: state.createdBy,
    setVideoScript,
    setAudioFileUrl,
    setCaptions,
    setImageList,
    setCreatedBy,
    resetVideoData, // Include the reset method
  };
};
