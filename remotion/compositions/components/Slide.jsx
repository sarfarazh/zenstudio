import React from 'react';
import { Img } from 'remotion';

export const Slide = ({ src }) => {
  return (
    <Img
      src={src}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
};
