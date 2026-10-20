import type { Metric } from "@/content/types";

export function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString("es-CO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatMetric(metric: Metric) {
  return `${metric.prefix ?? ""}${formatNumber(metric.value, metric.decimals)}${metric.suffix ?? ""}`;
}

export function hostname(url: string) {
  try {
    return decodeURIComponent(new URL(url).hostname.replace(/^www\./, ""));
  } catch {
    return url;
  }
}
