import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/leads — list all leads (newest first)
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("GET /api/leads failed:", error);
    return NextResponse.json(
      { error: "Failed to load leads." },
      { status: 500 }
    );
  }
}

// POST /api/leads — create a lead from the enquiry form
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        message: body.message ? String(body.message).trim() : null,
        product: body.product ? String(body.product).trim() : null,
        category: body.category ? String(body.category).trim() : null,
        type: body.type === "appointment" ? "appointment" : "enquiry",
      },
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error("POST /api/leads failed:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
