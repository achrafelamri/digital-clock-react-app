"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon, Volume2Icon, VolumeXIcon } from "lucide-react"
 

/**
 * Interface for time state management
 */
interface TimeState {
  hours: number
  minutes: number
  seconds: number
  date: number
  month: number
  year: number
  dayOfWeek: number
}

/**
 * Professional Digital Clock Component
 *
 * Features:
 * - Real-time clock updates every second
 * - Toggle between 12-hour and 24-hour formats
 * - AM/PM indicators for 12-hour format
 * - Date display with toggle option
 * - Leading zeros for consistent formatting
 * - Smooth fade-in animation on mount
 * - Optimized performance with proper cleanup
 * - Responsive design for all screen sizes
 */
export function DigitalClock() {
  const [time, setTime] = useState<TimeState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: 0,
    month: 0,
    year: 0,
    dayOfWeek: 0,
  })
  const [is24Hour, setIs24Hour] = useState<boolean>(false)
  const [showDate, setShowDate] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const lastPlayedSecondRef = useRef<number | null>(null)
  const tikToggleRef = useRef<boolean>(false)

  /**
   * Updates the current time state
   * Memoized to prevent unnecessary re-creations
   */
  const updateTime = useCallback(() => {
    const now = new Date()
    setTime({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      date: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      dayOfWeek: now.getDay(),
    })
  }, [])

  /**
   * Initialize clock and set up interval for updates
   * Cleanup interval on component unmount to prevent memory leaks
   */
  useEffect(() => {
    // Set initial time immediately
    updateTime()
    setMounted(true)

    // Update time every second
    const intervalId = setInterval(updateTime, 1000)

    // Cleanup function to clear interval
    return () => clearInterval(intervalId)
  }, [updateTime])

  // Create/resume audio context on demand (first user toggle)
  const ensureAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!Ctx) return null
    const ctx = new Ctx()
    audioContextRef.current = ctx
    return ctx
  }, [])

  // Softer, smoother "tik/tak" using sine blips with gentle envelope
  const playSoftTick = useCallback(() => {
    const ctx = ensureAudioContext()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Alternate pitch to mimic tik/tak (brighter contrast)
    tikToggleRef.current = !tikToggleRef.current
    const frequency = tikToggleRef.current ? 1200 : 700
    osc.type = "sine"
    osc.frequency.setValueAtTime(frequency, now)

    // Very soft short envelope (no harsh click)
    const peak = 0.02 // overall loudness
    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(peak, now + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.14)
  }, [ensureAudioContext])

  // Trigger each new second when enabled
  useEffect(() => {
    if (!soundEnabled) return
    if (lastPlayedSecondRef.current === time.seconds) return
    lastPlayedSecondRef.current = time.seconds
    playSoftTick()
  }, [time.seconds, soundEnabled, playSoftTick])

  // No sound feature – removed by user preference

  /**
   * Formats a number with leading zero if needed
   * @param num - Number to format
   * @returns Formatted string with leading zero
   */
  const formatWithLeadingZero = (num: number): string => {
    return num.toString().padStart(2, "0")
  }

  /**
   * Converts 24-hour format to 12-hour format
   * @param hours - Hours in 24-hour format
   * @returns Hours in 12-hour format (1-12)
   */
  const convertTo12Hour = (hours: number): number => {
    if (hours === 0) return 12
    if (hours > 12) return hours - 12
    return hours
  }

  /**
   * Determines AM or PM based on hours
   * @param hours - Hours in 24-hour format
   * @returns 'AM' or 'PM'
   */
  const getPeriod = (hours: number): string => {
    return hours >= 12 ? "PM" : "AM"
  }

  /**
   * Gets the day name from day index
   * @param dayIndex - Day index (0-6, Sunday-Saturday)
   * @returns Day name
   */
  const getDayName = (dayIndex: number): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[dayIndex]
  }

  /**
   * Gets the month name from month index
   * @param monthIndex - Month index (0-11, January-December)
   * @returns Month name
   */
  const getMonthName = (monthIndex: number): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return months[monthIndex]
  }

  // Calculate display values
  const displayHours = is24Hour ? time.hours : convertTo12Hour(time.hours)
  const formattedHours = formatWithLeadingZero(displayHours)
  const formattedMinutes = formatWithLeadingZero(time.minutes)
  const formattedSeconds = formatWithLeadingZero(time.seconds)
  const period = getPeriod(time.hours)

  /**
   * Toggles between 12-hour and 24-hour format
   */
  const toggleFormat = () => {
    setIs24Hour((prev) => !prev)
  }

  /**
   * Toggles date visibility
   */
  const toggleDateVisibility = () => {
    setShowDate((prev) => !prev)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card
        className={`w-full max-w-2xl overflow-hidden border-border/50 bg-card shadow-2xl transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="p-5 sm:p-8 md:p-10 lg:p-12">
          {/* Header */}
          <div className="mb-3 text-center sm:mb-4">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-xl font-semibold tracking-wide text-foreground sm:text-2xl md:text-3xl">
                ElvmriPulse
              </h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="border-border/50"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {/* Render both icons to avoid SSR/CSR mismatch; CSS hides one based on theme */}
                <SunIcon className="size-4 hidden dark:inline-block" />
                <MoonIcon className="size-4 inline-block dark:hidden" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const next = !soundEnabled
                  setSoundEnabled(next)
                  if (next) ensureAudioContext()?.resume()
                }}
                className="border-border/50"
                aria-label={soundEnabled ? "Mute tick sound" : "Enable tick sound"}
                title={soundEnabled ? "Sound on" : "Sound off"}
              >
                {soundEnabled ? (
                  <Volume2Icon className="size-4" />
                ) : (
                  <VolumeXIcon className="size-4" />
                )}
              </Button>
            </div>
            <p className="mt-1 text-base font-light tracking-wide text-muted-foreground sm:text-lg md:text-xl">
              Current Time
            </p>
          </div>

          {/* Clock Display */}
          <div className="mb-4 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 sm:mb-6">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <span className="font-mono text-4xl font-light tabular-nums text-foreground transition-all duration-300 sm:text-6xl md:text-7xl lg:text-8xl">
                  {formattedHours}
                </span>
              </div>
              <span className="mt-1 text-[10px] font-light tracking-widest text-muted-foreground sm:mt-2 sm:text-xs md:text-sm">
                HOURS
              </span>
            </div>

            {/* Separator */}
            <span className="font-mono text-4xl font-light text-primary/60 sm:text-6xl md:text-7xl lg:text-8xl">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <span className="font-mono text-4xl font-light tabular-nums text-foreground transition-all duration-300 sm:text-6xl md:text-7xl lg:text-8xl">
                  {formattedMinutes}
                </span>
              </div>
              <span className="mt-1 text-[10px] font-light tracking-widest text-muted-foreground sm:mt-2 sm:text-xs md:text-sm">
                MINUTES
              </span>
            </div>

            {/* Separator */}
            <span className="font-mono text-4xl font-light text-primary/60 sm:text-6xl md:text-7xl lg:text-8xl">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <span className="font-mono text-4xl font-light tabular-nums text-foreground transition-all duration-300 sm:text-6xl md:text-7xl lg:text-8xl">
                  {formattedSeconds}
                </span>
              </div>
              <span className="mt-1 text-[10px] font-light tracking-widest text-muted-foreground sm:mt-2 sm:text-xs md:text-sm">
                SECONDS
              </span>
            </div>

            {/* AM/PM Indicator (only shown in 12-hour format) */}
            {!is24Hour && (
              <div className="ml-1 flex flex-col items-start justify-center sm:ml-2 md:ml-4">
                <span className="font-mono text-xl font-light text-accent sm:text-2xl md:text-3xl lg:text-4xl">
                  {period}
                </span>
              </div>
            )}
          </div>

          {/* Date Display */}
          {showDate && (
            <div className="mb-6 text-center transition-all duration-500 sm:mb-8">
              <div className="flex flex-col items-center gap-1">
                <p className="text-xl font-light text-foreground sm:text-2xl md:text-3xl">
                  {getDayName(time.dayOfWeek)}
                </p>
                <p className="text-base font-light text-muted-foreground sm:text-lg md:text-xl">
                  {getMonthName(time.month)} {time.date}, {time.year}
                </p>
              </div>
            </div>
          )}

          {/* Format Toggle */}
          <div className="flex flex-col items-center gap-4">
            <div className="h-px w-24 bg-border" />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={toggleFormat}
                variant="outline"
                size="lg"
                className="group relative overflow-hidden border-border/50 bg-secondary/30 px-6 py-5 text-sm font-light tracking-wide text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary sm:py-6"
              >
                <span className="relative z-10">{is24Hour ? "12-Hour" : "24-Hour"}</span>
              </Button>
              <Button
                onClick={toggleDateVisibility}
                variant="outline"
                size="lg"
                className="group relative overflow-hidden border-border/50 bg-secondary/30 px-6 py-5 text-sm font-light tracking-wide text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary sm:py-6"
              >
                <span className="relative z-10">{showDate ? "Hide Date" : "Show Date"}</span>
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              {is24Hour ? "24-hour" : "12-hour"} format • Date {showDate ? "visible" : "hidden"}
            </p>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Footer */}
        <div className="p-4 text-center border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Developed by <span className="font-medium text-foreground">Achraf Elamri</span>
          </p>
        </div>
      </Card>
    </div>
  )
}
