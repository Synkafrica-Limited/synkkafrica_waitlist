"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/buttons";
import HeaderNavbar from "../../components/HeaderNavbar";

const services = ["Laundry", "Beach", "Car rental", "Dining", "Full packages"];
const referrals = ["Friend", "Social Media", "Ad", "Other"];

export default function WaitlistForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
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
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-4 animate-fade-in"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Let’s add you to the waitlist</h2>
            <FloatingField label="Full Name">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </FloatingField>
            <FloatingField label="Email address">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </FloatingField>
            <FloatingField label="Phone number">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </FloatingField>
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
          </form>
        </motion.div>
      </main>
    </div>
  );
}

// Floating label field component
function FloatingField({ label, children }) {
  return (
    <div className="relative">
      {children}
      <label className="absolute left-4 top-3 text-zinc-500 dark:text-zinc-400 pointer-events-none transition-all duration-200
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
        peer-focus:-top-4 peer-focus:text-sm peer-focus:text-orange-500 dark:peer-focus:text-orange-400
        bg-white dark:bg-zinc-900 px-1 rounded">
        {label}
      </label>
    </div>
  );
}
