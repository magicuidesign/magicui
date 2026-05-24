"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bot,
  Brain,
  BrainCircuit,
  CheckCircle2,
  Circle,
  Cpu,
  Database,
  Globe,
  LoaderCircle,
  Lock,
  Mic,
  Zap,
} from "lucide-react"

const items = [
  {
    icon: Zap,
    label: "2D/3D Annotation",
    title: "Data Annotation",
    description:
      "Multimodal workflows for image, video, and 3D annotation with high-accuracy quality control.",

    video:
      "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622196/new107_qhrklf.mp4",

    card: {
      heading: "Data Annotation",
      badge: "Live",
      goal: "Deploy multimodal AI data pipelines across multiple international regions.",

      tasks: [
        {
          title: "Regional onboarding",
          meta: "Completed in 4.2s",
          status: "completed",
        },
        {
          title: "Deploy collection teams",
          meta: "Completed in 8.1s",
          status: "completed",
        },
        {
          title: "Scale infrastructure",
          meta: "In progress... 18s",
          status: "progress",
        },
        {
          title: "Validate datasets",
          meta: "Pending",
          status: "pending",
        },
      ],
    },
  },

  {
    icon: Lock,
    label: "Data Collection",
    title: "Data Collection",
    description:
      "High-speed multimodal data collection pipelines to capture and structure real-world datasets.",

    video:
      "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779621768/new105_meaomd.mp4",

    card: {
      heading: "Data Collection",
      badge: "Data-Ready",
      goal: "Prepare large-scale datasets for training multimodal reasoning systems.",

      tasks: [
        {
          title: "Process raw data",
          meta: "Completed in 3.1s",
          status: "completed",
        },
        {
          title: "Generate annotations",
          meta: "Completed in 5.4s",
          status: "completed",
        },
        {
          title: "Train reasoning model",
          meta: "In progress... 24s",
          status: "progress",
        },
        {
          title: "Run evaluation tests",
          meta: "Pending",
          status: "pending",
        },
      ],
    },
  },

  {
    icon: Mic,
    label: "Audio and Speech",
    title: "Audio and Speech",
    description:
      "Automation-first AI systems with human validation and scalable workflows.",

    video:
      "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622220/new108_k1a47m.mp4",

    card: {
      heading: "Audio Transcription",
      badge: "Auto-generated",
      goal: "Build a REST API endpoint for user authentication with JWT tokens.",

      tasks: [
        {
          title: "Gather requirements",
          meta: "Completed in 2.3s",
          status: "completed",
        },
        {
          title: "Research solutions",
          meta: "Completed in 5.1s",
          status: "completed",
        },
        {
          title: "Implement solution",
          meta: "In progress... 12s",
          status: "progress",
        },
        {
          title: "Test and validate",
          meta: "Pending",
          status: "pending",
        },
      ],
    },
  },

  {
    icon: Database,
    label: "Explainable AI",
    title: "Data Engine",
    description:
      "Transparent AI models with interpretable predictions and decision-making insights.",

    video:
      "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622271/02_u2efg7.mp4",

    card: {
      heading: "Pipeline Engine",
      badge: "Optimized",
      goal: "Process and validate multimodal datasets for enterprise deployment.",

      tasks: [
        {
          title: "Upload raw datasets",
          meta: "Completed in 1.9s",
          status: "completed",
        },
        {
          title: "Run QA workflows",
          meta: "Completed in 6.7s",
          status: "completed",
        },
        {
          title: "Generate metadata",
          meta: "In progress... 16s",
          status: "progress",
        },
        {
          title: "Export training package",
          meta: "Pending",
          status: "pending",
        },
      ],
    },
  },
]

