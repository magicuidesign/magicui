"use client";

import React, { CSSProperties } from "react";

interface PulsatingButtonProps {
  text: string;
  pulseColor: string;
  backgroundColor: string;
  textColor: string;
  animationDuration: string;
  buttonWidth: string;
  buttonHeight: string;
}

export const PulsatingButton: React.FC<PulsatingButtonProps> = ({
  text,
  pulseColor,
  backgroundColor,
  textColor,
  animationDuration,
  buttonWidth,
  buttonHeight
}) => {
  const pulseKeyframes = `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(${pulseColor}, 0);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(${pulseColor}, 0.5);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(${pulseColor}, 0);
      }
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.innerHTML = pulseKeyframes;
  document.head.appendChild(styleElement);

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    display: 'block',
    textAlign: 'center',
    color: textColor,
    backgroundColor: backgroundColor,
    width: buttonWidth,
    height: buttonHeight,
    cursor: 'pointer',
    animation: "pulse infinite", animationDuration,
  };

  return (
    <div 
    style=
    {{ 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center' 
      }}>
        <button 
          style={buttonStyle}
          className="rounded flex justify-center items-center"
        >
          <b>
            {text}
          </b>
        </button>
      </div>
  );
};

export default PulsatingButton;

