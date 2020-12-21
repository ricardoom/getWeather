import React from 'react';

// Stateless functional component:
const SvgTextEl = ({ text, x, y, transform, style, rotate }) => (
  <text x={x} y={y} style={style} rotate={rotate} transform={transform}>
    {text}
  </text>
);

export default SvgTextEl;
