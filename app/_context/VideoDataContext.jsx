import { createContext, useReducer } from "react";

// Initial state for video data
const initialState = {
  videoScript: [],
  audioFileUrl: '',
  captions: [],
  imageList: [],
  createdBy: '', // Placeholder for user's email
};

// Reducer function to manage state transitions
const videoDataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIDEO_SCRIPT':
      return { ...state, videoScript: action.payload };
    case 'SET_AUDIO_URL':
      return { ...state, audioFileUrl: action.payload };
    case 'SET_CAPTIONS':
      return { ...state, captions: action.payload };
    case 'SET_IMAGE_LIST':
      return { ...state, imageList: action.payload };
    case 'SET_CREATED_BY':
      return { ...state, createdBy: action.payload };
    default:
      return state;
  }
};

// Create the context
export const VideoDataContext = createContext();

// Context provider to wrap around components
export const VideoDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoDataReducer, initialState);

  return (
    <VideoDataContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoDataContext.Provider>
  );
};
