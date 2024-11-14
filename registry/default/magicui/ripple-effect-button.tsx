import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";


interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}


const RippleButton: React.FC<RippleButtonProps> = ({ children, className, onClick, ...props }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleAnimation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prevRipples) => [...prevRipples, newRipple]);

    // Remove the ripple after 1 second
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id));
    }, 1000);
    if(onClick) onClick(e)
  };

  return (
    <button
      className={cn("relative overflow-hidden px-6 py-3 rounded-full text-white bg-black hover:bg-opacity-80 focus:outline-none", className)}
      onClick={handleAnimation}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white rounded-full pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.25 }}
          animate={{ width: 350, height: 350, opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;

