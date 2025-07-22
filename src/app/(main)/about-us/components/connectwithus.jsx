// components/ConnectWithUs.jsx
"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";


export default function ConnectWithUs() {
  return (
    <section className="bg-white dark:bg-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Copy */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            Connect with us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Have questions, feedback, or just want to say hello? We’re here to help—and we’d love to hear from you.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Email:</span>
              <a href="mailto:support@synkafrica.com" className="text-primary-600 hover:underline">
                info@synkkafrica.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Phone:</span>
              <a href="tel:+23425296409" className="text-primary-600 hover:underline">
                +234 2529 6409
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Office:</span>
              <address className="not-italic text-gray-600 dark:text-gray-300">
                3, Adamo Street, Lekki Phase 2, Lagos, Nigeria
              </address>
            </div>
          </div>

          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#!"
                className="p-3 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Icon className="text-gray-700 dark:text-gray-200" size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Illustration */}
        {/* <motion.div
          className="lg:w-1/2 relative w-full h-64 sm:h-80 lg:h-96"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        > */}
          <DotLottieReact
            src="/animations/connect-illustration.lottie"
            autoplay
            loop
            style={{ width: 400, height: 400 }}
          />
        {/* </motion.div> */}
      </div>
    </section>
  );
}
