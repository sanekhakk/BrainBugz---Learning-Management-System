// src/assets/BrainBugzLogo.jsx
import React from "react";

export const BrainBugzLogo = (props) => (
  <svg viewBox="0 0 64 64" width="64" height="64" {...props} xmlns="http://www.w3.org/2000/svg">
    <rect rx="12" width="64" height="64" fill="#0b1220"/>
    <g transform="translate(8,8)">
      <circle cx="24" cy="24" r="18" fill="#081023" stroke="#38BDF8" strokeWidth="2"/>
      <path d="M8 24 Q16 8 32 24 Q24 40 8 24 Z" fill="#FCD34D" opacity="0.9"/>
    </g>
  </svg> 
);  

export default BrainBugzLogo;
