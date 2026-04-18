import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city") || "Toronto";
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const err = await res.json();
      const message = err?.error?.message || "City not found";
      return NextResponse.json({ error: message }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}
