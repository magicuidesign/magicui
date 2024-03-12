// "use client";

// import { buttonVariants } from "@/components/ui/button";
// import assets from "@/config/assets.json";
// import { cn } from "@/lib/utils";
// import FadeIn from "@/registry/components/magicui/fade-in";
// import { motion } from "framer-motion";
// import { ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { useCallback, useEffect, useMemo, useState } from "react";

// export type Breakpoint = "xs" | "sm" | "md" | "lg";

// interface Breakpoints {
//   [key: string]: number;
// }

// const BREAKPOINTS: Breakpoints = {
//   xs: 640,
//   sm: 768,
//   md: 1024,
//   lg: 1280,
// };

// const useBreakpoint = (): Breakpoint => {
//   const [breakpoint, setBreakpoint] = useState<Breakpoint>("sm");

//   const getBreakpoint = useCallback((): Breakpoint => {
//     const width = window.innerWidth;
//     if (width < BREAKPOINTS.sm) {
//       return "xs";
//     } else if (width < BREAKPOINTS.md) {
//       return "sm";
//     } else if (width < BREAKPOINTS.lg) {
//       return "md";
//     } else {
//       return "lg";
//     }
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setBreakpoint(getBreakpoint());
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Call the function on page load

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [getBreakpoint]);

//   return breakpoint;
// };

// // export default useBreakpoint;

// const OFFSET_BY = 80;

// const ROWS: Record<Breakpoint, number> = {
//   xs: 4,
//   sm: 3,
//   md: 3,
//   lg: 3,
// };

// const COLUMNS: Record<Breakpoint, number> = {
//   xs: 5,
//   sm: 7,
//   md: 7,
//   lg: 7,
// };

// const SIZES: Record<Breakpoint, number> = {
//   xs: 64,
//   sm: 64,
//   md: 96,
//   lg: 96,
// };

// export default function Hero() {
//   const breakpoint: Breakpoint = useBreakpoint();
//   const [size, setSize] = useState(SIZES[breakpoint]);
//   const [totalColumns, setTotalColumns] = useState(COLUMNS[breakpoint]);
//   const [totalRows, setTotalRows] = useState(ROWS[breakpoint]);

//   const headshots = useMemo(() => {
//     const remainder = assets.headshots.length % totalColumns;
//     return remainder === 0
//       ? assets.headshots
//       : assets.headshots.slice(0, assets.headshots.length - remainder);
//   }, [totalColumns]);

//   useEffect(() => {
//     const handleResize = () => {
//       setTotalColumns(COLUMNS[breakpoint]);
//       setTotalRows(ROWS[breakpoint]);
//       setSize(SIZES[breakpoint]);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Call the function on page load

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [breakpoint]);

//   return (
//     <section id="hero">
//       <div className="relative h-full overflow-hidden py-14">
//         <div className="container flex flex-col ">
//           <div
//             style={
//               {
//                 "--size": `${size}px`,
//                 "--columns": `${totalColumns}`,
//                 "--rows": `${totalRows}`,
//               } as React.CSSProperties
//             }
//             className={cn(
//               "grid place-items-center justify-center",
//               {
//                 [`-mt-48 grid-cols-[repeat(var(--columns),var(--size))] grid-rows-[repeat(var(--rows),var(--size))] gap-2`]:
//                   totalColumns === COLUMNS.xs,
//               },
//               {
//                 [`md:-mt-20 md:grid-cols-[repeat(var(--columns),var(--size))] md:grid-rows-[repeat(var(--rows),var(--size))] md:gap-4`]:
//                   totalColumns === COLUMNS.sm ||
//                   totalColumns === COLUMNS.md ||
//                   totalColumns === COLUMNS.lg,
//               },
//             )}
//           >
//             {headshots.map((logo, idx) => {
//               const column = idx % totalColumns;
//               const row = Math.floor(idx / totalColumns);
//               const totalRows = Math.ceil(headshots.length / totalColumns);
//               const bottomMiddleColumn = Math.floor(totalColumns / 2);
//               const bottomMiddleRow = totalRows - 1;
//               const offset = -Math.abs(bottomMiddleColumn - column) * OFFSET_BY;

//               // Calculate delay based on distance from the bottom middle
//               const distanceFromBottomMiddle = Math.sqrt(
//                 Math.pow(bottomMiddleColumn - column, 2) +
//                   Math.pow(bottomMiddleRow - row, 2),
//               );

//               // Calculate maximum possible distance
//               const maxDistance = Math.sqrt(
//                 Math.pow(totalColumns - 1, 2) + Math.pow(totalRows - 1, 2),
//               );

//               // Invert the delay
//               const delay = (maxDistance - distanceFromBottomMiddle) * 0.15;

//               return (
//                 <motion.img
//                   key={idx}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     opacity: {
//                       delay,
//                       ease: [0.16, 1, 0.3, 1],
//                       duration: 1.7,
//                     },
//                     y: {
//                       delay,
//                       duration: 6.5,
//                       ease: [0.16, 1, 0.3, 1],
//                     },
//                   }}
//                   width={size}
//                   height={size}
//                   src={`/assets/headshots/${logo}`}
//                   style={
//                     {
//                       "--offset": `${offset}px`,
//                     } as React.CSSProperties
//                   }
//                   className={`mt-[var(--offset)] rounded-2xl shadow-2xl`}
//                   alt={`logo-${logo}`}
//                 />
//               );
//             })}
//           </div>

//           <div className="mt-20 grid grid-cols-1">
//             <div className="flex flex-col items-center gap-6 pb-8  text-center">
//               <FadeIn delay={0.1}>
//                 <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-7xl">
//                   Professional AI Headshots
//                 </h1>
//               </FadeIn>
//               <FadeIn delay={0.1}>
//                 <p className="text-sm leading-normal text-muted-foreground sm:text-xl">
//                   Generate AI headshots in minutes.
//                 </p>
//               </FadeIn>
//               <FadeIn delay={0.2} className="flex flex-col gap-4 lg:flex-row">
//                 <Link
//                   href="/login"
//                   className={cn(
//                     buttonVariants({
//                       size: "lg",
//                     }),
//                     "gap-2 whitespace-pre md:flex",
//                     "group relative w-full gap-1 overflow-hidden text-base font-semibold tracking-tighter",
//                     "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
//                   )}
//                 >
//                   Get Started
//                   <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
//                 </Link>
//               </FadeIn>
//               {/* <FadeIn delay={0.3}>
//               <JoinUsers />
//             </FadeIn> */}
//             </div>
//           </div>

//           <FadeIn delay={0.4} className="flex">
//             <video
//               autoPlay
//               loop
//               muted
//               src="demo.mp4"
//               className="mt-32 w-full rounded-lg border shadow-2xl"
//             />
//           </FadeIn>
//         </div>
//         {/* <CarouselVertical className="absolute right-20 top-0 hidden 2xl:block" />
//         <CarouselVertical className="absolute left-20 top-0 hidden 2xl:block" /> */}
//         {/* <CarouselHorizontal className="z-10 my-14" />
//         <Confetti className="absolute inset-x-0 bottom-0 -z-10 mx-auto size-[800px]" /> */}
//       </div>
//     </section>
//   );
// }
