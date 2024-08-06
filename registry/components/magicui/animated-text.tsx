import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text?: string;
  className?: string;
  delay?: number;
  fontSize?: string | number; // Allows font size to be a string (e.g., "2rem") or number (e.g., 24)
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "Hello world",
  className = "",
  delay = 500, // default delay of 500 milliseconds
  fontSize = "3rem", // default font size
}) => {
  const [displayText, setDisplayText] = useState<string>("");
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]+-*/~';<=>?@#$%^&*@#$%^&*(){}[]+-*/~';<=>?@#$%^&*@#$%^&*(){}[]+-*/~';<=>?@#$%^&*@#$%^&*(){}[]+-*/~';<=>?@#$%^&*";

  useEffect(() => {
    let currentIndex = 0;
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const randomizeText = () => {
      const randomText = Array.from(text)
        .map((char, index) =>
          index < currentIndex
            ? char
            : randomChars[Math.floor(Math.random() * randomChars.length)],
        )
        .join("");
      setDisplayText(randomText);
      currentIndex++;
      if (currentIndex > text.length) {
        clearInterval(interval);
      }
    };

    timeout = setTimeout(() => {
      interval = setInterval(randomizeText, 100); // Adjust timing here
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <motion.h1
      className={`font-bold ${className}`}
      style={{ fontSize }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {displayText}
    </motion.h1>
  );
};

export default AnimatedText;
