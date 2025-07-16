"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/buttons";
import HeaderNavbar from "../../components/HeaderNavbar";
import { AnimatedField } from "../contact-us/components/AnimatedField";
import { FloatingField } from "./components/FloatingField";

const services = ["Laundry", "Beach", "Car rental", "Dining", "Full packages"];
const referrals = ["Friend", "Social Media", "Ad", "Other"];

export default function WaitlistForm() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [form, setForm] = useState({
    name: "",
    email: initialEmail,
    countryCode: "+234", // Default to Nigeria
    phone: "",
    referral: "",
    service: "",
    updates: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  // Country code change handler
  function handleCountryCodeChange(e) {
    setForm((f) => ({ ...f, countryCode: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // TODO: send to backend
    setTimeout(() => setSubmitted(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-700 flex flex-col">
      {/* Header/Navbar */}
      <HeaderNavbar showWaitlist={false} showContact />
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 px-4 py-8">
        {/* 3D SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: 30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="hidden md:flex flex-1 items-center justify-center"
        >
          {/* Replace this SVG with a more complex 3D/animated SVG or Lottie if you want */}
          <motion.svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <ellipse cx="160" cy="260" rx="120" ry="30" fill="#F18A83" fillOpacity="0.15" />
            <motion.circle
              cx="160"
              cy="140"
              r="80"
              fill="#E47458"
              initial={{ scale: 0.7 }}
              animate={{ scale: [0.7, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <motion.circle
              cx="160"
              cy="140"
              r="50"
              fill="#FFE7E5"
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <motion.rect
              x="120"
              y="110"
              width="80"
              height="60"
              rx="15"
              fill="#FCB6AF"
              initial={{ y: 110 }}
              animate={{ y: [110, 100, 110] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <motion.circle
              cx="200"
              cy="110"
              r="12"
              fill="#E05D3D"
              initial={{ x: 200 }}
              animate={{ x: [200, 210, 200] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.div>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <AnimatePresence>
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="mb-4"
                >
                  <svg
                    className="w-16 h-16 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <div className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
                  Added to Waitlist!
                </div>
                <div className="text-zinc-500 dark:text-zinc-300">
                  Thank you for joining. We'll keep you updated!
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-4 animate-fade-in"
              >
                <h2 className="text-2xl font-bold mb-4 text-center">Let’s add you to the waitlist</h2>
                <AnimatedField label="Full Name">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    required
                  />
                </AnimatedField>
                <AnimatedField label="Email">
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="joedoe@example.com"
                    required
                    className="peer w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                </AnimatedField>
                <AnimatedField label="">
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleCountryCodeChange}
                      className="px-2 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition w-28"
                      required
                      aria-label="Country code"
                    >
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+233">🇬🇭 +233</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+225">🇨🇮 +225</option>
                      <option value="+250">🇷🇼 +250</option>
                      <option value="+254">🇰🇪 +254</option>
                      {/* Add more as needed */}
                    </select>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                      required
                      pattern="[0-9]{7,15}"
                      inputMode="tel"
                    />
                  </div>
                </AnimatedField>
                <div>
                  <select
                    name="referral"
                    value={form.referral}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    required
                  >
                    <option value="">How did you hear about us?</option>
                    {referrals.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    required
                  >
                    <option value="">Service of Interest</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="updates"
                    checked={form.updates}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  Check to receive updates via email
                </label>
                <Button
                  type="submit"
                  variant="filled"
                  size="md"
                  className="w-full"
                  disabled={submitted}
                >
                  {submitted ? "Added!" : "Join waitlist"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}


