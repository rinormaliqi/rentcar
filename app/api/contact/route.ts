import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          status: "error",
          message: "Ju lutemi plotësoni të gjitha fushat e detyrueshme",
        },
        { status: 400 },
      );
    }

    // Prepare payload for SheetDB
    const payload = {
      data: [
        {
          name: body.name,
          email: body.email,
          message: body.message,
          phone: body.phone || "", // Optional field
          created_at: new Date().toISOString(),
        },
      ],
    };

    // Replace with your SheetDB endpoint for contact messages
    const response = await fetch("https://sheetdb.io/api/v1/arnd7kiqtz4gz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "SheetDB API error");
    }

    return NextResponse.json({
      status: "success",
      message:
        "Mesazhi juaj u dërgua me sukses! Do t'ju kontaktojmë së shpejti.",
    });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Ndodhi një gabim gjatë dërgimit të mesazhit",
      },
      { status: 500 },
    );
  }
}
