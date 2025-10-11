"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ui/ThemeToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * @param {Object} props
 * @param {boolean} [props.showWaitlist] - Show the "Join Waitlist" link
 * @param {boolean} [props.showContact] - Show the "Contact us" link
 * @param {React.ReactNode} [props.children] - Extra nav items
 */
export default function HeaderNavbar({
  showWaitlist = true,
  showContact = false,
  children,
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto w-full"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Logo */}
          <motion.div whileHover={{ rotate: 8, scale: 1.12 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
            <Image
              src="/images/brand/Synkkafrica-logo-single.png"
              alt="Synkkafrica Logo"
              width={32}
              height={32}
              className="transition-transform duration-200"
            />
          </motion.div>
          <span className="font-bold text-lg group-hover:text-orange-600 transition-colors duration-200">Synkkafrica</span>
        </Link>
      </motion.div>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
          <Link href="/about-us" className="text-md font-medium relative group px-1">
            About us
            <motion.span
              layoutId="nav-underline"
              className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-orange-500 rounded transition-all duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            />
          </Link>
        </motion.div>
        {showWaitlist && (
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/join_waitlist"
              className="text-md font-medium text-orange-600 hover:underline relative group px-1"
            >
              Join Waitlist
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-orange-500 rounded transition-all duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </Link>
          </motion.div>
        )}
        {showContact && (
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact-us"
              className="text-md font-medium text-orange-600 hover:underline relative group px-1"
            >
              Contact us
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-orange-500 rounded transition-all duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </Link>
          </motion.div>
        )}
        {children}
        <ThemeToggle />
      </nav>
      {/* Mobile hamburger */}
      <motion.button
        className="md:hidden flex items-center px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        aria-label="Open menu"
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.07 }}
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          width={28}
          height={28}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      </motion.button>
      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu-bg"
            className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              key="mobile-menu-panel"
              className="w-2/3 max-w-xs bg-white dark:bg-zinc-900 h-full shadow-xl flex flex-col gap-4 p-6"
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ x: 200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="self-end mb-4"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                </svg>
              </button>
              <Link
                href="/about-us"
                className="text-base font-medium"
                onClick={() => setOpen(false)}
              >
                About us
              </Link>
              {showWaitlist && (
                <Link
                  href="/join_waitlist"
                  className="text-base font-medium text-orange-600 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Join Waitlist
                </Link>
              )}
              {showContact && (
                <Link
                  href="/contact-us"
                  className="text-base font-medium text-orange-600 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Contact us
                </Link>
              )}
              {children}
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}