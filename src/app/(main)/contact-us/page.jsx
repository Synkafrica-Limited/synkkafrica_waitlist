// src/app/(main)/contact/page.jsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HeaderNavbar from "../../components/HeaderNavbar";
import { AnimatedField } from "./components/AnimatedField";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-700 flex flex-col">
      <HeaderNavbar showWaitlist showContact={false} />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 relative overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="absolute -top-10 -right-10 opacity-20 pointer-events-none"
          >
            <Image
              src="/images/brand/synkafrica-logo-single.png"
              alt="SynkAfrica"
              width={120}
              height={120}
              className="rounded-full"
            />
          </motion.div>

          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2 tracking-tight">
            Contact Us
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-8">
            We'd love to hear from you! Fill out the form and our team will get back to you soon.
          </p>

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
                  Message Sent!
                </div>
                <div className="text-zinc-500 dark:text-zinc-300">
                  Thank you for reaching out. We'll get back to you soon.
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
                className="space-y-6"
              >
                <AnimatedField label="Your Name">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
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

                <AnimatedField label="Message">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    rows={4}
                    className="peer w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
                  />
                </AnimatedField>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
