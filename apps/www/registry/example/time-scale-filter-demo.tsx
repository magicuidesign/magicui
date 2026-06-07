"use client"

import { useMemo, useState } from "react"
import { Calendar, CheckSquare, CloudMoon, TrendingUp } from "lucide-react"

import TimeScaleFilter from "@/registry/magicui/time-scale-filter"

const today = new Date()

const getDate = (offset: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() + offset)
  return d.toLocaleDateString("en-CA")
}

const data = [
  {
    id: 1,
    type: "weather",
    createdAt: getDate(0),
  },
  {
    id: 2,
    type: "tasks",
    createdAt: getDate(0),
  },
  {
    id: 3,
    type: "events",
    createdAt: getDate(0),
  },
  {
    id: 4,
    type: "analytics",
    createdAt: getDate(-1),
  },
  {
    id: 5,
    type: "tasks",
    createdAt: getDate(1),
  },
  {
    id: 6,
    type: "weather",
    createdAt: getDate(2),
  },
]

function WidgetCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[32px] border border-zinc-200/70 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] dark:border-zinc-800 dark:bg-zinc-900">
      {children}
    </div>
  )
}

export default function TimeScaleFilterDemo() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  )

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        new Date(item.createdAt).toLocaleDateString("en-CA") === selectedDate
    )
  }, [selectedDate])

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <TimeScaleFilter value={selectedDate} onValueChange={setSelectedDate} />

      {/* Summary */}
      <div className="flex items-center justify-between rounded-3xl border border-zinc-200/70 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <p className="text-xs font-medium tracking-[0.25em] text-zinc-500 uppercase">
            Selected Date
          </p>

          <h3 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">
            {filteredData.length}
          </p>

          <p className="text-sm text-zinc-500">Filtered Items</p>
        </div>
      </div>

      {/* Widgets */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item) => {
          switch (item.type) {
            case "weather":
              return (
                <WidgetCard key={item.id}>
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="mb-6 rounded-3xl bg-violet-100 p-6 dark:bg-violet-950">
                      <CloudMoon className="h-14 w-14 text-violet-600" />
                    </div>

                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
                      Cloudy 25°
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      Perfect weather for productivity
                    </p>
                  </div>
                </WidgetCard>
              )

            case "tasks":
              return (
                <WidgetCard key={item.id}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-2xl bg-orange-100 p-3 dark:bg-orange-950">
                      <CheckSquare className="h-6 w-6 text-orange-600" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
                        9
                      </h3>

                      <p className="text-sm text-zinc-500">
                        Today&apos;s Tasks
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Clean Workspace",
                      "Financial Report",
                      "Launch Campaign",
                    ].map((task) => (
                      <div
                        key={task}
                        className="flex items-center gap-3 border-b border-zinc-100 pb-3 dark:border-zinc-800"
                      >
                        <div className="h-2.5 w-2.5 rounded-full bg-orange-400" />

                        <span className="text-zinc-700 dark:text-zinc-300">
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </WidgetCard>
              )

            case "events":
              return (
                <WidgetCard key={item.id}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-2xl bg-red-100 p-3 dark:bg-red-950">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
                        3
                      </h3>

                      <p className="text-sm text-zinc-500">
                        Today&apos;s Events
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex gap-3">
                      <div className="w-1 rounded-full bg-red-500" />

                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          Morning Sync
                        </p>

                        <p className="text-sm text-zinc-500">07:00 – 08:00</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-1 rounded-full bg-emerald-500" />

                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          Focus Session
                        </p>

                        <p className="text-sm text-zinc-500">09:00 – 10:00</p>
                      </div>
                    </div>
                  </div>
                </WidgetCard>
              )

            case "analytics":
              return (
                <WidgetCard key={item.id}>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-950">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
                        +28%
                      </h3>

                      <p className="text-sm text-zinc-500">Weekly Growth</p>
                    </div>
                  </div>

                  <div className="h-24 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10" />
                </WidgetCard>
              )

            default:
              return null
          }
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="rounded-[32px] border border-dashed border-zinc-200 py-20 text-center dark:border-zinc-800">
          <p className="text-zinc-500">No records available for this date.</p>
        </div>
      )}
    </div>
  )
}
