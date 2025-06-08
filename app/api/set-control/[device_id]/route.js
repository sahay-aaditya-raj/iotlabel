import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { device_id } = await params;
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db("iotproj");
    const control_collection = db.collection("control_data");

    await control_collection.insertOne({
      device_id: parseInt(device_id),
      manual: !!data.manual,
      value_led: !!data.value_led,
      value_buzzer: !!data.value_buzzer,
      timestamp: new Date()
    });

    return NextResponse.json({ status: "updated" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
