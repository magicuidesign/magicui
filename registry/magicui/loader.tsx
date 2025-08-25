'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  name: keyof typeof import('ldrs');
  size?: string;
  color?: string;
  speed?: string;
  stroke?: string;
  strokeLength?: string;
  loaderBgOpacity?: string;
  blurBg?: boolean;
  containerRef?: React.RefObject<HTMLElement | null>;
};

const Loader = ({
  name,
  size = '40',
  color = 'white',
  speed = '2',
  stroke,
  strokeLength,
  loaderBgOpacity,
  blurBg = true,
  containerRef
}: Props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    (async () => {
      var LDRS = await import('ldrs');
      // const names = Object.keys(LDRS).map(x=>x)
      // console.log(names);
      
      const loader = LDRS[name as keyof typeof LDRS];
      if (loader && !customElements.get(`l-${name.toLowerCase()}`)) {
        (loader as any).register();
      }
      setIsReady(true);
    })();
  }, [name]);

  if (!isReady) return null;

  const Tag = `l-${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}` as keyof JSX.IntrinsicElements;

  const LoaderContent = (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        blurBg ? 'bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10' : 'bg-white/50 dark:bg-black/50'
      }`}>
      {React.createElement(Tag, {
        size,
        color,
        speed,
        stroke,
        strokeLength,
        loaderBgOpacity
      })}
    </div>
  );

  return containerRef?.current ? (
    <div className="absolute z-50 top-0 w-full h-full">{LoaderContent}</div>
  ) : (
    <div className="fixed inset-0 z-[51] flex items-center justify-center">{LoaderContent}</div>
  );
};

export default Loader;