function TabMenu({
  activeTab,
  onSelect,
  className,
}: {
  activeTab: number
  onSelect: (index: number) => void
  className?: string
}) {
  return (
    <div
      className={`w-full max-w-[280px] rounded-[28px] border border-[#e8e8e8] bg-white p-3 shadow-xl sm:max-w-[240px] ${className ?? ""}`}
    >
      <div className="flex flex-col gap-2">
        {items.map((tab, index) => {
          const Icon = tab.icon

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => onSelect(index)}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                activeTab === index
                  ? "border-[#266347] bg-[#f4fbf7]"
                  : "border-transparent hover:border-[#266347] hover:bg-[#f8fffb]"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
                  activeTab === index
                    ? "text-[#266347]"
                    : "text-[#131313] group-hover:text-[#266347]"
                }`}
              />

              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeTab === index
                    ? "text-[#266347]"
                    : "text-[#131313] group-hover:text-[#266347]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function ClippedImageSection() {
  const [activeTab, setActiveTab] = useState(0)

  const activeItem = items[activeTab]

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6">
        {/* TOP */}
        <div className="pt-12 pb-8 md:pt-20 md:pb-10">
          <div className="grid items-start gap-8 md:grid-cols-2 md:gap-14">
            {/* LEFT */}
            <div>
              <h2 className="max-w-[500px] text-4xl font-bold tracking-tight text-[#131313] md:text-6xl md:leading-[1.1]">
                Our Platforms
              </h2>
            </div>

            {/* RIGHT */}
            <div>
              <p className="max-w-lg text-base leading-relaxed text-[#666] md:text-lg md:leading-8">
                Crafted for magicUI. A cinematic interface for modern digital
                products — designed and developed by Sameer.
              </p>
            </div>
          </div>
        </div>

        {/* TABS — in flow on mobile */}
        <div className="relative z-20 mb-4 md:hidden">
          <TabMenu activeTab={activeTab} onSelect={setActiveTab} />
        </div>

        {/* MEDIA AREA */}
        <div className="relative w-full pb-8 md:pb-12">
          {/* TABS — overlay on desktop */}
          <div className="absolute bottom-4 left-4 z-20 hidden md:bottom-10 md:left-10 md:block">
            <TabMenu activeTab={activeTab} onSelect={setActiveTab} />
          </div>

          {/* VIDEO CONTAINER */}
          <div className="relative aspect-[16/9] min-h-[500px] w-full overflow-hidden md:[clip-path:polygon(0_0,92%_0,100%_12%,100%_100%,30%_100%,22%_88%,0_88%)]">
            {/* VIDEO */}
            <AnimatePresence mode="wait">
              <motion.video
                key={activeItem.video}
                src={activeItem.video}
                autoPlay
                muted
                loop
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/10" />

            {/* CENTER CARD */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.card.heading}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-[320px] rounded-[26px] border border-white/30 bg-white/80 p-5 shadow-2xl backdrop-blur-xl"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-semibold text-[#131313]">
                      {activeItem.card.heading}
                    </h3>

                    <span className="rounded-md bg-[#eef8f2] px-2 py-1 text-[11px] text-[#266347]">
                      {activeItem.card.badge}
                    </span>
                  </div>

                  {/* GOAL */}
                  <div className="mt-4 rounded-xl border border-[#e7e7e7] p-3">
                    <p className="text-[11px] text-[#777]">Goal</p>

                    <p className="mt-1 text-[13px] leading-[20px] text-[#131313]">
                      {activeItem.card.goal}
                    </p>
                  </div>

                  {/* TASKS */}
                  <div className="mt-4 flex flex-col gap-3">
                    {activeItem.card.tasks.map((task, index) => (
                      <div key={index} className="flex items-start gap-2">
                        {/* ICON */}
                        <div className="mt-[2px]">
                          {task.status === "completed" && (
                            <CheckCircle2 className="h-4 w-4 text-[#266347]" />
                          )}

                          {task.status === "progress" && (
                            <LoaderCircle className="h-4 w-4 text-[#266347]" />
                          )}

                          {task.status === "pending" && (
                            <Circle className="h-4 w-4 text-[#bdbdbd]" />
                          )}
                        </div>

                        {/* CONTENT */}
                        <div>
                          <p
                            className={`text-[13px] ${
                              task.status === "completed"
                                ? "text-[#666] line-through"
                                : task.status === "progress"
                                  ? "font-medium text-[#266347]"
                                  : "text-[#999]"
                            } `}
                          >
                            {task.title}
                          </p>

                          <p className="text-[11px] text-[#999]">{task.meta}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="mt-5 flex items-center justify-between text-[11px] text-[#888]">
                    <span>2/5 tasks complete</span>

                    <span>Est. 45s remaining</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
