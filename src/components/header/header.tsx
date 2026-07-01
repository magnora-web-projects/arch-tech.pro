"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/src/lib";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 h-[8vh] bg-white text-slate-800 shadow-sm w-full relative">
      <div className="flex justify-start items-center lg:w-1/5">
        <div className="relative">
          <div className="w-15 items-center justify-center">
            <Image
              src={"/shared/logo.png"}
              alt=""
              width={90}
              height={90}
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-end lg:justify-center items-center flex-1 lg:w-3/5">
        <nav className="flex items-center">
          {navItems.map((item, index) => (
            <div key={item.label} className="flex items-center">
              <Link
                href={item.href}
                className="text-[14px] font-semibold text-[#4A4F5A] hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
              <span className="mx-4 text-gray-400 text-[10px]">●</span>
            </div>
          ))}
          <div className="flex items-center">
            <Link
              href={"#"}
              className="text-[14px] font-semibold text-[#4A4F5A] hover:text-blue-600 transition-colors"
            >
              🌎
            </Link>
          </div>
        </nav>
      </div>

      <div className="hidden lg:flex justify-end items-center w-1/5">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[#2A2F3A] rounded-full text-orange-400 shadow-inner">
            <i className="pbmit-header-button"></i>
          </div>
          <span className="text-[14px] font-semibold text-[#4A4F5A] tracking-wide">
            +49 (0)1764 1462 816
          </span>
        </div>
      </div>

      <button
        className="md:hidden flex items-center text-slate-800"
        onClick={() => setIsMenuOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-slate-800 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
        <nav className="flex items-end flex-col p-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-[13px] font-semibold text-[#4A4F5A] hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center">
            <Link
              href={"#"}
              className="text-[13px] font-semibold text-[#4A4F5A] hover:text-blue-600 transition-colors"
            >
              🌎
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
