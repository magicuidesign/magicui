"use client";

import Link from "next/link";

export const AnimatedButton = () => {
  return (
    <main className="mx-5 w-full gap-y-5">
      <ol className="ml-5 grid list-decimal grid-cols-3 gap-5 text-center">
        {/* Button 1 */}
        <li className="relative cursor-pointer">
          <div className="bg-white px-5 py-2">
            <button className="group relative inline-block text-black">
              Hover over me
              <span className="duration-400 ease-[cubic-bezier(0.86,0,0.07,1)] absolute inset-x-0 bottom-0 h-[1px] origin-bottom-left scale-x-100 transform bg-orange-500 transition-transform group-hover:scale-x-0"></span>
            </button>
          </div>
        </li>
        {/* Button 2 */}
        <li className="relative cursor-pointer">
          <div className=" bg-white px-5 py-2">
            <button
              role="link"
              className="after:ease-[cubic-bezier(0.65_0.05_0.36_1)] relative after:absolute after:bottom-0
          after:left-0 after:h-[1px] after:w-full
          after:origin-bottom-right after:scale-x-0 after:bg-orange-500
          after:transition-transform after:duration-300
          hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              Hover me
            </button>
          </div>
        </li>
        {/* Button 3 */}
        <li className="relative cursor-pointer">
          <div className=" bg-white px-5 py-2">
            <button className="group relative inline-block text-black">
              Hover me
              <span className="duration-400 ease-[cubic-bezier(0.86,0,0.07,1)] origin-left-right absolute inset-x-0 bottom-0 h-[1px] scale-x-0 transform bg-orange-500 transition-transform group-hover:scale-x-100"></span>
            </button>
          </div>
        </li>
        {/* Button 4 */}
        <li>
          <button
            className="group relative inline-flex h-12 items-center
          justify-center overflow-hidden border border-neutral-200
          bg-transparent bg-white px-6 font-medium text-neutral-600
          transition-all duration-100
          [box-shadow:5px_5px_rgb(10_10_10)] hover:translate-x-[3px]
          hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)]"
          >
            Hover me
          </button>
        </li>
        {/* Button 5 */}
        <li>
          <button
            className="group relative inline-flex h-12 items-center
          justify-center overflow-hidden rounded-md border border-neutral-200
          bg-transparent bg-white px-6 font-medium text-neutral-600
          transition-all duration-100
          [box-shadow:5px_5px_rgb(10_10_10)] active:translate-x-[3px]
          active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
          >
            Click me
          </button>
        </li>
        {/* Button 6 */}
        <li>
          <button className="group relative">
            <div
              className="relative z-10 inline-flex h-12 items-center
            justify-center overflow-hidden rounded-md border
            border-neutral-200 bg-transparent bg-white px-6
            font-medium text-neutral-600 transition-all
            duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3"
            >
              Hover me
            </div>
            <div
              className="absolute inset-0 z-0 h-full w-full rounded-md
            transition-all duration-300 group-hover:-translate-x-3
            group-hover:-translate-y-3
            group-hover:[box-shadow:5px_5px_#fea153,10px_10px_#ffb880,15px_15px_#ffcf94]"
            ></div>
          </button>
        </li>
        {/* Button 7 */}
        <li className="relative cursor-pointer">
          <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110">
            <span>Hover me</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20"></div>
            </div>
          </button>
        </li>
        {/* Button 8 */}
        <li>
          <button
            className="group relative h-12 overflow-hidden rounded-md border border-neutral-500
          bg-white px-6 text-neutral-950 transition"
          >
            <span className="">Hover me</span>
            <div
              className="absolute inset-0 h-full w-0 bg-orange-600/60 transition-[width]
            group-hover:w-full"
            ></div>
          </button>
        </li>
        {/* Button 9 */}
        <li>
          <button className="group relative z-0 h-12 overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 px-6 py-2 text-neutral-50">
            <span className="relative z-10">Hover Me</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span
                className="absolute left-0 aspect-square w-full
              origin-center translate-x-full rounded-full bg-orange-600
              transition-all duration-500 group-hover:-translate-x-0
              group-hover:scale-150"
              ></span>
            </span>
          </button>
        </li>
        {/* Button 10 */}
        <li>
          <button className="group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 px-6 py-2 text-neutral-50">
            <span className="relative z-10">Hover me</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-orange-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>
        </li>
        {/* Button 11 */}
        <li>
          <button
            className="group relative inline-flex h-12 items-center
          justify-center overflow-hidden rounded-md bg-neutral-950 px-6
          font-medium text-neutral-50"
          >
            <span
              className="absolute h-0 w-0
            rounded-full bg-orange-500 transition-all duration-300
            group-hover:h-56 group-hover:w-32"
            ></span>
            <span className="relative">Hover me</span>
          </button>
        </li>
        {/* Button 12 */}
        <li>
          <button
            className="group relative inline-flex h-12 items-center
          justify-center overflow-hidden rounded-3xl  border
          border-neutral-500 bg-white px-6 text-neutral-950 duration-500"
          >
            <div className="translate-y-0 transition group-hover:-translate-y-[150%]">
              Hover me
            </div>
            <div className="absolute translate-y-[150%] text-orange-500 transition group-hover:translate-y-0">
              See that 
            </div>
          </button>
        </li>
        {/* Button 13 */}
        <li>
          <button
            className="group relative inline-flex h-12 items-center
          justify-center overflow-hidden rounded-3xl
           border border-neutral-500 bg-white px-6 text-neutral-950 duration-500"
          >
            <div className="translate-x-0 transition group-hover:-translate-x-[150%]">
              Hover me
            </div>
            <div className="absolute translate-x-[150%] text-orange-500 transition group-hover:translate-x-0">
              Hover 🤯
            </div>
          </button>
        </li>
        {/* Button 14 */}
        <li>
          <button className="group relative h-12 rounded-full border border-neutral-500 bg-white px-4 text-neutral-950">
            <span className="relative inline-flex overflow-hidden">
              <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                Hover me
              </div>
              <div className="absolute translate-y-[110%] skew-y-12 text-orange-500 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                stagger
              </div>
            </span>
          </button>
        </li>
        {/* Button 15 */}
        <li>
          <button
            className="group relative inline-flex h-12 items-center
          justify-center overflow-hidden rounded-md bg-neutral-950 px-6
          font-medium text-neutral-200 transition hover:scale-110"
          >
            <span>Expand me</span>
          </button>
        </li>
        {/* Button 16 */}
        <li>
          <button className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-11 font-medium text-neutral-50">
            <span className="z-10 pr-3">Hover</span>
            <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
              <div className="mr-3.5 flex items-center justify-center">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-neutral-50"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </button>
        </li>
        {/* Button 17 */}
        <li>
          <button className="duration-[400ms] group relative bg-white px-4 py-2 text-neutral-950 transition-colors hover:text-orange-500">
            <span>Hover over me</span>
            <span className="absolute left-0 top-0 h-[2px] w-0 bg-orange-500 transition-all duration-100 group-hover:w-full" />
            <span className="absolute right-0 top-0 h-0 w-[2px] bg-orange-500 transition-all delay-100 duration-100 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-orange-500 transition-all delay-200 duration-100 group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-orange-500 transition-all delay-300 duration-100 group-hover:h-full" />
          </button>
        </li>
        {/* Button 18 */}
        <li>
          <button
            className="group relative inline-flex h-12 w-12 items-center
          justify-center overflow-hidden rounded-full bg-neutral-950
          font-medium text-orange-500"
          >
            <div className="translate-x-0 transition group-hover:translate-x-[300%]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="absolute -translate-x-[300%] transition group-hover:translate-x-0">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </li>
        {/* Button 19 */}
        <li>
          <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950">
            <div className="-rotate-45 transition duration-300 group-hover:rotate-0">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-500"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </li>
        {/* Button 20 */}
        <li>
          <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200 transition-all duration-300 hover:w-32">
            <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:text-orange-500 group-hover:opacity-100">
              Hover me
            </div>
            <div className="absolute right-3.5">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-500"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </li>
      </ol>
    </main>
  );
};
