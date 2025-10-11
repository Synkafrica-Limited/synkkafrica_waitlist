import React from "react";
import VendorModal from "@/app/components/VendorModal";

const faqs = [
  {
    q: "How do I find booking deals on Synkkafrica?",
    a: "You can find booking deals by searching our platform and subscribing to our newsletter for exclusive offers.",
  },
  {
    q: "What makes Synkkafrica a great booking app?",
    a: "We offer a seamless experience, exclusive deals, and a wide range of services tailored for Africa.",
  },
  {
    q: "How do I use Synkkafrica to manage my bookings?",
    a: "Easily manage your bookings through your dashboard after signing up.",
  },
  {
    q: "How do I use Synkkafrica to manage my convenience services?",
    a: "You can add, modify, or cancel convenience services anytime from your account.",
  },
  // Vendor specific FAQs
  {
    q: "How can I list my business on Synkkafrica?",
    a: (<span>Sign up as a Vendor on our <a href="/join_waitlist" className="text-orange-500 underline">Waitlist</a> page and select your vendor type. For a full guide open the <button id="vendor-open" className="text-orange-500 underline">Vendor Onboarding</button> modal.</span>),
  },
  {
    q: "What are the requirements to become a vendor?",
    a: "Requirements vary by service type but typically include a verified business name, contact details, and documentation for trust and safety checks. We'll guide you through each step.",
  },
  {
    q: "How does payment and settlement work for vendors?",
    a: "We support secure payments through our payment partners. Settlement schedules are shared during onboarding and can be configured in your vendor dashboard.",
  },
];

export default function FAQ() {
  const [open, setOpen] = React.useState(Array(faqs.length).fill(false));
  const [vendorOpen, setVendorOpen] = React.useState(false);
  const toggle = (idx) => setOpen((prev) => {
    const next = [...prev];
    next[idx] = !next[idx];
    return next;
  });
  React.useEffect(() => {
    const btn = document.getElementById('vendor-open');
    if (!btn) return;
    const handler = () => setVendorOpen(true);
    btn.addEventListener('click', handler);
    return () => btn.removeEventListener('click', handler);
  }, []);
  return (
    <>
    <section className="w-full max-w-7xl mx-auto px-1 sm:px-4 md:px-0">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Frequently asked questions about Synkkafrica</h2>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900/80 rounded-xl shadow-md border border-zinc-100 dark:border-zinc-800 p-4 transition-colors duration-300 relative min-h-[64px]"
            style={{ minHeight: '64px' }}
          >
            <button
              className="w-full flex justify-between items-center py-2 text-left font-medium text-base sm:text-lg hover:text-orange-500 transition group focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-expanded={open[i]}
              aria-controls={`faq-panel-${i}`}
              onClick={() => toggle(i)}
            >
              <span>{faq.q}</span>
              <span className={`ml-2 transition-transform duration-300 ${open[i] ? "rotate-180" : "rotate-0"}`}>
                ▼
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              className={`absolute left-0 right-0 z-10 bg-white dark:bg-zinc-900/90 rounded-b-xl shadow-lg transition-all duration-500 text-base text-gray-600 dark:text-gray-300 ${open[i] ? 'max-h-40 py-2 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}
              aria-hidden={!open[i]}
              style={{ willChange: 'max-height', top: '100%' }}
            >
              {open[i] && <div className="px-4 pb-2">{faq.a}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
      <VendorModal open={vendorOpen} onClose={() => setVendorOpen(false)} />
    </>
  );
}
