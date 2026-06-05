import { Suspense, lazy, useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KPIRow } from "@/components/dashboard/kpi-row";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type ActiveClientsDataPoint,
  type FinancialMovement,
  type KPIMetrics,
  type MonthlyDataPoint,
} from "@/lib/financial-types";
import {
  computeEstimatedActiveClients,
  computeKPIs,
  computeMonthlyData,
} from "@/lib/financial-utils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const IncomeOutcomeChart = lazy(async () => {
  const module = await import("@/components/dashboard/income-outcome-chart");
  return { default: module.IncomeOutcomeChart };
});
const ProfitPercentChart = lazy(async () => {
  const module = await import("@/components/dashboard/profit-percent-chart");
  return { default: module.ProfitPercentChart };
});
const ActiveClientsChart = lazy(async () => {
  const module = await import("@/components/dashboard/active-clients-chart");
  return { default: module.ActiveClientsChart };
});

async function fetchFinancialData(
  signal?: AbortSignal,
): Promise<FinancialMovement[]> {
  const response = await fetch(`${API_BASE_URL}/api/metrics`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch financial data: ${response.status}`);
  }
  return response.json();
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

function ChartLoadingCard() {
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
  );
}

function App() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [activeClientsData, setActiveClientsData] = useState<
    ActiveClientsDataPoint[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchFinancialData(controller.signal)
      .then((movements) => {
        setMetrics(computeKPIs(movements));
        setMonthlyData(computeMonthlyData(movements));
        setActiveClientsData(computeEstimatedActiveClients(movements));
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return;
        }

        setError(
          "No se pudo cargar la informacion financiera. Revisa la API de backend.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader period="2024 - Full Year" />

          {error ? (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
            >
              {error}
            </div>
          ) : null}

          <section aria-label="Key performance indicators">
            <KPIRow metrics={metrics} loading={loading} />
          </section>

          <section
            aria-label="Financial charts"
            className="grid grid-cols-1 gap-4 xl:grid-cols-3"
          >
            <Suspense fallback={<ChartLoadingCard />}>
              <IncomeOutcomeChart data={monthlyData} loading={loading} />
            </Suspense>
            <Suspense fallback={<ChartLoadingCard />}>
              <ProfitPercentChart data={monthlyData} loading={loading} />
            </Suspense>
            <Suspense fallback={<ChartLoadingCard />}>
              <ActiveClientsChart
                data={activeClientsData}
                loading={loading}
              />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
