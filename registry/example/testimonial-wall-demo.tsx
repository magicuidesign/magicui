"use client";

import { TestimonialWall } from "@/registry/magicui/testimonial-wall";
import { Users } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "The new particle system is a game-changer. Our spells have never looked so magical and alive. Truly next-level stuff.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Luna`,
    name: "Luna",
    role: "VFX Sorcerer",
  },
  {
    text: "I was able to design the entire world map in a week. The procedural generation tools are intuitive and incredibly powerful.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Orion`,
    name: "Orion",
    role: "Lead Worldbuilder",
  },
  {
    text: "Character rigging used to be a nightmare. Now it's a breeze. The animation blending is seamless. More time for coffee!",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Elara`,
    name: "Elara",
    role: "3D Animator",
  },
  {
    text: "The audio engine's spatial awareness is incredible. Crafting the soundscape for the Whispering Woods was an absolute joy.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Jasper`,
    name: "Jasper",
    role: "Sound Designer",
  },
  {
    text: "Our game's narrative has so many branching paths. The dialogue tree manager kept everything organized and easy to track.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Faye`,
    name: "Faye",
    role: "Narrative Director",
  },
  {
    text: "Quest scripting is so much faster now. The visual editor lets me link triggers and events without writing a single line of code.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Caleb`,
    name: "Caleb",
    role: "Quest Designer",
  },
  {
    text: "The asset pipeline integration is flawless. I can push my textures from Painter straight into the engine with one click.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Seraphina`,
    name: "Seraphina",
    role: "Texture Artist",
  },
  {
    text: "Performance profiling is built-in and super detailed. We squashed so many performance bugs before they even became an issue.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Ronan`,
    name: "Ronan",
    role: "Engine Programmer",
  },
  {
    text: "As a concept artist, seeing my 2D sketches come to life so quickly is inspiring. The prototyping tools are top-notch.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Iris`,
    name: "Iris",
    role: "Concept Artist",
  },
  {
    text: "The lighting engine handles dynamic day/night cycles beautifully. The volumetric fog adds so much atmosphere.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Silas`,
    name: "Silas",
    role: "Lighting Artist",
  },
  {
    text: "Our game's UI was complex, but the UI builder made it manageable. The state management is clean and responsive.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Ivy`,
    name: "Ivy",
    role: "UI/UX Designer",
  },
  {
    text: "The multiplayer netcode is rock solid. We've had 64-player stress tests with zero issues. Impressive stuff.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=Axel`,
    name: "Axel",
    role: "Network Engineer",
  },
];

const firstColumn = testimonials.slice(0, 6);
const secondColumn = testimonials.slice(6, 12);

const FADE_UP_ANIMATION = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const SCALE_IN_ANIMATION = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", mass: 0.8, damping: 15 },
  },
};

export function TestimonialWallDemoFinal() {
  return (
    <section className="relative mt-10 mb-20">
      <div className="container z-10 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
        >
          <motion.div
            variants={SCALE_IN_ANIMATION}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-800/20 dark:text-blue-200"
          >
            <Users className="h-4 w-4" />
            From Our Community
          </motion.div>

          <motion.h2
            variants={FADE_UP_ANIMATION}
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            Voices from the Dev Guild
          </motion.h2>
          <motion.p
            variants={FADE_UP_ANIMATION}
            className="mt-4 text-muted-foreground sm:text-lg text-balance"
          >
            See how our tools are empowering creators to build the next
            generation of games.
          </motion.p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialWall testimonials={firstColumn} duration={30} />
          <TestimonialWall
            testimonials={secondColumn}
            className="hidden md:block"
            duration={25}
          />
        </div>
      </div>
    </section>
  );
}
