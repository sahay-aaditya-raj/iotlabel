import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("iotproj");
  const controlColl = db.collection("control_data");

  const deviceIds = await controlColl.distinct("device_id");
  return NextResponse.json({ devices: deviceIds });
}
