"use client";
import React from 'react';

export default function VendorModal({ open, onClose }) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative max-w-3xl w-full mx-4 md:mx-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-auto max-h-[90vh]">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold">Vendor Onboarding</h2>
            <button onClick={onClose} aria-label="Close vendor onboarding" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800">
              ✕
            </button>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Thanks for your interest in joining Synkkafrica as a vendor. We'll guide you through verification, pricing, and how to manage bookings and payouts.</p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-4">
            <li>Create a vendor account or sign up via the Waitlist form and select "Vendor".</li>
            <li>Provide business documentation for verification (license, ID, proof of address).</li>
            <li>Complete onboarding call with our partnerships team.</li>
            <li>Start listing services and accepting bookings.</li>
          </ol>
          <div className="mt-6 flex gap-3">
            <a href="/join_waitlist" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Join as a Vendor</a>
            <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
