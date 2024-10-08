import { Audio } from 'remotion';

export const AudioComponent = ({ src }) => {
  return <Audio src={src} volume={1} />;
};
