import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("iotproj");
    const sensor_collection = db.collection("sensor_data");
    const avg_collection = db.collection("sensor_data_avg");

    const now = new Date();
    const device_id = body.sensor_id;

    // 1. Delete logs older than 2 days
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    await sensor_collection.deleteMany({
      sensor_id: device_id,
      timestamp: { $lt: twoDaysAgo }
    });

    // 2. Insert new log
    await sensor_collection.insertOne({
      sensor_id: device_id,
      temperature: body.temperature,
      humidity: body.humidity,
      soil_moisture: body.soil_moisture,
      manual: body.manual,
      value_led: body.value_led,
      value_buzzer: body.value_buzzer,
      timestamp: now
    });

  
    return NextResponse.json({ status: "success" });
  } catch (e) {
    return NextResponse.json({ status: "error", reason: e.message }, { status: 400 });
  }
}
