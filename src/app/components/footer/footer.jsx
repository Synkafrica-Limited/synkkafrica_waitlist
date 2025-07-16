// components/Footer.jsx
"use client";

import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ThemeToggle from "../ui/ThemeToggle";

export default function Footer() {
  return (
    <footer className="space-y-8 bg-zinc-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:justify-between space-y-8 lg:space-y-0">
        {/* 3D Lottie Animation in place of logo */}
        <div className="w-32 h-32">
          <DotLottieReact
            src="/animations/loading.lottie"
            autoplay
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Footer nav links */}
        <ul className="flex flex-wrap justify-between lg:justify-start gap-6 text-lg font-medium">
          {[
            { href: "/", label: "Home" },
            { href: "/about-us", label: "About Us" },
            { href: "/careers", label: "Careers" },
            { href: "/contact-us", label: "Contact Us" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social icons and Theme Toggle */}
        <div className="flex items-center space-x-4 text-xl">
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors">
            <FaTwitter />
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* bottom bar */}
      <div className="mt-8 border-t border-gray-300 dark:border-gray-800 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Synkafrica — All Rights Reserved
      </div>
    </footer>
  );
}
