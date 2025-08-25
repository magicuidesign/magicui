"use client";
import { useRef } from "react";
import Loader from "../magicui/loader";

const LoaderDemo = () =>{
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative justify-center" ref={ref}>
        <Loader name='tailChase' size={'50'} containerRef={ref} />
    </div>
  );
}

export default LoaderDemo;
