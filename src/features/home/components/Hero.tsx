"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Scroll distance for the animation
          scrub: true,
          pin: true,
        },
      });

      tl.to(imageWrapperRef.current, {
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        ease: "none",
      });

      return () => {
        tl.kill();
      };
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-cream overflow-hidden flex items-center justify-center px-4 md:px-0"
    >
      {/* Massive Text Behind */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <h1 className="font-serif text-[13vw] md:text-[11vw] tracking-tight font-bold text-navy whitespace-nowrap opacity-90 select-none">
          CLASS OF 2024
        </h1>
      </div>

      {/* Image Wrapper */}
      <div
        ref={imageWrapperRef}
        className="relative z-10 w-[80vw] md:w-[30vw] h-[60vh] md:h-[50vh] rounded-[24px] overflow-hidden shadow-2xl"
      >
        <Image
          src="/Hero.jpg"
          alt="Class of 2024 Hero"
          fill
          priority
          className="object-cover brightness-90 contrast-110"
        />
        {/* Premium color grading overlay */}
        <div className="absolute inset-0 bg-navy/20 mix-blend-multiply pointer-events-none" />
      </div>
    </section>
  );
}
