import { NextResponse } from "next/server";
import { DASHBOARD_SUMMARY_FALLBACK } from "@/lib/dashboard-summary";

const FASTAPI_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://ec2-98-89-247-69.compute-1.amazonaws.com:8001/api").replace(/\/$/, "");

export async function GET() {
  try {
    const response = await fetch(`${FASTAPI_BASE_URL}/dashboard/summary`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`FastAPI responded with ${response.status}`);
    }

    const data = await response.json();

    // Backend now returns the exact structure we need
    const payload = data;

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
