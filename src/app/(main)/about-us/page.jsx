"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import HeaderNavbar from "../../components/HeaderNavbar";

const coreValues = [
  {
    icon: "★",
    title: "Innovation",
    desc: "We continually push boundaries and explore new technologies to deliver cutting-edge solutions.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: "⬤",
    title: "Excellence",
    desc: "We strive for perfection in every project and continuously improve our processes.",
    color: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100",
  },
  {
    icon: "⬤",
    title: "Integrity",
    desc: "We build trust through transparency, honesty, and ethical business practices.",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-500 flex flex-col">
      <HeaderNavbar showWaitlist showContact />
      {/* Hero Section */}
      <section className="w-full bg-zinc-50 dark:bg-zinc-800 py-8 sm:py-12 px-2 sm:px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 w-full max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">About Synkkafrica</h1>
          <p className="mb-6 text-base sm:text-lg text-zinc-700 dark:text-zinc-300">
            At Synkkafrica, we’re on a mission to connect you with the heart of Africa’s most authentic experiences. From cultural tours to premium dining and vibrant events, seamless auto movement, and other convenience services, our platform makes it easy to discover, plan, and book unforgettable moments. Designed for both locals and travelers, Synkkafrica offers real-time availability, secure bookings, and handpicked experiences you won’t find anywhere else.<br /><br />
            As we launch, we invite you to explore Africa like never before – our promise is simple: exceptional experiences – one booking at a time.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 flex justify-center w-full max-w-lg mx-auto">
          <DotLottieReact
            src="/animations/loading.lottie"
            loop
            autoplay
            style={{ width: '100%', maxWidth: 340, height: 'auto' }}
          />
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="w-full py-8 sm:py-12 px-2 sm:px-4 md:px-8 bg-white dark:bg-zinc-900">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-bold text-center mb-2">Our Core Values</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-zinc-600 dark:text-zinc-300 text-center mb-8 max-w-2xl mx-auto">
          These principles guide everything we do and shape the way we work with our clients and each other.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-center items-stretch max-w-5xl mx-auto">
          {coreValues.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center ${val.color}`}
            >
              <span className="text-3xl mb-2">{val.icon}</span>
              <h3 className="font-bold text-lg mb-2">{val.title}</h3>
              <p className="text-base">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-8 sm:py-12 px-2 sm:px-4 md:px-8 bg-zinc-50 dark:bg-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 w-full max-w-md mx-auto">
            <Image
              src="/images/brand/synkafrica-logo-single.png"
              alt="Team at work"
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover w-full h-auto"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 w-full max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our story</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Our story began with a passion for showcasing Africa’s rich culture, vibrant communities, and unforgettable experiences. Born from countless journeys and deep local connections, Synkkafrica was created to make booking authentic African adventures simple and accessible. We believe every trip, event, or outing should be more than a transaction – it should be a memory in the making.<br /><br />
              As we launch, our story continues with you — the explorer, the foodie, the culture-seeker – ready to synkk with the soul of Africa.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Image src="/images/brand/synkafrica-logo-single.png" alt="Temidayo Faluyi" width={40} height={40} className="rounded-full" />
              <div>
                <div className="font-semibold">Temidayo Faluyi</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-300">CEO & Founder</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-8 sm:py-12 px-2 sm:px-4 md:px-8 bg-white dark:bg-zinc-900 flex flex-col items-center">
        <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xl md:text-2xl font-bold mb-2 text-center">Need to get in touch?</motion.h3>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-zinc-600 dark:text-zinc-300 text-center mb-6 max-w-xl">
          If you do have a specific question, or need help resolving a problem, you can connect with our support team.
        </motion.p>
        <Link href="/ContactPage">
          <button className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg transition-all duration-300">
            Contact us
          </button>
        </Link>
      </section>
    </div>
  );
}
