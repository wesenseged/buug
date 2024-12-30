import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Skeleton } from "../ui/skeleton"
import { ErrorPage } from "@/lib/error"
import useMainStore from "@/store/mainStore"


interface Chart {
  date:string,
  completed: number,
  uncompleted: number
}


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  completed: {
    label: "completed",
    color: "hsl(var(--chart-1))",
  },
  uncompleted: {
    label: "uncompleted",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function LineChart() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const mainStore = useMainStore()

  const {data ,isLoading,error} = useQuery({
    queryFn: async() => {
    const res= await api.chart.$get()
    const data = await res.json()
    return data
    },
    queryKey: ['get-chart']
  })



  const filteredData =data&& data.filter((item:Chart) => {
    const date = new Date(item.date)
    const referenceDate = new Date().toDateString()


    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  if(isLoading) {
    return (
      <div>
        <Skeleton className="w-10/12 h-5/6"/>
      </div>
    )
  }

  if(error) {
    return <ErrorPage />
  }


  return (
    <Card className="">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{mainStore.toggleLanguage ? "Area Chart - Interactive":"ግራፍ"}</CardTitle>
          <CardDescription>
          {mainStore.toggleLanguage ?"Showing total visitors for the last 3 months":"ላለፉት 3 ወራት አጠቃላይ ጎብኝዎችን በማሳየት ላይ"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              
            {mainStore.toggleLanguage ? "Last 3 months":"ያለፉት 3 ወራት"}
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
            {mainStore.toggleLanguage ? "Last 30 days":"ያለፉት 30 ቀናት"}
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
            {mainStore.toggleLanguage ? "Last 7 days":"ያለፉት 7 ቀናት"}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[750px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillUncompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-uncompleted)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-uncompleted)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="uncompleted"
              type="natural"
              fill="url(#fillUncompleted)"
              stroke="var(--color-uncompleted)"
              stackId="a"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

