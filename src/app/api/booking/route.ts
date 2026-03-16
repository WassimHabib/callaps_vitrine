import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, start } = body;

    if (!name || !email || !start) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const apiKey = process.env.CAL_API_KEY;
    const eventTypeId = Number(process.env.CAL_EVENT_TYPE_ID);

    if (!apiKey || !eventTypeId) {
      console.error("CAL_API_KEY or CAL_EVENT_TYPE_ID not configured");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    // Build notes
    const notes = [
      company ? `Entreprise: ${company}` : "",
      phone ? `Téléphone: ${phone}` : "",
      message || "",
    ]
      .filter(Boolean)
      .join("\n");

    // Create booking via Cal.com API v1
    // `start` is the full ISO string from Cal.com slots (e.g. "2026-03-19T09:00:00+01:00")
    const calRes = await fetch(
      `https://api.cal.com/v1/bookings?apiKey=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTypeId,
          start,
          timeZone: "Europe/Paris",
          language: "fr",
          responses: {
            name,
            email,
            notes: notes || undefined,
            phone: phone || undefined,
          },
          metadata: {
            source: "callaps-website",
            company: company || undefined,
          },
        }),
      }
    );

    const calData = await calRes.json();

    if (!calRes.ok) {
      console.error("Cal.com API error:", JSON.stringify(calData));
      return NextResponse.json(
        {
          error: "Erreur lors de la réservation",
          details: calData.message || calData.error || "Créneau indisponible",
        },
        { status: calRes.status }
      );
    }

    console.log("=== Booking créé via Cal.com ===");
    console.log(`Nom: ${name} | Email: ${email}`);
    console.log(`Start: ${start}`);
    console.log(`Booking ID: ${calData.id || calData.uid}`);
    console.log("================================");

    return NextResponse.json({
      success: true,
      bookingId: calData.id || calData.uid,
      message: "Rendez-vous confirmé",
    });
  } catch (err) {
    console.error("Booking route error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
