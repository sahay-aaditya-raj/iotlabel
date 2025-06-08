import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  let { device_id } = await params;
  device_id = parseInt(device_id);
  const { manual, value_led, value_buzzer } = await req.json();

  const client = await clientPromise;
  const db = client.db("iotproj");
  const controlColl = db.collection("control_data");

  await controlColl.insertOne({
    device_id,
    manual: !!manual,
    value_led: !!value_led,
    value_buzzer: !!value_buzzer,
    timestamp: new Date()
  });

  return NextResponse.json({ status: "updated" });
}
