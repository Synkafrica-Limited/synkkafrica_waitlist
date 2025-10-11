// components/MeetOurTeam.jsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const TEAM = [
  {
    name: "Temidayo Faluyi",
    role: "Chief Executive Officer",
    photo: "/team/temi.jpg",
  },
  {
    name: "Ezra Jethro-Enedouwa",
    role: "Chief Operations Officer",
    photo: "/team/ezra.jpg",
  },
  {
    name: "Damilola Olanrewaju",
    role: "Chief Technology Officer",
    photo: "/team/damie.jpg",
  },
  {
    name: "Paul Sola-Eniolawun",
    role: "Vice President, Engineering",
    photo: "/team/paul.jpg",
  },

    {
      name: "Emmanuel Odeyale",
      role: "Head of Design",
      photo: "/team/emmanuel.jpg",
    },

    {
      name: "Gaius Richard",
      role: "Senior DevOps Engineer",
      photo: "/team/gaius.jpg",
    },

    {
      name: "Chelsea Jegede",
      role: "Head of Partnership",
      photo: "/team/chelsea.jpg",
    },

];

export default function MeetOurTeam() {
  return (
    <section className="py-16 bg-shadow-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Meet our Team
      </h2>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-md flex flex-col items-center"
            >
              <div className="w-full relative rounded-t-2xl overflow-hidden">
                {/* Mobile: taller container and contain so full image is visible */}
                <div className="block sm:hidden h-113 w-full bg-gray-100 dark:bg-gray-800 relative">
                  <Image
                    src={member.photo}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Desktop/tablet: maintain card aspect and cover */}
                <div className="hidden sm:block  sm:aspect-[3/2] w-full h-115 relative">
                  <Image
                    src={member.photo}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
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
    </section>
  );
}
