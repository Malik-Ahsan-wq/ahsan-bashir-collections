import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function Sync() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  await connectToDB();
  await User.updateOne(
    { clerkId: user.id },
    {
      $set: {
        email: user.emailAddresses?.[0]?.emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl,
      },
    },
    { upsert: true }
  );
  redirect("/");
}
