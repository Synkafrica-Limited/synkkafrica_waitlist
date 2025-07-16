"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ui/ThemeToggle";
import { useState } from "react";

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
    <header className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto w-full">
       <Link href="/" className="flex items-center gap-2">
        {/* Logo */}
          <Image
            src="/images/brand/synkafrica-logo-single.png"
            alt="Synkkafrica Logo"
            width={32}
            height={32}
        />
        <span className="font-bold text-lg">Synkkafrica</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-4">
        <Link href="/AboutPage" className="text-sm font-medium">
          About us
        </Link>
        {showWaitlist && (
          <Link
            href="/waitlistform"
            className="text-sm font-medium text-orange-600 hover:underline"
          >
            Join Waitlist
          </Link>
        )}
        {showContact && (
          <Link
            href="/ContactPage"
            className="text-sm font-medium text-orange-600 hover:underline"
          >
            Contact us
          </Link>
        )}
        {children}
        <ThemeToggle />
      </nav>
      {/* Mobile hamburger */}
      <button
        className="md:hidden flex items-center px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        aria-label="Open menu"
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
      </button>
      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden">
          <div className="w-2/3 max-w-xs bg-white dark:bg-zinc-900 h-full shadow-xl flex flex-col gap-4 p-6">
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
              href="#about"
              className="text-base font-medium"
              onClick={() => setOpen(false)}
            >
              About us
            </Link>
            {showWaitlist && (
              <Link
                href="/waitlistform"
                className="text-base font-medium text-orange-600 hover:underline"
                onClick={() => setOpen(false)}
              >
                Join Waitlist
              </Link>
            )}
            {showContact && (
              <Link
                href="/ContactPage"
                className="text-base font-medium text-orange-600 hover:underline"
                onClick={() => setOpen(false)}
              >
                Contact us
              </Link>
            )}
            {children}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}