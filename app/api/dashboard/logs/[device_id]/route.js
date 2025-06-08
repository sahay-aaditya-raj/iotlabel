import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  let { device_id } = await params;
  device_id = parseInt(device_id);
  const client = await clientPromise;
  const db = client.db("iotproj");
  const sensorColl = db.collection("sensor_data");

  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

  const logs = await sensorColl
    .find({ sensor_id: device_id, timestamp: { $gte: twoDaysAgo, $lte: now } })
    .sort({ timestamp: 1 })
    .toArray();

  return NextResponse.json({ logs });
}
