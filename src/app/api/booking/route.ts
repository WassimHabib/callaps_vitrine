import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, date, slot } = body;

    if (!name || !email || !date || !slot) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // Log la demande (visible dans les logs serveur)
    console.log("=== Nouvelle demande de RDV ===");
    console.log(`Nom: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Téléphone: ${phone || "Non renseigné"}`);
    console.log(`Entreprise: ${company || "Non renseignée"}`);
    console.log(`Date: ${date}`);
    console.log(`Créneau: ${slot}`);
    console.log(`Message: ${message || "Aucun"}`);
    console.log("==============================");

    // Construire l'URL Calendly pré-remplie
    const calendlyBase =
      "https://calendly.com/habib-wassim75/premier-echange-decouverte-de-vos-besoins-wevlap";
    const params = new URLSearchParams();
    params.set("name", name);
    params.set("email", email);
    if (message) params.set("a1", message);

    const calendlyUrl = `${calendlyBase}?${params.toString()}`;

    return NextResponse.json({
      success: true,
      calendlyUrl,
      message: "Demande enregistrée",
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
