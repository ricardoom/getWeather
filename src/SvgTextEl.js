import React from 'react';

/// DO the Reaact stuuf;
export default function SvgTextEl({ text, x, y }) {
  // return React.createElement('text', {}, text);

  return (
    <text x={x} y={y}>{text}</text>
  )
};
