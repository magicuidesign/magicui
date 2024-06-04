"use client";

import React, { CSSProperties } from "react";

export const PulsatingButton: React.FC = () => {
  const pulseKeyframes = `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(90, 153, 212, 0.5);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
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
    color: 'white',
    backgroundColor: 'rgba(90, 153, 212)',
    cursor: 'pointer',
    animation: 'pulse 1.5s infinite',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button 
        style={buttonStyle}
        className="rounded w-[150px] p-[10px] flex justify-center items-center"
        >Join Affialate
      </button>
    </div>
  );
};

export default PulsatingButton;


// import { AnimatePresence, easeIn, easeOut, motion, animate } from "framer-motion";
// import React, { CSSProperties } from "react";

// interface PulsatingButtonProps {
//   buttonColor: string;
//   buttonTextColor?: string;
//   buttonText: string;
//   pulseKeyframes: string;
// }

// export const PulsatingButton: React.FC<PulsatingButtonProps> = ({
//   buttonColor,
//   buttonTextColor,
//   buttonText,
//   pulseKeyframes = `
//     @keyframes pulse {
//       0% {
//         transform: scale(0.9);
//       }
//       70% {
//         transform: scale(1);
//         box-shadow: 0 0 0 20px rgba(#5a99d4, 0);
//       }
//       100% {
//         transform: scale(0.9);
//         box-shadow: 0 0 0 0px rgba(#5a99d4, 0);
//       }
//     }
//   `,
// }) => {
//   return (
//       (
//           <button
//             className="relative bg-white w-[200px] p-[10px] flex justify-center items-center"
//             style={{
//               color: buttonColor,
//               opacity: 1,
//               animation: 'pulse 1.5s infinite'
//             }}
//           >
//             <div
              
//             >
//               <span
//                 className="relative block w-full h-full font-semibold"
//                 style={{ color: buttonTextColor }}
//               >
//                 {buttonText}
//               </span>
//             </div>
              
//           </button>
//       )
    
//   );
// };

// const pulseKeyframes = `
//     @keyframes pulse {
//       0% {
//         transform: scale(0.9);
//         box-shadow: 0 0 0 0 rgba(90, 153, 212, 0.5);
//       }
//       70% {
//         transform: scale(1);
//         box-shadow: 0 0 0 30px rgba(90, 153, 212, 0);
//       }
//       100% {
//         transform: scale(0.9);
//         box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
//       }
//     }
//   `
// /**
// import { AnimatePresence, motion } from "framer-motion";
// import React, { useState } from "react";

// interface AnimatedSubscribeButtonProps {
//   brand: string;
//   subscribeStatus: boolean;
//   buttonTextColor?: string;
//   initialText: string;
//   changeText: string;
// }

// export const AnimatedSubscribeButton: React.FC<AnimatedSubscribeButtonProps> = ({
//   brand,
//   subscribeStatus,
//   buttonTextColor,
//   changeText,
//   initialText,
// }) => {
//   const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

//   return (
//     <AnimatePresence mode="wait">
//       {isSubscribed ? (
//         <motion.button
//           className="relative bg-white w-[200px] p-[10px] flex justify-center items-center"
//           onClick={() => setIsSubscribed(false)}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.span
//             key='action'
//             className="relative block w-full h-full font-semibold"
//             initial={{ y: -50 }}
//             animate={{ y: 0 }}
//             style={{ color: brand }}
//           >
//             {changeText}
//           </motion.span>
//         </motion.button>
//       ) : (
//         <motion.button
//           className="relative rounded-md w-[200px] border-none cursor-pointer p-[10px] flex items-center justify-center"
//           style={{ backgroundColor: brand, color: buttonTextColor }}
//           onClick={() => setIsSubscribed(true)}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.span
//             key='reaction'
//             className="relative block font-semibold"
//             initial={{ x: 0 }}
//             exit={{ x: 50, transition: { duration: 0.1 } }}
//           >
//             {initialText}
//           </motion.span>
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// };

// */