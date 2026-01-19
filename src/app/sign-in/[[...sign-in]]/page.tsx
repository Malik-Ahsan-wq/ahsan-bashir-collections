"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 flex justify-center">
      <SignIn afterSignInUrl="/sync" />
    </div>
  );
}
