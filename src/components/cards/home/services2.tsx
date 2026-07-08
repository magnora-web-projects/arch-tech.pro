import Image from "next/image";
import Link from "next/link";
import { ServiceCardItem } from "@/src/lib";

interface ServiceCardProps {
  card: ServiceCardItem;
}

export default function ServiceCard({ card }: ServiceCardProps) {
  return (
    <div className="relative flex-shrink-0 w-[85vw] sm:w-[350px] flex flex-col bg-[#0d0d0d]/40 border border-white/5 backdrop-blur-md rounded-[2rem] overflow-visible group transition-all duration-500 hover:border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
      <div className="p-4 pb-0">
        <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-zinc-900">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover contrast-125 transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            sizes="(max-width: 640px) 85vw, 350px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col p-8 pt-6 flex-grow">
        <span className="text-zinc-600 font-medium text-[13px] tracking-widest mb-3">
          {card.numberPrefix}
        </span>

        <h3 className="text-[22px] font-bold text-gray-200 leading-snug mb-5 group-hover:text-white transition-colors duration-300">
          {card.title}
        </h3>

        <div className="w-full h-[1px] bg-white/5 mb-5" />

        <p className="text-zinc-400 text-[14px] leading-relaxed mb-6 font-light">
          {card.description}
        </p>
      </div>

      <Link
        href={card.link}
        className="absolute -bottom-4 -right-4 w-12 h-12 bg-zinc-900 group-hover:bg-white rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 z-10 shadow-xl group-hover:scale-105"
        draggable={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white group-hover:text-black transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </Link>
    </div>
  );
}
