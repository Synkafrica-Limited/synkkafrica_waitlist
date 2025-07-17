// app/(main)/join_waitlist/WaitlistForm.jsx
'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// Dynamically import react-phone-input-2 to avoid SSR issues
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false })
import 'react-phone-input-2/lib/style.css'
import './phoneinput-custom.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Button from '../../../components/ui/buttons'
import HeaderNavbar from '../../../components/HeaderNavbar'
import { AnimatedField } from '../../contact-us/components/AnimatedField'

const services  = ['Convenience Services','Beach & Resorts','Transportation(Cars, Flights)','Dining & Reservations','Packages']
const referrals = ['Friend','Social Media','Ad','Other']

export default function WaitlistForm() {
  const searchParams  = useSearchParams()
  const initialEmail  = searchParams.get('email') || ''

  const [form, setForm] = useState({
    name:        '',
    email:       initialEmail,
    countryCode: '+234',
    phone:       '',
    referral:    '',
    service:     '',
    updates:     false,
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function handleCountryCodeChange(e) {
    setForm(f => ({ ...f, countryCode: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    try {
      const res = await fetch('/.netlify/functions/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to join waitlist');
      // Optionally, you can clear the form here
      // setForm({ ...form, name: '', email: '', phone: '', referral: '', service: '', updates: false });
    } catch (err) {
      alert('There was a problem joining the waitlist. Please try again.');
      setSubmitted(false);
      return;
    }
    // Show success for 2s, then reset
    setTimeout(() => setSubmitted(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-zinc-100
                    dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
                    transition-colors duration-700 flex flex-col">
      <HeaderNavbar showWaitlist={false} showContact />

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 px-4 py-8">
        {/* ==== Illustration (desktop only) ==== */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: 30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="hidden md:flex flex-1 items-center justify-center"
        >
          {/* Insert your SVG or Lottie here */}
          <motion.svg
            width="320" height="320" viewBox="0 0 320 320"
            className="drop-shadow-2xl"
            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <ellipse cx="160" cy="260" rx="120" ry="30"
                     fill="#F18A83" fillOpacity="0.15" />
            <motion.circle cx="160" cy="140" r="80" fill="#E47458"
              initial={{ scale: 0.7 }}
              animate={{ scale: [0.7, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
            <motion.circle cx="160" cy="140" r="50" fill="#FFE7E5"
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
            {/* …other animated shapes… */}
          </motion.svg>
        </motion.div>

        {/* ==== Form ==== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <AnimatePresence>
            {submitted
              ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <motion.svg
                    className="w-16 h-16 text-green-500 mb-4"
                    fill="none" stroke="currentColor" strokeWidth={2}
                    viewBox="0 0 24 24"
                    initial={{ scale: 0 }} animate={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
                    Added to Waitlist!
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-300">
                    Thank you for joining. We'll keep you updated!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="w-full max-w-md bg-white dark:bg-zinc-900
                             rounded-xl shadow-lg p-8 space-y-4"
                >
                  <h2 className="text-2xl font-bold text-center mb-4">
                    Let’s add you to the waitlist
                  </h2>

                  <AnimatedField label="Full Name">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer w-full px-4 py-3 rounded border
                                 border-zinc-200 dark:border-zinc-700
                                 bg-zinc-50 dark:bg-zinc-800
                                 text-zinc-900 dark:text-white
                                 focus:outline-none focus:ring-2 focus:ring-orange-400
                                 transition"
                    />
                  </AnimatedField>

                  <AnimatedField label="Email">
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="joe@example.com"
                      required
                      className="peer w-full px-4 py-3 rounded border
                                 border-zinc-200 dark:border-zinc-700
                                 bg-zinc-50 dark:bg-zinc-800
                                 text-zinc-900 dark:text-white
                                 focus:outline-none focus:ring-2 focus:ring-orange-400
                                 transition"
                    />
                  </AnimatedField>

                  {/* Phone + Country */}
                  <AnimatedField label="">
                    <div className="w-full">
                      <PhoneInput
                        country={form.countryCode.replace('+', '') || 'ng'}
                        value={form.countryCode + form.phone}
                        onChange={(value, data, event, formattedValue) => {
                          const dialCode = '+' + data.dialCode;
                          const phone = value.replace(data.dialCode, '');
                          setForm(f => ({ ...f, countryCode: dialCode, phone }));
                        }}
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: false,
                          className: 'peer w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition',
                        }}
                        containerClass="w-full"
                        buttonClass="!border-none !bg-transparent"
                        dropdownClass="phone-dropdown-custom"
                        searchClass="phone-dropdown-search"
                        enableSearch
                        disableSearchIcon={false}
                        specialLabel=""
                        autoFormat={true}
                      />
                    </div>
                  </AnimatedField>

                  {/* Referral */}
                  <select
                    name="referral"
                    value={form.referral}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded border
                               border-zinc-200 dark:border-zinc-700
                               bg-zinc-50 dark:bg-zinc-800
                               text-zinc-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-orange-400
                               transition"
                  >
                    <option value="">How did you hear about us?</option>
                    {referrals.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>

                  {/* Service Interest */}
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded border
                               border-zinc-200 dark:border-zinc-700
                               bg-zinc-50 dark:bg-zinc-800
                               text-zinc-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-orange-400
                               transition"
                  >
                    <option value="">Service of Interest</option>
                    {services.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="updates"
                      checked={form.updates}
                      onChange={handleChange}
                      className="accent-orange-500"
                    />
                    Check to receive updates via email
                  </label>

                  <Button
                    type="submit"
                    variant="filled"
                    size="md"
                    className="w-full"
                    disabled={submitted}
                  >
                    {submitted ? 'Added!' : 'Join waitlist'}
                  </Button>
                </motion.form>
              )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}
