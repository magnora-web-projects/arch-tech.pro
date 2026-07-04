import Link from "next/link";
import Image from "next/image";
import { footerContact, footerLinks } from "@/src/lib";
import { ScrollToTopButton } from "@/src/components";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#16181E] text-slate-300 border-t border-slate-800 pt-20 pb-10 overflow-hidden">
      <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 flex flex-col">
            <Link
              href="/"
              className="inline-block mb-8 transition-transform hover:scale-105 duration-300 origin-left"
            >
              <Image
                src="/shared/logo.png"
                alt="ARCH-TECH Logo"
                width={80}
                height={80}
                className="object-contain opacity-90"
              />
            </Link>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-8 pr-4">
              We combine architectural expertise with advanced visualization
              methods to create spaces that go beyond aesthetics, powered by
              vision and technology.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start text-[14.5px] group">
                <span className="text-orange-500 mr-4 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
              <div className="flex items-center text-[14.5px] group">
                <span className="text-orange-500 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
              <div className="flex items-center text-[14.5px] group">
                <span className="text-orange-500 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
            <h4 className="text-white font-bold text-[18px] mb-6">Company</h4>
            <ul className="flex flex-col space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-[15px] font-medium hover:text-orange-500 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-white font-bold text-[18px] mb-6">Expertise</h4>
            <ul className="flex flex-col space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-[15px] font-medium hover:text-orange-500 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col items-start lg:items-end">
            <h4 className="text-white font-bold text-[18px] mb-6">Follow Us</h4>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:bg-orange-500 hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800/80">
          <p className="text-slate-500 text-[14px] font-medium tracking-wide">
            © {new Date().getFullYear()} ARCH-TECH. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-slate-500 text-[13px] hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-500 text-[13px] hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <ScrollToTopButton />

      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[150px] md:text-[250px] font-extrabold text-slate-800/10 select-none pointer-events-none whitespace-nowrap z-0 tracking-tighter">
        ARCHTECH
      </div>
    </footer>
  );
}
