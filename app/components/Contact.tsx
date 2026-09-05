"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const arrowRef = useRef<HTMLSpanElement>(null);

  /* ======================================================= */
  /* CTA HOVER                                                */
  /* ======================================================= */

  const handleEnter = () => {
    if (!buttonRef.current || !arrowRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 1.025,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(arrowRef.current, {
      x: 8,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!buttonRef.current || !arrowRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  /* ======================================================= */
  /* SCROLL ENTRANCE                                          */
  /* ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [
            topRef.current,
            eyebrowRef.current,
            titleRef.current,
            descriptionRef.current,
            buttonRef.current,
            metadataRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
          }
        );

        return;
      }

      /* =================================================== */
      /* MAIN ENTRANCE                                         */
      /* =================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .fromTo(
          topRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          }
        )
        .fromTo(
          eyebrowRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.97,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.25,
            ease: "power4.out",
          },
          "-=0.25"
        )
        .fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.35)",
          },
          "-=0.45"
        )
        .fromTo(
          metadataRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.35"
        );

      /* =================================================== */
      /* TITLE DEPTH                                            */
      /* =================================================== */

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -45,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }

      /* =================================================== */
      /* DESCRIPTION DEPTH                                     */
      /* =================================================== */

      if (descriptionRef.current) {
        gsap.to(descriptionRef.current, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      }

      /* =================================================== */
      /* ATMOSPHERIC GLOW                                       */
      /* =================================================== */

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.18,
          x: 100,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="next"
      className="relative min-h-screen overflow-hidden bg-black px-6 py-32 text-white md:px-10 md:py-48"
    >
      {/* =================================================== */}
      {/* BACKGROUND                                            */}
      {/* =================================================== */}

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[45rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[150px]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,255,255,0.025),transparent_48%)]" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-between">
        {/* ================================================= */}
        {/* TOP                                                 */}
        {/* ================================================= */}

        <div
          ref={topRef}
          className="flex items-center justify-between border-b border-white/10 pb-6"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/30">
            06 / Start a project
          </span>

          <span className="text-[10px] uppercase tracking-[0.35em] text-white/30">
            Let&apos;s make something
          </span>
        </div>

        {/* ================================================= */}
        {/* MAIN                                                */}
        {/* ================================================= */}

        <div className="py-24">
          <p
            ref={eyebrowRef}
            className="mb-8 text-xs uppercase tracking-[0.3em] text-white/30"
          >
            Have an idea?
          </p>

          <h2
            ref={titleRef}
            className="max-w-6xl text-[clamp(4rem,11vw,11rem)] font-medium leading-[0.82] tracking-[-0.08em] will-change-transform"
          >
            LET&apos;S MAKE
            <br />
            <span className="text-white/25">
              SOMETHING
            </span>
            <br />
            <span className="text-white">
              IMPOSSIBLE.
            </span>
          </h2>

          <p
            ref={descriptionRef}
            className="mt-12 max-w-lg text-base leading-7 text-white/40 md:text-lg will-change-transform"
          >
            From ambitious ideas to digital products that demand
            attention. Tell us what you&apos;re imagining.
          </p>

          {/* ================================================= */}
          {/* CTA                                                 */}
          {/* ================================================= */}

          <a
            ref={buttonRef}
            href="mailto:hello@nexus.studio"
            data-cursor="START"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="group mt-12 inline-flex items-center gap-8 rounded-full border border-white/20 bg-white px-7 py-5 text-sm font-medium text-black transition-colors duration-500 hover:bg-white/90 focus-visible:outline-none"
          >
            <span>START A PROJECT</span>

            <span
              ref={arrowRef}
              className="text-xl leading-none"
            >
              →
            </span>
          </a>
        </div>

        {/* ================================================= */}
        {/* BOTTOM METADATA                                      */}
        {/* ================================================= */}

        <div
          ref={metadataRef}
          className="grid gap-8 border-t border-white/10 pt-8"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Email
              </p>

              <a
                href="mailto:hello@nexus.studio"
                data-cursor="EMAIL"
                className="mt-3 inline-block text-sm text-white/50 transition-colors hover:text-white"
              >
                hello@nexus.studio
              </a>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Availability
              </p>

              <p className="mt-3 text-sm text-white/50">
                Taking on selected projects
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Based anywhere
              </p>

              <p className="mt-3 text-sm text-white/50">
                Working globally
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}