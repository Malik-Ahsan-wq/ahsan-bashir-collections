import { NextRequest, NextResponse } from "next/server";
import { IOrder } from "@/models/Order";

// In-memory storage for orders (replaces MongoDB)
// Note: Data will be lost when the server restarts
// Using global variable to persist across hot reloads in dev, 
// though strictly in production serverless envs this might reset per invocation/cold start.
// For a "perfect" no-db solution without external services, this is the standard approach.
const globalForOrders = global as unknown as { orders: IOrder[] };
const orders: IOrder[] = globalForOrders.orders || [];
if (process.env.NODE_ENV !== "production") globalForOrders.orders = orders;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Create a new order object
    const newOrder: IOrder = {
      _id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      customerName: body.customerName,
      address: body.address,
      phone: body.phone,
      totalAmount: body.totalAmount,
      status: "Pending",
      paymentMethod: body.paymentMethod || "Cash on Delivery",
      items: body.items,
      createdAt: new Date(),
    };

    // Save to in-memory storage
    orders.push(newOrder);
    
    console.log("Order placed successfully (In-Memory):", newOrder);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Return orders sorted by createdAt descending
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    return NextResponse.json({ success: true, orders: sortedOrders });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
