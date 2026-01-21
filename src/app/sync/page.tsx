import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function Sync() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // MongoDB sync logic removed as per request.
  // We just redirect to home page after auth check.
  
  redirect("/");
}
