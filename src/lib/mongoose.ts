/* eslint-disable */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = (global as any).mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached?.conn) return cached.conn;
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }
  cached!.promise =
    cached!.promise ||
    mongoose.connect(MONGODB_URI, {
      autoIndex: true,
    });
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

