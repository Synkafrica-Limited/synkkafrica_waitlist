// app/about/page.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import { IoTimeOutline, IoPricetagOutline, IoGridOutline, IoLockClosedOutline, IoChatbubbleOutline } from "react-icons/io5";
import Button from "@/app/components/ui/buttons";
import HeaderNavbar from "@/app/components/HeaderNavbar";
import MeetOurTeam from "./components/meetourteam";
import ConnectWithUs from "./components/connectwithus";

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const FEATURES = [
    {
      icon: <IoTimeOutline size={36} className="text-primary-500" />,
      title: "Real‑Time Availability",
      desc: "See live inventory for cars, tables, beach slots & more—no double‑bookings.",
    },
    {
      icon: <IoPricetagOutline size={36} className="text-primary-500" />,
      title: "Dynamic Pricing",
      desc: "Get instant quotes based on time, demand, and selected add‑ons.",
    },
    {
      icon: <IoGridOutline size={36} className="text-primary-500" />,
      title: "Multi‑Service Bundles",
      desc: "Combine transport, dining, and experiences in a single seamless booking.",
    },
    {
      icon: <IoLockClosedOutline size={36} className="text-primary-500" />,
      title: "Secure Payments",
      desc: "Powered by Paystack—bank‑grade encryption and instant confirmation.",
    },
    {
      icon: <IoChatbubbleOutline size={36} className="text-primary-500" />,
      title: "Real-Time Support",
      desc: "Chat directly with Synkkafrica, providers, and drivers for instant help.",
    },
  ];

  return (
    <div className="space-y-24 px-4 max-w-7xl mx-auto">
      <HeaderNavbar showWaitlist showContact />
      {/* Hero Section */}
      {/* 1. Unique Value Proposition */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
           One-Stop booking platform for all your luxury & convenience needs
          </h1>
          <p className="text-gray-600 dark:text-gray-300 space-y-4">
            <span>
              Synkkafrica is built with the vision to help travelers and locals discover, book, and enjoy Africa’s most authentic experiences. We understand the unique opportunities and challenges of exploring Africa’s vibrant cultures, destinations, and services. 
            </span>
            <span>
              Fast, seamless, and secure bookings—so you can focus on making memories, not logistics.
            </span>
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <DotLottieReact
            src="/animations/hero-illustration.lottie"
            autoplay
            loop
            style={{ width: 400, height: 400 }}
          />
        </div>
      </section>

      
       {/* 2. Mission & Core Values */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Our Mission & Core Values</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          To empower content creators with quick, transparent, and reliable funding—so that stories that matter can get told.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              desc: "We push boundaries with cutting‑edge technology to streamline funding.",
              color: "bg-green-50 text-green-800",
            },
            {
              title: "Integrity",
              desc: "We operate with full transparency—no hidden fees, no surprises.",
              color: "bg-blue-50 text-blue-800",
            },
            {
              title: "Support",
              desc: "We guide you every step of the way with dedicated account advice.",
              color: "bg-purple-50 text-purple-800",
            },
          ].map((v) => (
            <motion.div
              key={v.title}
              whileHover={{ scale: 1.03 }}
              className={`${v.color} rounded-2xl p-6 shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-gray-700 dark:text-black">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Top Features of Synkafrica Booking */}
      <section className="space-y-8  bg-primary-500 rounded-2xl dark:bg-zinc-900 p-8">
        <h2 className="text-3xl text-white font-bold text-center">Top Features</h2>
        <p className="text-center text-white dark:text-gray-300 max-w-2xl mx-auto">
          Our platform is built to make booking any service—transport, dining, beach experiences, and more—fast, reliable, and secure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-center shadow-sm flex flex-col items-center"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      {/*4. Meet the Team*/}
      <MeetOurTeam />

      
      {/* 5. Words from the CEO */}
      <section className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden">
          <Image
            src="/team/temidayo.jpg"
            alt="CEO Photo"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">“Our vision is to fuel creativity.”</h3>
          <p className="italic text-gray-600 dark:text-gray-300 mb-4">
            — Temidayo Faluyi, Founder & CEO
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            At Synkkafrica, we’re building a platform to make discovering, booking, and enjoying Africa’s most authentic experiences as seamless as sharing your next adventure. Our mission is to empower every explorer, foodie, and culture-seeker with the tools—and the confidence—they need to thrive on their journey across Africa.
          </p>
        </div>
      </section>

       {/* 5. Social Media Handles */}
    <ConnectWithUs />

      {/* 6. Early Access / Waitlist */}
      <section className="bg-primary-500 dark:bg-gray-900 rounded-2xl px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-3 sm:mb-4">Get Early Access</h2>
        <p className="text-white dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg max-w-2xl mx-auto">
          Join our waitlist and be the first to unlock hassle‑free booking experience.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: hook up to your API
            alert(`Thanks! We'll notify ${email}`);
          }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-xl mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            className="flex-1 min-w-0 px-4 py-3 sm:py-3 md:py-4 w-full sm:w-auto rounded-lg text-white border border-white focus:ring-2 focus:ring-orange-300 bg-primary-500/80 dark:bg-gray-900/80 placeholder-white/70 transition text-base sm:text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Your email address"
          />
          <Button
            variant="outline"
            size="lg"
            type="submit"
            className="w-full sm:w-auto px-6 py-3 sm:py-3 md:py-4 text-white rounded-lg transition text-base sm:text-lg"
          >
            Join Waitlist
          </Button>
        </form>
      </section>
    </div>
  );
}
