"use client"

import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { Bar } from "recharts"
import type { barVariants } from "./chart-variants" // Import barVariants

import { cn } from "@/lib/utils"

import {
  type ChartConfig,
  ChartContext,
  ChartCrosshair,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart-components"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const id = `chart-${uniqueId}`
  return (
    <ChartContext.Provider value={{ config, id }}>
      <div
        data-chart={id}
        ref={ref}
        className={cn(
          "flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background font-sans text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartLoading = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-1 items-center justify-center text-muted-foreground", className)} {...props}>
    Loading...
  </div>
))
ChartLoading.displayName = "ChartLoading"

const ChartCrosshairContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid gap-1.5 text-xs",
        "pointer-events-none absolute z-50 rounded-md border bg-popover px-2 py-1.5 text-popover-foreground opacity-95",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
ChartCrosshairContent.displayName = "ChartCrosshairContent"

const ChartTooltipArrow = React.forwardRef<SVGSVGElement, React.ComponentProps<"svg">>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      width="16"
      height="10"
      viewBox="0 0 16 10"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute top-0 z-10 h-2 w-4 -translate-y-full", "fill-background stroke-border", className)}
      {...props}
    >
      <path d="M0 10 L8 2 L16 10 L0 10" />
    </svg>
  ),
)
ChartTooltipArrow.displayName = "ChartTooltipArrow"

const ChartTooltipRow = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    value: string | number
    name: string
    color: string
  }
>(({ className, value, name, color, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-between gap-2", className)} {...props}>
    <div className="flex items-center gap-2">
      <span
        className="flex h-3 w-3 shrink-0 rounded-full"
        style={{
          backgroundColor: color,
        }}
      />
      <p className="text-muted-foreground">{name}</p>
    </div>
    <p className="font-medium text-foreground">{value}</p>
  </div>
))
ChartTooltipRow.displayName = "ChartTooltipRow"

const ChartLegendRow = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    name: string
    color: string
    hideLabel?: boolean
  }
>(({ className, name, color, hideLabel, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
    <span
      className="flex h-3 w-3 shrink-0 rounded-full"
      style={{
        backgroundColor: color,
      }}
    />
    {!hideLabel && <p className="text-muted-foreground">{name}</p>}
  </div>
))
ChartLegendRow.displayName = "ChartLegendRow"

const ChartTooltipProvider = ChartTooltip

const ChartLegendProvider = ChartLegend

const ChartCrosshairProvider = ChartCrosshair

const ChartBar = React.forwardRef<
  React.ElementRef<typeof Bar>,
  React.ComponentPropsWithoutRef<typeof Bar> &
    VariantProps<typeof barVariants> & {
      active?: boolean
    }
>(({ active, className, ...props }, ref) => {
  const { config } = React.useContext(ChartContext)
  const chartConfig = config[props.dataKey as keyof typeof config]

  return (
    <Bar
      ref={ref}
      className={cn(active ? "fill-primary" : "fill-muted", "transition-all", className)}
      fill={chartConfig?.color}
      {...props}
    />
  )
})
ChartBar.displayName = "ChartBar"

const ChartActiveBar = React.forwardRef<
  React.ElementRef<typeof Bar>,
  React.ComponentPropsWithoutRef<typeof Bar> & VariantProps<typeof barVariants>
>(({ className, ...props }, ref) => {
  const { config } = React.useContext(ChartContext)
  const chartConfig = config[props.dataKey as keyof typeof config]

  return <Bar ref={ref} className={cn("fill-primary", className)} fill={chartConfig?.color} {...props} />
})
ChartActiveBar.displayName = "ChartActiveBar"

const ChartGradient = React.forwardRef<
  SVGStopElement,
  React.ComponentPropsWithoutRef<"stop"> & {
    id: string
    color: string
    from: string
    to: string
  }
>(({ id, color, from, to, ...props }, ref) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="100%" {...props}>
    <stop offset="0%" stopColor={from} />
    <stop offset="100%" stopColor={to} />
  </linearGradient>
))
ChartGradient.displayName = "ChartGradient"

const ChartGradientProvider = React.forwardRef<
  SVGDefsElement,
  React.ComponentPropsWithoutRef<"defs"> & {
    children: React.ReactNode
  }
