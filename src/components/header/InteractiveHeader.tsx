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
            ? "top-4 bg-white/85 backdrop-blur-xl shadow-lg border border-white/20 rounded-2xl py-2"
            : "top-6 bg-white/60 backdrop-blur-md shadow-sm border border-white/40 rounded-2xl py-3"
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
                width={65}
                height={65}
                loading="eager"
                className="object-contain"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1">
            <nav className="flex items-center bg-white/40 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/50">
              {navItems.map((item) => (
                <div key={item.label} className="flex items-center">
                  <Link
                    href={item.href}
                    className="relative text-[13px] uppercase tracking-wider font-bold text-slate-700 hover:text-orange-500 transition-colors px-3 group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-orange-500 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300 rounded-full"></span>
                  </Link>
                  <span className="text-slate-300 text-[10px] mx-1 last:hidden">
                    ●
                  </span>
                </div>
              ))}
              <div className="flex items-center ml-4 pl-4 border-l border-slate-300/50">
                <Link
                  href={"#"}
                  className="text-[16px] hover:scale-110 transition-transform"
                  title="Change Language"
                >
                  🌎
                </Link>
              </div>
            </nav>
          </div>

          <div className="flex justify-end items-center space-x-4">
            <div className="hidden md:flex items-center bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-orange-500 transition-colors duration-300 cursor-pointer group">
              <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full mr-3 group-hover:bg-white/30 transition-colors">
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
              <span className="text-[13px] font-semibold tracking-wide">
                +49 (0)1764 1462 816
              </span>
            </div>

            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-full hover:bg-orange-500 transition-colors"
              onClick={openMenu}
              aria-label="Open Menu"
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
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[70] transform transition-transform duration-400 ease-out lg:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <Image
            src={"/shared/logo.png"}
            alt="Logo"
            width={50}
            height={50}
            loading="eager"
          />
          <button
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-800 hover:bg-slate-200 transition-colors"
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
                className="text-[15px] uppercase tracking-wide font-bold text-slate-700 hover:text-orange-500 transition-colors pb-2 border-b border-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-[13px] font-bold text-slate-700 uppercase">
                Language
              </span>
              <Link href={"#"} onClick={closeMenu} className="text-[20px]">
                🌎
              </Link>
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center justify-center w-full bg-slate-900 text-white px-5 py-3 rounded-xl shadow-md hover:bg-orange-500 transition-colors">
            <span className="text-[14px] font-bold tracking-wider">
              +49 (0)1764 1462 816
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
