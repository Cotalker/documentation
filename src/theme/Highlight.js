import React, { useEffect } from "react";

const Highlight = ({text, color, textcolor}) => (<span style={{
  backgroundColor: color,
  borderRadius: '3px',
  color: textcolor,
  padding: '0.2rem',
  'margin-right': '3px',
  'margin-left': '3px'
}}> {text} </span> );

export default Highlight;
