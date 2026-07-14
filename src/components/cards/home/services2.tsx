import Image from "next/image";
import Link from "next/link";
import { ServiceCardItem } from "@/src/lib";

interface ServiceCardProps {
  card: ServiceCardItem;
}

export default function ServiceCard({ card }: ServiceCardProps) {
  return (
    <div className="relative flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[500px] flex flex-col bg-[#0d0d0d]/40 border border-white/5  backdrop-blur-md rounded-[2.5rem] overflow-visible group transition-all duration-500 hover:border-white/20 ">
      <div className="p-5 pb-0">
        <div className="relative w-full h-[280px] rounded-[1.8rem] overflow-hidden bg-zinc-900">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover contrast-125 transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 420px, 500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col p-10 pt-8 flex-grow">
        <span className="text-zinc-600 font-medium text-[14px] tracking-widest mb-4">
          {card.numberPrefix}
        </span>

        <h3 className="text-[26px] font-bold text-gray-200 leading-snug mb-6 group-hover:text-white transition-colors duration-300">
          {card.title}
        </h3>

        <div className="w-full h-[1px] bg-white/5 mb-6" />

        <p className="text-zinc-400 text-[15px] leading-relaxed mb-8 font-light">
          {card.description}
        </p>
      </div>

      <Link
        href={card.link}
        className="absolute -bottom-6 -right-4 w-16 h-16 bg-zinc-900 group-hover:bg-white rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 z-10 shadow-2xl group-hover:scale-105"
        draggable={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white group-hover:text-black transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </Link>
    </div>
  );
}
