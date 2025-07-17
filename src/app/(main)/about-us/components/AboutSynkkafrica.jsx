// src/app/(main)/about-us/components/AboutSynkkafrica.jsx
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSynkkafrica() {
  return (
    <motion.section
      className="bg-white dark:bg-zinc-900 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4">About Synkkafrica</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          At Synkkafrica, we're on a mission to connect you with the heart of Africa's most authentic experiences. From cultural tours to premium dining and vibrant events, seamless auto movement, and other convenience services, our platform makes it easy to discover, plan, and book unforgettable moments. Designed for both locals and travelers, Synkkafrica offers real-time availability, secure bookings, and handpicked experiences you won’t find anywhere else.
        </p>
        <div>
          <h3 className="font-semibold mb-2">Why choose synkkafrica</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Seamless experience</li>
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Secure transaction</li>
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> 24/7 Dedicated support</li>
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Continuous innovation</li>
          </ul>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center gap-4">
        <div className="flex gap-4">
          <Image src="/images/about/about_1.png" alt="Synkkafrica" width={120} height={180} className="rounded-xl object-cover" />
          <Image src="/images/about/about_2.png" alt="Synkkafrica" width={120} height={180} className="rounded-xl object-cover" />
          <div className="rounded-xl overflow-hidden w-[120px] h-[180px] bg-orange-100 flex items-center justify-center">
            <Image src="/images/about/about_3.png" alt="Africa" width={120} height={180} className="object-cover" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
