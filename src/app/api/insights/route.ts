import { NextRequest, NextResponse } from "next/server";

const DEFAULT_DASHBOARD_SERVICE_URL = "http://ec2-98-89-247-69.compute-1.amazonaws.com:8001/api";
const DASHBOARD_SERVICE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  DEFAULT_DASHBOARD_SERVICE_URL);

const RELATED_KEYS = [
  "related_products",
  "relatedProducts",
  "products",
  "results",
  "items",
];

const pickRelatedProducts = (payload: unknown): unknown[] | undefined => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  for (const key of RELATED_KEYS) {
    // @ts-expect-error - runtime key lookup
    const value = payload[key];
    if (Array.isArray(value) && value.length > 0) {
      return value;
    }
  }

  return undefined;
};

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  const id = req.nextUrl.searchParams.get("id");

  if (!query && !id) {
    return NextResponse.json(
      { error: "Missing `query` or `id` parameter" },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  try {
    // Build the upstream URL
    let upstreamUrl: string;
    if (id) {
      upstreamUrl = `${DASHBOARD_SERVICE_URL}/products/insights/${id}`;
    } else {
      upstreamUrl = `${DASHBOARD_SERVICE_URL}/search?query=${encodeURIComponent(query!)}`;
    }

    const upstreamResponse = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain;q=0.9",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    const responseText = await upstreamResponse.text();
    let payload: unknown = responseText;

    try {
      payload = JSON.parse(responseText);
    } catch {
      // If parsing fails, fall back to raw text string
      payload = responseText;
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error: "Upstream service responded with an error",
          statusCode: upstreamResponse.status,
          payload,
        },
        { status: upstreamResponse.status }
      );
    }

    return NextResponse.json(
      {
        query,
        relatedProducts: pickRelatedProducts(payload) ?? [],
        payload,
      },
      { status: 200 }
    );
  } catch (error) {
    const isAbortError = (error as Error).name === "AbortError";
    return NextResponse.json(
      {
        error: isAbortError
          ? "The insights service timed out"
          : "Unable to contact the insights service",
      },
      { status: isAbortError ? 504 : 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
