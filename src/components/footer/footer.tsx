import Link from "next/link";
import Image from "next/image";
import { footerContact, footerLinks } from "@/src/lib";
import { ScrollToTopButton } from "@/src/components";

export default function Footer() {
  return (
    <footer className="backdrop-blur-sm relative w-full bg-transparent text-zinc-400 border-t border-white/10 pt-24 pb-10 overflow-hidden z-10">
      <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-4 flex flex-col">
            <Link
              href="/"
              className="inline-block mb-8 transition-transform hover:scale-105 duration-300 origin-left "
            >
              <Image
                src="/shared/logo.png"
                alt="ARCH-TECH Logo"
                width={70}
                height={70}
                className="object-contain opacity-80"
              />
            </Link>
            <p className="text-zinc-500 text-[14px] font-light leading-relaxed mb-10 pr-8">
              We combine architectural expertise with advanced visualization
              methods to create spaces that go beyond aesthetics, powered by
              precision and spatial logic.
            </p>
            <div className="flex flex-col space-y-5">
              <div className="flex items-start text-[13px] tracking-wide group">
                <span className="text-zinc-600 mr-4 mt-0.5 group-hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span className="group-hover:text-white transition-colors">
                  {footerContact.address}
                </span>
              </div>
              <div className="flex items-center text-[13px] tracking-wide group">
                <span className="text-zinc-600 mr-4 group-hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <a
                  href={`tel:${footerContact.phone.replace(/[^0-9+]/g, "")}`}
                  className="group-hover:text-white transition-colors"
                >
                  {footerContact.phone}
                </a>
              </div>
              <div className="flex items-center text-[13px] tracking-wide group">
                <span className="text-zinc-600 mr-4 group-hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <a
                  href={`mailto:${footerContact.email}`}
                  className="group-hover:text-white transition-colors"
                >
                  {footerContact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6 flex flex-col">
            <h4 className="text-white font-semibold tracking-widest uppercase text-[11px] mb-8">
              Company
            </h4>
            <ul className="flex flex-col space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 text-[14px] font-light hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-white font-semibold tracking-widest uppercase text-[11px] mb-8">
              Expertise
            </h4>
            <ul className="flex flex-col space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 text-[14px] font-light hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col items-start lg:items-end">
            <h4 className="text-white font-semibold tracking-widest uppercase text-[11px] mb-8">
              Follow Us
            </h4>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-zinc-400 hover:bg-white hover:text-black transition-all duration-500"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-zinc-600 text-[12px] font-light tracking-widest uppercase">
            © {new Date().getFullYear()} ARCH-TECH. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link
              href="/privacy"
              className="text-zinc-600 text-[12px] font-light tracking-widest uppercase hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-zinc-600 text-[12px] font-light tracking-widest uppercase hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

      <ScrollToTopButton />

      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[150px] md:text-[250px] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap z-0 tracking-tighter">
        ARCHTECH
      </div>
    </footer>
  );
}
