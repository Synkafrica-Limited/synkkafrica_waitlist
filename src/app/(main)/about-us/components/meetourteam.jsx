// components/MeetOurTeam.jsx
"use client";

import { useRef } from "react"; 
import Image from "next/image"; 
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Image from "next/image";


const TEAM = [
  { name: "Temidayo Faluyi", role: "Chief Executive Officer", photo: "/team/temi.jpg" },
  { name: "Ezra Jethro-Enedouwa", role: "Chief Operations Officer", photo: "/team/ezra.jpg" },
  { name: "Damilola Olanrewaju", role: "Chief Technology Officer", photo: "/team/damie.jpg" },
  { name: "Paul Sola-Eniolawun", role: "Vice President, Engineering", photo: "/team/paul.jpg" },
  { name: "Emmanuel Odeyale", role: "Head of Design", photo: "/team/emmanuel.jpg" },
  { name: "Gaius Richard", role: "Senior DevOps Engineer", photo: "/team/gaius.jpg" },
  { name: "Chelsea Jegede", role: "Head of Partnership", photo: "/team/chelsea.jpg" },
];

export default function MeetOurTeam() {
  return (
    <section className="py-16 bg-shadow-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Meet our Team
      </h2>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-md flex flex-col items-center"
            >
              <div className="w-full relative rounded-t-2xl overflow-hidden
                              aspect-[4/5] sm:aspect-[3/2]"> {/* <-- gives height */}
                <Image
                  src={m.photo}
                  alt={`${m.name} - ${m.role}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{m.name}</h3>
                <p className="text-black dark:text-gray-300 text-sm mt-1">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
