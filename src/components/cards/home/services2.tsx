import Image from "next/image";
import Link from "next/link";
import { ServiceCardItem } from "@/src/lib";

interface ServiceCardProps {
  card: ServiceCardItem;
}

export default function ServiceCard({ card }: ServiceCardProps) {
  return (
    <div className=" relative flex-shrink-0 w-[85vw] sm:w-[350px] flex flex-col bg-[#232732] rounded-[2rem] overflow-visible group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
      <div className="p-4 pb-0">
        <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-slate-800">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
            sizes="(max-width: 640px) 85vw, 350px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#232732]/80 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col p-8 pt-6 flex-grow">
        <span className="text-slate-500 font-medium text-[13px] tracking-widest mb-3">
          {card.numberPrefix}
        </span>

        <h3 className="text-[22px] font-bold text-[#D4A394] leading-snug mb-5 group-hover:text-orange-400 transition-colors duration-300">
          {card.title}
        </h3>

        <div className="w-full h-[1px] bg-slate-700/50 mb-5" />

        <p className="text-[#8A8F9A] text-[14px] leading-relaxed mb-6">
          {card.description}
        </p>
      </div>

      <Link
        href={card.link}
        className="absolute -bottom-5 -right-5 w-14 h-14 bg-[#3B3F4A] group-hover:bg-orange-500 rounded-full border-[6px] border-white flex items-center justify-center transition-all duration-300 z-10 shadow-lg group-hover:scale-110"
        draggable={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </Link>
    </div>
  );
}
