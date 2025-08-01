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
import AboutSynkkafrica from "./components/AboutSynkkafrica";

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
      desc: "Combine transport, dining and experiences in a single seamless booking.",
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
    <motion.div
      className="space-y-24 px-4 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
      }}
    >
      <HeaderNavbar showWaitlist showContact />
      {/* Hero Section */}
      <motion.section
        className="flex flex-col lg:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.div className="flex-1" initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }} viewport={{ once: true }}>
          <motion.h1 className="text-4xl lg:text-5xl font-extrabold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            Revolutionizing African Cultural Tourism
          </motion.h1>
          <motion.p className="text-gray-600 dark:text-gray-300 space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
            <span>
              SynKKafrica is built with the vision to help travelers and locals discover, book, and enjoy Africa's most genuine experiences. We understand that exploring Africa's vibrant cultures and destinations shouldn't mean dealing with fragmented platforms and unreliable vendors. Fast, seamless and secure bookings—so you can focus on making memories, not logistics.
            </span>
          </motion.p>
        </motion.div>
        <motion.div className="flex-1 flex justify-center" initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }} viewport={{ once: true }}>
          <DotLottieReact
            src="/animations/hero-illustration.lottie"
            autoplay
            loop
            style={{ width: 400, height: 400 }}
          />
        </motion.div>
      </motion.section>

      {/* <AboutSynkkafrica /> */}

      {/* 2. Mission & Core Values */}
      <motion.section
        className="space-y-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.h2 className="text-3xl font-bold text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          Our Mission & Core Values
        </motion.h2>
        <motion.p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
          Our vision is to empower African culture through technology.
        </motion.p>
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
          ].map((v, i) => (
            <motion.div
              key={v.title}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${v.color} rounded-2xl p-6 shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-gray-700 dark:text-black">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. Top Features of Synkafrica Booking */}
      <motion.section
        className="space-y-8  bg-primary-500 rounded-2xl dark:bg-zinc-900 p-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.h2 className="text-3xl text-white font-bold text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          Top Features
        </motion.h2>
        <motion.p className="text-center text-white dark:text-gray-300 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
          Our platform is built to make booking any service—transport, dining, beach experiences, and more—fast, reliable, and secure.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-center shadow-sm flex flex-col items-center"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/*4. Meet the Team*/}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <MeetOurTeam />
      </motion.div>

      {/* 5. Words from the CEO */}
      <motion.section
        className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-12 flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <Image
            src="/team/temidayo.jpg"
            alt="CEO Photo"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-semibold mb-2">“Our vision is to empower African culture through technology.”</h3>
          <p className="italic text-gray-600 dark:text-gray-300 mb-4">
            — Temidayo Faluyi, Founder & CEO
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Africa's culture is incredible, but planning experiences here shouldn't be complicated. We started synKKafrica because we saw talented local businesses struggling to reach travelers, while visitors missed out on the real experiences that make this continent special.
            Born from countless journeys and deep local connections, we created a platform where booking African adventures is simple and stress-free. We believe every trip should create lasting memories, not planning headaches.
            Whether you're a culture-seeker, foodie, or adventurer ready to explore — your journey starts when you get synKKed with the soul of Africa.
          </p>
        </motion.div>
      </motion.section>

      {/* 5. Social Media Handles */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <ConnectWithUs />
      </motion.div>

      {/* 6. Early Access / Waitlist */}
      <motion.section
        className="bg-primary-500 dark:bg-gray-900 rounded-2xl px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-3 sm:mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          Get Early Access
        </motion.h2>
        <motion.p className="text-white dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
          Join our waitlist and be the first to unlock hassle‑free booking experience.
        </motion.p>
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: hook up to your API
            alert(`Thanks! We'll notify ${email}`);
          }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
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
        </motion.form>
      </motion.section>
    </motion.div>
  );
}
