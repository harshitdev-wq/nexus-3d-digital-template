"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;
    const counter = counterRef.current;
    const line = lineRef.current;

    if (!loader || !logo || !counter || !line) return;

    document.body.style.overflow = "hidden";

    const counterObject = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    tl.to(counterObject, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = Math.round(counterObject.value)
          .toString()
          .padStart(3, "0");
      },
    })
      .to(
        line,
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power2.inOut",
        },
        0
      )
      .fromTo(
        logo,
        {
          y: 30,
          opacity: 0,
          letterSpacing: "0.8em",
        },
        {
          y: 0,
          opacity: 1,
          letterSpacing: "0.35em",
          duration: 1,
          ease: "power3.out",
        },
        0.2
      )
      .to(
        logo,
        {
          scale: 1.08,
          duration: 0.4,
          ease: "power2.inOut",
        },
        1.65
      )
      .to(loader, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.1,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white"
      style={{
        clipPath: "inset(0 0 0 0)",
      }}
    >
      <div className="flex w-full max-w-xl flex-col items-center px-8">
        <div
          ref={logoRef}
          className="text-3xl font-medium tracking-[0.35em] md:text-5xl"
        >
          NEXUS
        </div>

        <div className="mt-10 w-full">
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>Initializing experience</span>

            <span>
              <span ref={counterRef}>000</span>%
            </span>
          </div>

          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              ref={lineRef}
              className="h-full w-full origin-left scale-x-0 bg-white"
            />
          </div>
        </div>

        <div className="mt-6 flex w-full justify-between text-[9px] uppercase tracking-[0.3em] text-white/20">
          <span>Digital Systems</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
}