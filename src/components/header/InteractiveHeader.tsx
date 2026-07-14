"use client";

import Link from "next/link";
import Image from "next/image";
import { useHeaderState } from "@/src/hooks";

interface NavItem {
  label: string;
  href: string;
}

export default function InteractiveHeader({
  navItems,
}: {
  navItems: NavItem[];
}) {
  const { isMenuOpen, scrolled, openMenu, closeMenu } = useHeaderState();

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 mx-auto w-[90%] max-w-[1400px] transition-all duration-500 ease-in-out ${
          scrolled
            ? "top-4 bg-[#050505]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl py-2"
            : "top-6 bg-[#050505]/40 backdrop-blur-md border border-white/10 rounded-2xl py-2 shadow-xl"
        }`}
      >
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center">
            <Link
              href="/"
              className="relative block transition-transform hover:scale-105 duration-300"
            >
              <Image
                src={"/shared/logo.png"}
                alt="Brand Logo"
                width={50}
                height={50}
                loading="eager"
                className="object-contain drop-shadow-lg"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1">
            <nav className="flex items-center bg-[#050505]/50  -lg px-6 py-2.5 rounded-full border border-white/10 shadow-lg">
              {navItems.map((item) => (
                <div key={item.label} className="flex items-center">
                  <Link
                    href={item.href}
                    className="relative text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-100 hover:text-white transition-colors px-4 group drop-shadow-md"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-white group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                  </Link>
                  <span className="text-zinc-500 text-[10px] mx-1 last:hidden">
                    |
                  </span>
                </div>
              ))}
              <div className="flex items-center ml-4 pl-4 border-l border-white/10">
                <Link
                  href={"#"}
                  className="text-[16px] hover:scale-110 transition-all drop-shadow-md"
                  title="Change Language"
                >
                  🌎
                </Link>
              </div>
            </nav>
          </div>

          <div className="flex justify-end items-center space-x-4">
            <div className="hidden md:flex items-center bg-[#0a0a0a]/90  -md border border-white/10 text-zinc-100 px-5 py-2.5 rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-500 cursor-pointer group">
              <div className="flex items-center justify-center w-6 h-6 bg-white/10 group-hover:bg-black/10 rounded-full mr-3 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <span className="text-[12px] font-bold tracking-widest">
                +49 (0)1764 1462 816
              </span>
            </div>

            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-[#050505]/60  -md border border-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all shadow-lg"
              onClick={openMenu}
              aria-label="Open Menu"
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
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80  -md z-[60] lg:hidden transition-opacity duration-300"
          onClick={closeMenu}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#050505] border-l border-white/10 shadow-2xl z-[70] transform transition-transform duration-500 ease-out lg:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <Image
            src={"/shared/logo.png"}
            alt="Logo"
            width={50}
            height={50}
            loading="eager"
          />
          <button
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="text-[13px] uppercase tracking-widest font-semibold text-zinc-400 hover:text-white transition-colors pb-3 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[11px] tracking-widest text-zinc-400 uppercase">
                Language
              </span>
              <Link href={"#"} onClick={closeMenu} className="text-[18px]">
                🌎
              </Link>
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-white/5 bg-[#030303]">
          <div className="flex items-center justify-center w-full bg-white text-black px-5 py-3 rounded-xl shadow-md hover:bg-gray-200 transition-colors">
            <span className="text-[12px] font-bold tracking-widest">
              +49 (0)1764 1462 816
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
