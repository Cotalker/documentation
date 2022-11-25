import React, { useEffect } from "react";

const Highlight = ({text, color, textcolor}) => (<span style={{
  backgroundColor: color,
  borderRadius: '3px',
  color: textcolor,
  padding: '0.2rem',
  marginRight: '3px',
  marginLeft: '3px'
}}> {text} </span> );

export default Highlight;
