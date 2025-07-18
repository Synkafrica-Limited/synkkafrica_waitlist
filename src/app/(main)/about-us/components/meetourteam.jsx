// components/MeetOurTeam.jsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const TEAM = [
  {
    name: "Temidayo Faluyi",
    role: "CEO & Founder",
    photo: "/team/temidayo.jpg",
  },
  {
    name: "Ezra Jethro-Enedouwa",
    role: "Co-founder, Technology",
    photo: "/team/ezra.jpg",
  },
  {
    name: "Damilola Olanrewaju",
    role: "Co-founder, Partnerships",
    photo: "/team/issac.jpg",
  },
  {
    name: "Paul Sola-Eniolawun",
    role: "Technical Lead, Engineering",
    photo: "/team/paul.jpg",
  },

    {
      name: "Emmanuel Odeyale",
      role: "Product Designer (UI/UX)",
      photo: "/team/emmanuel.jpg",
    },

    {
      name: "Gaius Richard",
      role: "Full Stack Developer",
      photo: "/team/gaius.jpg",
    },

    {
      name: "John Doe",
      role: "Lead, Marketing",
      photo: "/team/john.jpg",
    },
];

export default function MeetOurTeam() {
  const containerRef = useRef(null);

  const scroll = (dir) => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.offsetWidth * 0.8;
    containerRef.current.scrollBy({
      left: dir === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-shadow-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Meet our Team
      </h2>
      <div className="relative">
        {/* Carousel Buttons */}
        <button
          onClick={() => scroll("prev")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
          aria-label="Scroll left"
        >
          <IoChevronBackOutline size={24} className="text-gray-700 dark:text-gray-200" />
        </button>
        <button
          onClick={() => scroll("next")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
          aria-label="Scroll right"
        >
          <IoChevronForwardOutline size={24} className="text-gray-700 dark:text-gray-200" />
        </button>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto no-scrollbar space-x-6 px-12"
        >
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex-shrink-0 w-64 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-md"
            >
              <div className="w-full h-64 relative rounded-t-2xl overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
