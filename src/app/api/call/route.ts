import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "Numéro de téléphone requis" },
        { status: 400 }
      );
    }

    const apiKey = process.env.CALLAPS_API_KEY;
    const agentId = process.env.CALLAPS_AGENT_ID;

    if (!apiKey || !agentId) {
      console.error("CALLAPS_API_KEY or CALLAPS_AGENT_ID not configured");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    // Format phone number to E.164
    let formattedPhone = phone.replace(/\s/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "+33" + formattedPhone.slice(1);
    }
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+" + formattedPhone;
    }

    const calRes = await fetch("https://app.callaps.com/api/v1/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
        to_number: formattedPhone,
        name: name || undefined,
        metadata: {
          source: "callaps-website",
          page: "/demo",
        },
      }),
    });

    const data = await calRes.json();

    if (!calRes.ok || !data.success) {
      console.error("Callaps API error:", JSON.stringify(data));
      return NextResponse.json(
        {
          error: "Erreur lors du lancement de l'appel",
          details: data.message || data.error || "Erreur inconnue",
        },
        { status: calRes.status }
      );
    }

    console.log("=== Appel lancé via Callaps ===");
    console.log(`Nom: ${name || "N/A"} | Tel: ${formattedPhone}`);
    console.log(`Call ID: ${data.call_id}`);
    console.log("===============================");

    return NextResponse.json({
      success: true,
      callId: data.call_id,
      message: "Appel en cours",
    });
  } catch (err) {
    console.error("Call route error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
