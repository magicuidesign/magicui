"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
}
export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className={clsx(
            "absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] -z-10"
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div className="-z-10 absolute w-[50px] h-[1px] bg-gradient-to-r from-slate-500 to-transparent top-1/2 -translate-y-1/2" />
        </span>
      ))}
    </>
  );
};

export default Meteors;