>(({ children, ...props }, ref) => (
  <defs ref={ref} {...props}>
    {children}
  </defs>
))
ChartGradientProvider.displayName = "ChartGradientProvider"

const ChartAxis = React.forwardRef<
  SVGGElement,
  React.ComponentPropsWithoutRef<"g"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <g
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground [&_.recharts-cartesian-axis-tick-value]:fill-muted-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </g>
))
ChartAxis.displayName = "ChartAxis"

const ChartGrid = React.forwardRef<
  SVGGElement,
  React.ComponentPropsWithoutRef<"g"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <g
    ref={ref}
    className={cn("stroke-border stroke-dashed [&_.recharts-cartesian-grid-vertical]:opacity-0", className)}
    {...props}
  >
    {children}
  </g>
))
ChartGrid.displayName = "ChartGrid"

const ChartLine = React.forwardRef<
  SVGCircleElement,
  React.ComponentPropsWithoutRef<"circle"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <circle ref={ref} className={cn("stroke-primary fill-background", className)} {...props}>
    {children}
  </circle>
))
ChartLine.displayName = "ChartLine"

const ChartDot = React.forwardRef<
  SVGCircleElement,
  React.ComponentPropsWithoutRef<"circle"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <circle ref={ref} className={cn("stroke-primary fill-background", className)} {...props}>
    {children}
  </circle>
))
ChartDot.displayName = "ChartDot"

const ChartArea = React.forwardRef<
  SVGPathElement,
  React.ComponentPropsWithoutRef<"path"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <path ref={ref} className={cn("fill-primary/20 stroke-primary", className)} {...props}>
    {children}
  </path>
))
ChartArea.displayName = "ChartArea"

const ChartPolarGrid = React.forwardRef<
  SVGGElement,
  React.ComponentPropsWithoutRef<"g"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <g ref={ref} className={cn("stroke-border [&_.recharts-polar-grid-angle]:opacity-0", className)} {...props}>
    {children}
  </g>
))
ChartPolarGrid.displayName = "ChartPolarGrid"

const ChartRadialBar = React.forwardRef<
  SVGCircleElement,
  React.ComponentPropsWithoutRef<"circle"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <circle ref={ref} className={cn("fill-primary", className)} {...props}>
    {children}
  </circle>
))
ChartRadialBar.displayName = "ChartRadialBar"

const ChartPie = React.forwardRef<
  SVGCircleElement,
  React.ComponentPropsWithoutRef<"circle"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <circle ref={ref} className={cn("fill-primary", className)} {...props}>
    {children}
  </circle>
))
ChartPie.displayName = "ChartPie"

const ChartRadar = React.forwardRef<
  SVGPathElement,
  React.ComponentPropsWithoutRef<"path"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <path ref={ref} className={cn("fill-primary/20 stroke-primary", className)} {...props}>
    {children}
  </path>
))
ChartRadar.displayName = "ChartRadar"

const ChartScatter = React.forwardRef<
  SVGCircleElement,
  React.ComponentPropsWithoutRef<"circle"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <circle ref={ref} className={cn("fill-primary", className)} {...props}>
    {children}
  </circle>
))
ChartScatter.displayName = "ChartScatter"

const ChartSparkline = React.forwardRef<
  SVGPathElement,
  React.ComponentPropsWithoutRef<"path"> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <path ref={ref} className={cn("stroke-primary", className)} {...props}>
    {children}
  </path>
))
ChartSparkline.displayName = "ChartSparkline"

const ChartTooltipTrigger = ChartTooltipContent

const ChartLegendTrigger = ChartLegendContent

export {
  ChartContainer,
  ChartLoading,
  ChartCrosshairContent,
  ChartTooltipArrow,
  ChartTooltipRow,
  ChartLegendRow,
  ChartTooltipProvider,
  ChartLegendProvider,
  ChartCrosshairProvider,
  ChartBar,
  ChartActiveBar,
  ChartGradient,
  ChartGradientProvider,
  ChartAxis,
  ChartGrid,
  ChartLine,
  ChartDot,
  ChartArea,
  ChartPolarGrid,
  ChartRadialBar,
  ChartPie,
  ChartRadar,
  ChartScatter,
  ChartSparkline,
  ChartTooltipTrigger,
  ChartLegendTrigger,
}
