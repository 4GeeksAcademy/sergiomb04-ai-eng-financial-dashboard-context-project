import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { type ActiveClientsDataPoint } from '@/lib/financial-types'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface ActiveClientsChartProps {
  data: ActiveClientsDataPoint[]
  loading?: boolean
}

interface TooltipPayload {
  name: string
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const value = payload[0]?.value ?? 0

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-lg text-sm">
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: 'var(--chart-clients)' }}
        />
        <span className="text-muted-foreground">Estimated active clients:</span>
        <span className="ml-auto pl-4 font-medium text-foreground">{value}</span>
      </div>
    </div>
  )
}

export function ActiveClientsChart({ data, loading }: ActiveClientsChartProps) {
  if (loading) {
    return (
      <Card className="border-border/60">
        <CardHeader className="pb-4">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="mt-1 h-3 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[280px] w-full rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  const hasData = data.some((point) => point.activeClients > 0)

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Active Clients (Estimated)</CardTitle>
        <CardDescription>
          Monthly trend estimated from unique income activity groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div
            role="status"
            aria-live="polite"
            className="flex h-[280px] items-center justify-center text-sm text-muted-foreground"
          >
            No data available to display
          </div>
        ) : (
          <div
            role="img"
            aria-label="Area chart showing estimated active clients per month"
            className="h-[280px] w-full"
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="activeClientsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-clients)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--chart-clients)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.6} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="activeClients"
                  name="activeClients"
                  stroke="var(--chart-clients)"
                  strokeWidth={2}
                  fill="url(#activeClientsFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
