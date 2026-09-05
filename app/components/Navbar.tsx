"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 md:px-12">

        {/* LOGO */}
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div
              className="absolute inset-0 rotate-45 border border-cyan-300/70 transition-all duration-700 group-hover:rotate-[225deg] group-hover:scale-110"
            />

            <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.9)] transition-all duration-500 group-hover:scale-150" />
          </div>

          <span className="text-sm font-semibold tracking-[0.3em] text-white transition-opacity duration-300 group-hover:text-cyan-200">
            NEXUS
          </span>
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-10 md:flex">

          <button
            onClick={() => scrollToSection("philosophy")}
            className="relative text-[10px] tracking-[0.25em] text-white/40 transition-colors duration-300 hover:text-white"
          >
            PHILOSOPHY

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => scrollToSection("capabilities")}
            className="text-[10px] tracking-[0.25em] text-white/40 transition-colors duration-300 hover:text-white"
          >
            CAPABILITIES
          </button>

          <button
            onClick={() => scrollToSection("technology")}
            className="text-[10px] tracking-[0.25em] text-white/40 transition-colors duration-300 hover:text-white"
          >
            TECHNOLOGY
          </button>

          {/* CTA */}
          <button
            onClick={() => scrollToSection("next")}
            data-cursor
            className="group relative overflow-hidden rounded-full border border-white/15 px-6 py-3 text-[10px] tracking-[0.2em] text-white transition-all duration-300 hover:border-cyan-300/50"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              START A PROJECT
            </span>

            <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0" />
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-white transition-all duration-300 ${
                menuOpen
                  ? "translate-y-[4px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`h-px w-full bg-white transition-all duration-300 ${
                menuOpen
                  ? "-translate-y-[4px] -rotate-45"
                  : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          menuOpen
            ? "max-h-[420px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-8">

          <button
            onClick={() => scrollToSection("philosophy")}
            className="border-b border-white/10 py-5 text-left text-xs tracking-[0.3em] text-white/60 transition-colors hover:text-white"
          >
            01 / PHILOSOPHY
          </button>

          <button
            onClick={() => scrollToSection("capabilities")}
            className="border-b border-white/10 py-5 text-left text-xs tracking-[0.3em] text-white/60 transition-colors hover:text-white"
          >
            02 / CAPABILITIES
          </button>

          <button
            onClick={() => scrollToSection("technology")}
            className="border-b border-white/10 py-5 text-left text-xs tracking-[0.3em] text-white/60 transition-colors hover:text-white"
          >
            03 / TECHNOLOGY
          </button>

          <button
            onClick={() => scrollToSection("next")}
            className="mt-6 flex items-center justify-between rounded-full bg-white px-6 py-4 text-left text-[10px] font-medium tracking-[0.25em] text-black"
          >
            <span>START A PROJECT</span>
            <span className="text-lg">→</span>
          </button>

        </div>
      </div>
    </nav>
  );
}