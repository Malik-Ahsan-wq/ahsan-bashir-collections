"use client";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 flex justify-center">
      <SignUp afterSignUpUrl="/sync" />
    </div>
  );
}
