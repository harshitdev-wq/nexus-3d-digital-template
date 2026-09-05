"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let rafId = 0;

    const interactiveSelector = "a, button, [data-cursor]";

    const moveDot = (x: number, y: number) => {
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      moveDot(mouseX, mouseY);

      const target = (event.target as HTMLElement)?.closest(
        interactiveSelector
      ) as HTMLElement | null;

      if (!target) {
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.opacity = "0.45";
        ring.style.borderColor = "rgba(255,255,255,0.5)";

        return;
      }

      const rect = target.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (mouseX - centerX) * 0.18;
      const offsetY = (mouseY - centerY) * 0.18;

      target.style.translate = `${offsetX}px ${offsetY}px`;

      ring.style.width = "58px";
      ring.style.height = "58px";
      ring.style.opacity = "0.85";
      ring.style.borderColor = "rgba(103,232,249,0.75)";
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement)?.closest(
        interactiveSelector
      ) as HTMLElement | null;

      if (!target) return;

      target.style.transition =
        "translate 400ms cubic-bezier(0.16, 1, 0.3, 1)";

      ring.style.transform = "translate(-50%, -50%) scale(1.05)";
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = (event.target as HTMLElement)?.closest(
        interactiveSelector
      ) as HTMLElement | null;

      if (!target) return;

      target.style.translate = "0 0";

      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.opacity = "0.45";
      ring.style.borderColor = "rgba(255,255,255,0.5)";
      ring.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);

      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 transition-all duration-300 md:block"
      />
    </>
  );
}