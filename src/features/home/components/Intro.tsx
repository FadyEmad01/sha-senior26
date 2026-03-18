"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const text =
  "We arrived as strangers, driven by ambition and endless curiosity. Through late-night study sessions, fleeting moments of quiet reflection, and the roaring energy of our shared triumphs, we found more than just an education. We found a family. These are the memories that shaped our youth and defined our legacy.";

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      // Image Reveal Masks (Awwwards Style clip-path unveil)
      const images = [img1Ref.current, img2Ref.current, img3Ref.current];

      for (let index = 0; index < images.length; index++) {
        const img = images[index];
        if (!img) continue;

        // Initial state for the image container mask
        gsap.set(img, {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        });
        // Initial state for the inner image scale for an unzoom effect
        gsap.set(img.querySelector("img"), { scale: 1.4 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: img,
            start: "top 85%", // Trigger when top of image hits 85% of viewport
            toggleActions: "play none none reverse",
          },
        });

        tl.to(img, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.4,
          ease: "power4.inOut",
          delay: index * 0.15, // Stagger reveals
        }).to(
          img.querySelector("img"),
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=1.2", // Overlap the scale down with the clip-path reveal
        );
      }

      // Parallax effects
      gsap.to(img1Ref.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(img2Ref.current, {
        y: -280,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(img3Ref.current, {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-navy text-cream py-[90px] md:py-[120px] overflow-hidden min-h-[800px] md:min-h-screen flex items-center justify-center"
    >
      <div className="absolute inset-0 w-full h-full max-w-[1440px] mx-auto z-0 pointer-events-none">
        {/* Images Background Layer */}
        <div
          ref={img1Ref}
          className="absolute top-[10%] left-[5%] w-[45%] md:w-[25%] aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl opacity-60"
        >
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070"
            alt="Students together"
            fill
            className="object-cover"
          />
        </div>
        <div
          ref={img2Ref}
          className="absolute top-[20%] right-[0%] md:right-[5%] w-[50%] md:w-[30%] aspect-square rounded-[24px] overflow-hidden shadow-2xl opacity-60"
        >
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070"
            alt="Campus vibes"
            fill
            className="object-cover"
          />
        </div>
        <div
          ref={img3Ref}
          className="absolute bottom-[-10%] md:bottom-[5%] left-[15%] md:left-[35%] w-[60%] md:w-[40%] aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl opacity-60"
        >
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070"
            alt="Graduation hats"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center pointer-events-none">
        {/* Text Foreground Layer */}
        <ScrollReveal
          baseOpacity={0.1}
          baseRotation={2}
          blurStrength={3}
          containerClassName="w-full flex justify-center"
          textClassName="font-sans text-[60px] md:text-[80px] lg:text-[60px] font-normal leading-[1.2] text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          rotationEnd="bottom 40%"
          wordAnimationEnd="bottom 40%"
        >
          {text}
        </ScrollReveal>
      </div>
    </section>
  );
}
