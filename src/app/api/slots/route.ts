import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.CAL_API_KEY;
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;

  if (!apiKey || !eventTypeId) {
    return NextResponse.json({ error: "Config manquante" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  if (!startTime || !endTime) {
    return NextResponse.json({ error: "startTime et endTime requis" }, { status: 400 });
  }

  const calUrl = new URL("https://api.cal.com/v1/slots");
  calUrl.searchParams.set("apiKey", apiKey);
  calUrl.searchParams.set("eventTypeId", eventTypeId);
  calUrl.searchParams.set("startTime", startTime);
  calUrl.searchParams.set("endTime", endTime);
  calUrl.searchParams.set("timeZone", "Europe/Paris");

  const res = await fetch(calUrl.toString());
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: "Erreur Cal.com" }, { status: res.status });
  }

  return NextResponse.json(data);
}
