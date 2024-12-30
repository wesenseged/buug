// Tanstack router
import { createFileRoute } from "@tanstack/react-router";
// line and radar charts
import { LineChart } from "@/components/chart/line-chart";

export function Component() {
  return (
    <section className="h-screen">
      <LineChart />
    </section>
  );
}

export const Route = createFileRoute("/_authenticated/progress")({
  component: Component,
});
