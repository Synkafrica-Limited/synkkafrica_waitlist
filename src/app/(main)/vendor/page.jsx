"use client";
import Link from 'next/link'

export default function VendorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">Vendor Onboarding</h1>
        <p className="text-gray-900 dark:text-gray-300 mb-6">Thanks for your interest in joining Synkkafrica as a vendor. We'll guide you through verification, pricing, and how to manage bookings and payouts.</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-900 dark:text-gray-300">
          <li>Create a vendor account or sign up via the Waitlist form and select "Vendor".</li>
          <li>Provide business documentation for verification (license, ID, proof of address).</li>
          <li>Complete onboarding call with our partnerships team.</li>
          <li>Start listing services and accepting bookings.</li>
        </ol>
        <div className="mt-6">
          <Link href="/join_waitlist" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Join as a Vendor</Link>
        </div>
      </div>
    </div>
  )
}
