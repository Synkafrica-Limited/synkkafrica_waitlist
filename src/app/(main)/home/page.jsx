"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FAQ from "./components/FAQ";
import Button from "../../components/ui/buttons";
import HeaderNavbar from "../../components/HeaderNavbar";


export default function LandingPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (email) {
      router.push(`/join_waitlist?email=${encodeURIComponent(email)}`);
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-500 min-h-screen flex flex-col">
      <HeaderNavbar showWaitlist showContact={false} />
      <main className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-16 gap-10 md:gap-16 flex-1 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 w-full max-w-xl flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-3 py-1 rounded-full font-medium mb-4 animate-bounce text-xs sm:text-sm md:text-base">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" stroke="#EA580C" strokeWidth="2" strokeLinecap="round"/></svg>
            Coming soon
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-balance">
            Join the Synkkafrica Waitlist
          </h1>
          <p className="mb-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-lg">
            Be among the first to enjoy the future synkkafrica brings to you. Join the waitlist now to get early access and exclusive updates.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2 w-full max-w-md mb-2 animate-fade-in"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white dark:bg-zinc-800 text-black dark:text-white text-base"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button type="submit" variant="filled" size="md" className="w-full sm:w-auto">Get started →</Button>
          </form>
          <Link
            href="/contact-us"
            className="text-orange-500 dark:text-orange-300 text-xs sm:text-sm underline hover:text-orange-700 dark:hover:text-orange-400 transition mt-2"
          >
            Contact us ↗
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex justify-center w-full max-w-xl"
        >
          <DotLottieReact
            src="/animations/loading.lottie"
            loop
            autoplay
            style={{ width: "100%", maxWidth: 400, height: 380 }}
          />
        </motion.div>
      </main>
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12 w-full max-w-7xl mx-auto">
        <FAQ />
      </section>
    </div>
  );
}
