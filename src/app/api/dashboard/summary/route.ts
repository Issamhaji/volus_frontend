import { NextResponse } from "next/server";
import { DASHBOARD_SUMMARY_FALLBACK } from "@/lib/dashboard-summary";

const FASTAPI_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://ec2-98-89-247-69.compute-1.amazonaws.com:8001/api").replace(/\/$/, "");

export async function GET() {
  try {
    const response = await fetch(`${FASTAPI_BASE_URL}/dashboard/stats`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`FastAPI responded with ${response.status}`);
    }

    const data = await response.json();
    
    // Transform API response to match dashboard summary structure
    const payload = {
      metrics: [
        { label: "Total products", value: (data.total_products || 0).toLocaleString(), delta: 11, trend: "up" as const },
        { label: "Trending count", value: String(data.trending_count || 0), delta: 3, trend: "up" as const },
        { label: "Top categories", value: String(data.top_categories?.length || 0), delta: 0, trend: "up" as const },
        { label: "Recent imports", value: String(data.recent_imports?.length || 0) },
      ],
      services: [
        { name: "FastAPI core", status: "healthy", latencyMs: 112 },
        { name: "Signal correlator", status: "healthy", latencyMs: 148 },
        { name: "Narrative generator", status: "healthy", latencyMs: 201 },
      ],
      alerts: data.top_categories?.slice(0, 2).map((cat: { name: string; count: number }) => ({
        title: `${cat.name} trending`,
        detail: `${cat.count} products tracked in this category.`,
        severity: "info" as const,
      })) || DASHBOARD_SUMMARY_FALLBACK.alerts,
      signals: data.recent_imports?.map((imp: { id: number; consolidated_at: string; total_records: number }) => ({
        channel: "Import",
        insight: `Import #${imp.id}: ${imp.total_records} records`,
        weight: "High",
        timestamp: imp.consolidated_at,
      })) || DASHBOARD_SUMMARY_FALLBACK.signals,
    };
    
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to fetch FastAPI dashboard summary", error);

    return NextResponse.json(
      {
        ...DASHBOARD_SUMMARY_FALLBACK,
        error: "fastapi-unavailable",
      },
      { status: 200 }
    );
  }
}
