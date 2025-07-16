// app/(main)/join_waitlist/page.jsx
"use client";
import { Suspense } from "react";
import WaitlistForm from "./components/waitlistform";

export default function JoinWaitlistPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-8">Loading…</div>}>
      <WaitlistForm />
    </Suspense>
  );
}
