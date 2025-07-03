import { NextRequest, NextResponse } from "next/server";

const generateReservationId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `RES-${timestamp}-${random}`.toUpperCase();
};

// Helper to format date as DD/MM/YYYY
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
};

// Helper to format time as HH:MM AM/PM
const formatTime = (timeString: string) => {
  if (!timeString) return "";
  return `Time ${timeString.substring(0, 5)}`; // Returns "Time 10:30"
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Format dates and times
    const formattedData = {
      ...body,
      pickup_date: formatDate(body.pickup_date),
      dropoff_date: formatDate(body.dropoff_date),
      pickup_time: formatTime(body.pickup_time),
      dropoff_time: formatTime(body.dropoff_time),
    };

    // Add system-generated fields
    const payload = {
      ...formattedData,
      reservation_id: generateReservationId(),
      approved: "FALSE",
      in_process: "FALSE",
      deleted: "FALSE",
      created_at: new Date().toISOString(),
    };

    console.log("Formatted payload:", payload);

    const response = await fetch("https://sheetdb.io/api/v1/4th2lq81a9ra1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [payload] }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "SheetDB API error");
    }

    return NextResponse.json({
      status: "success",
      reservation_id: payload.reservation_id,
      message: "Reservation submitted successfully",
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Failed to submit reservation",
      },
      { status: 500 },
    );
  }
}
