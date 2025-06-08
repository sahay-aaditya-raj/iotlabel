import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { device_id } = await params;
    const client = await clientPromise;
    const db = client.db("iotproj");
    const control_collection = db.collection("control_data");

    const latest = await control_collection.findOne(
      { device_id: parseInt(device_id) },
      { sort: { timestamp: -1 } }
    );

    if (latest) {
      return NextResponse.json({
        manual: latest.manual || false,
        value_led: latest.value_led || false,
        value_buzzer: latest.value_buzzer || false
      });
    } else {
      return NextResponse.json({ error: "No control data found" }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
