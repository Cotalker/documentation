import React, { useEffect } from "react";

const Highlight = ({text, color}) => (<span style={{
  backgroundColor: color,
  borderRadius: '3px',
  color: '#fff',
  padding: '0.2rem',
  'margin-right': '3px',
  'margin-left': '3px'
}}> {text} </span> );

export default Highlight;
