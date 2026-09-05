"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "Find the signal.",
    description:
      "We strip away the noise, understand the problem and identify the opportunity hiding underneath it.",
  },
  {
    number: "02",
    title: "DEFINE",
    subtitle: "Shape the direction.",
    description:
      "Strategy becomes structure. We define the experience, the system and the details that make it meaningful.",
  },
  {
    number: "03",
    title: "DESIGN",
    subtitle: "Give ideas a form.",
    description:
      "Visual language, interaction and motion come together to create an interface with its own character.",
  },
  {
    number: "04",
    title: "BUILD",
    subtitle: "Make it real.",
    description:
      "Design meets engineering. We build fast, responsive and immersive experiences using modern technology.",
  },
  {
    number: "05",
    title: "LAUNCH",
    subtitle: "Send it forward.",
    description:
      "The final experience is refined, tested and prepared for the real world.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const stepRefs = useRef<HTMLDivElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const subtitleRefs = useRef<HTMLParagraphElement[]>([]);
  const descriptionRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const dotRefs = useRef<HTMLSpanElement[]>([]);

  const activeIndex = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;

    if (!section || !progress) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      /* ===================================================== */
      /* INITIAL VISIBILITY                                     */
      /* ===================================================== */

      if (reducedMotion) {
        gsap.set(
          [
            ...stepRefs.current,
            ...titleRefs.current,
            ...subtitleRefs.current,
            ...descriptionRefs.current,
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
          }
        );

        gsap.set(progress, {
          scaleY: 1,
        });

        return;
      }

      /* ===================================================== */
      /* HEADER ENTRANCE                                        */
      /* ===================================================== */

      gsap.fromTo(
        ".process-heading",
        {
          y: 70,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".process-intro",
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );

      /* ===================================================== */
      /* STEP ENTRANCE                                          */
      /* ===================================================== */

      gsap.fromTo(
        stepRefs.current,
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 58%",
            once: true,
          },
        }
      );

      /* ===================================================== */
      /* PROGRESS RAIL                                          */
      /* ===================================================== */

      gsap.fromTo(
        progress,
        {
          scaleY: 0,
          transformOrigin: "top",
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 0.8,
          },
        }
      );

      /* ===================================================== */
      /* ACTIVE STEP ENGINE                                     */
      /* ===================================================== */

      const setActiveVisual = (index: number) => {
        if (index === activeIndex.current) return;

        const previous = activeIndex.current;
        activeIndex.current = index;

        const previousTitle = titleRefs.current[previous];
        const previousSubtitle = subtitleRefs.current[previous];
        const previousDescription = descriptionRefs.current[previous];
        const previousNumber = numberRefs.current[previous];
        const previousDot = dotRefs.current[previous];

        const nextTitle = titleRefs.current[index];
        const nextSubtitle = subtitleRefs.current[index];
        const nextDescription = descriptionRefs.current[index];
        const nextNumber = numberRefs.current[index];
        const nextDot = dotRefs.current[index];

        gsap.to(previousTitle, {
          x: 0,
          color: "rgba(255,255,255,0.25)",
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(previousSubtitle, {
          color: "rgba(255,255,255,0.2)",
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(previousDescription, {
          x: 16,
          color: "rgba(255,255,255,0.15)",
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(previousNumber, {
          color: "rgba(255,255,255,0.25)",
          duration: 0.35,
        });

        gsap.to(previousDot, {
          scale: 0.75,
          backgroundColor: "rgba(255,255,255,0.2)",
          duration: 0.35,
        });

        gsap.to(nextTitle, {
          x: 8,
          color: "#ffffff",
          duration: 0.55,
          ease: "power3.out",
        });

        gsap.to(nextSubtitle, {
          color: "rgba(255,255,255,0.5)",
          duration: 0.5,
        });

        gsap.fromTo(
          nextDescription,
          {
            x: 20,
            opacity: 0.45,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
          }
        );

        gsap.to(nextNumber, {
          color: "#ffffff",
          duration: 0.4,
        });

        gsap.to(nextDot, {
          scale: 1,
          backgroundColor: "#ffffff",
          duration: 0.45,
          ease: "back.out(1.5)",
        });
      };

      /* ===================================================== */
      /* FIRST ACTIVE STEP                                      */
      /* ===================================================== */

      gsap.set(titleRefs.current[0], {
        x: 8,
        color: "#ffffff",
      });

      gsap.set(subtitleRefs.current[0], {
        color: "rgba(255,255,255,0.5)",
      });

      gsap.set(descriptionRefs.current[0], {
        x: 0,
        color: "rgba(255,255,255,0.5)",
      });

      gsap.set(numberRefs.current[0], {
        color: "#ffffff",
      });

      gsap.set(dotRefs.current[0], {
        scale: 1,
        backgroundColor: "#ffffff",
      });

      /* ===================================================== */
      /* SCROLL STATE                                            */
      /* ===================================================== */

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",

        onUpdate: (self) => {
          const rawIndex = self.progress * steps.length;

          const index = Math.min(
            steps.length - 1,
            Math.floor(rawIndex)
          );

          if (index !== activeIndex.current) {
            setActiveVisual(index);
          }
        },
      });

      /* ===================================================== */
      /* BOTTOM STATEMENT                                        */
      /* ===================================================== */

      gsap.fromTo(
        ".process-bottom",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-bottom",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-black px-6 py-36 text-white md:px-10 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================================================= */}
        {/* HEADER                                              */}
        {/* ================================================= */}

        <div className="mb-24 grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/30">
              05 / Process
            </p>

            <h2 className="process-heading max-w-4xl text-5xl font-medium tracking-[-0.06em] md:text-8xl">
              From first thought
              <br />
              <span className="text-white/25">
                to final form.
              </span>
            </h2>
          </div>

          <div className="process-intro self-end">
            <p className="max-w-sm text-sm leading-7 text-white/40">
              Great digital work isn't accidental. Every stage has
              a purpose, every decision moves the experience forward.
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* PROCESS SYSTEM                                      */}
        {/* ================================================= */}

        <div className="relative">
          {/* Desktop progress rail */}

          <div className="absolute left-[3px] top-0 hidden h-full w-px bg-white/10 md:block">
            <div
              ref={progressRef}
              className="h-full w-full origin-top bg-white"
            />
          </div>

          <div className="space-y-6 md:space-y-0">
            {steps.map((step, index) => {
              return (
                <div
                  key={step.number}
                  ref={(element) => {
                    if (element) {
                      stepRefs.current[index] = element;
                    }
                  }}
                  className="group relative grid min-h-[190px] gap-8 border-b border-white/10 py-10 md:grid-cols-[120px_1fr_1fr] md:pl-12"
                >
                  {/* ================================================= */}
                  {/* NUMBER                                              */}
                  {/* ================================================= */}

                  <div className="flex items-start gap-4">
                    <span
                      ref={(element) => {
                        if (element) {
                          numberRefs.current[index] = element;
                        }
                      }}
                      className="font-mono text-xs text-white/25 transition-colors"
                    >
                      {step.number}
                    </span>

                    <span
                      ref={(element) => {
                        if (element) {
                          dotRefs.current[index] = element;
                        }
                      }}
                      className="mt-1 h-1.5 w-1.5 scale-75 rounded-full bg-white/20 transition-colors md:absolute md:-left-[2px]"
                    />
                  </div>

                  {/* ================================================= */}
                  {/* TITLE                                               */}
                  {/* ================================================= */}

                  <div>
                    <h3
                      ref={(element) => {
                        if (element) {
                          titleRefs.current[index] = element;
                        }
                      }}
                      className="text-4xl font-medium tracking-[-0.05em] text-white/25 transition-colors md:text-6xl"
                    >
                      {step.title}
                    </h3>

                    <p
                      ref={(element) => {
                        if (element) {
                          subtitleRefs.current[index] = element;
                        }
                      }}
                      className="mt-3 text-sm text-white/20 transition-colors"
                    >
                      {step.subtitle}
                    </p>
                  </div>

                  {/* ================================================= */}
                  {/* DESCRIPTION                                         */}
                  {/* ================================================= */}

                  <div
                    ref={(element) => {
                      if (element) {
                        descriptionRefs.current[index] = element;
                      }
                    }}
                    className="max-w-md self-center text-sm leading-7 text-white/15"
                  >
                    {step.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM STATEMENT                                    */}
        {/* ================================================= */}

        <div className="process-bottom mt-20 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/25">
            One direction
          </p>

          <p className="max-w-xl text-right text-lg tracking-[-0.02em] text-white/40">
            Every stage exists to move one idea closer to becoming
            something people can actually experience.
          </p>
        </div>
      </div>
    </section>
  );
}