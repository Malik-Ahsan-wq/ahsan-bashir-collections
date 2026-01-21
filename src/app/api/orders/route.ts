import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectToDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not defined");
      return NextResponse.json({ success: false, error: "Database configuration error" }, { status: 500 });
    }
    await connectToDB();
    const body = await req.json();
    const order = await Order.create(body);
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
