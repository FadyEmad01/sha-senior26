"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

const vignettes = [
  {
    id: 1,
    title: "The Beginning",
    description:
      "When we first stepped onto the quad, strangers bound by a shared destination. Everything was new, terrifying, and completely electric.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
  },
  {
    id: 2,
    title: "Late Nights",
    description:
      "Library silhouettes, endless coffee, and the quiet camaraderie of shared struggle. We found our truest friends when the world fell asleep.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070",
  },
  {
    id: 3,
    title: "The Memories",
    description:
      "Moments caught in between—the laughs, the games, the fleeting seconds under Stadium lights that we swore we'd never forget.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070",
  },
  {
    id: 4,
    title: "The Finale",
    description:
      "The culmination of it all. Caps in the air, a legacy cemented in time. We leave these halls, but they rarely ever leave us.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function EditorialAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop: Horizontal flex layout pinned and scrubbed
        vignettes.forEach((_, index) => {
          if (index === 0) {
            gsap.set(containerRefs.current[index], { flex: 3 });
            gsap.set(titleRefs.current[index], { opacity: 1, y: 0 });
            gsap.set(descRefs.current[index], {
              height: "auto",
              opacity: 1,
              marginTop: 16,
            });
            gsap.set(imageRefs.current[index], {
              scale: 1,
              filter: "blur(0px) brightness(1) grayscale(0)",
            });
            gsap.set(overlayRefs.current[index], { opacity: 1 });
          } else {
            gsap.set(containerRefs.current[index], { flex: 1 });
            gsap.set(titleRefs.current[index], { opacity: 0.3, y: 10 });
            gsap.set(descRefs.current[index], {
              height: 0,
              opacity: 0,
              marginTop: 0,
            });
            gsap.set(imageRefs.current[index], {
              scale: 1.05,
              filter: "blur(3px) brightness(0.5) grayscale(0.8)",
            });
            gsap.set(overlayRefs.current[index], { opacity: 0.4 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%", // 3x viewport height scrub
            scrub: 1, // 1 second smoothing
            pin: true,
          },
        });

        for (let i = 1; i < vignettes.length; i++) {
          tl.to(
            containerRefs.current[i - 1],
            { flex: 1, ease: "none", duration: 1 },
            `step${i}`,
          )
            .to(
              titleRefs.current[i - 1],
              { opacity: 0.3, y: 10, ease: "none", duration: 1 },
              `step${i}`,
            )
            .to(
              descRefs.current[i - 1],
              {
                height: 0,
                opacity: 0,
                marginTop: 0,
                ease: "none",
                duration: 1,
              },
              `step${i}`,
            )
            .to(
              imageRefs.current[i - 1],
              {
                scale: 1.05,
                filter: "blur(3px) brightness(0.5) grayscale(0.8)",
                ease: "none",
                duration: 1,
              },
              `step${i}`,
            )
            .to(
              overlayRefs.current[i - 1],
              { opacity: 0.4, ease: "none", duration: 1 },
              `step${i}`,
            )

            .to(
              containerRefs.current[i],
              { flex: 3, ease: "none", duration: 1 },
              `step${i}`,
            )
            .to(
              titleRefs.current[i],
              { opacity: 1, y: 0, ease: "none", duration: 1 },
              `step${i}`,
            )
            .to(
              descRefs.current[i],
              {
                height: "auto",
                opacity: 1,
                marginTop: 16,
                ease: "none",
                duration: 1,
              },
              `step${i}`,
            )
            .to(
              imageRefs.current[i],
              {
                scale: 1,
                filter: "blur(0px) brightness(1) grayscale(0)",
                ease: "none",
                duration: 1,
              },
              `step${i}`,
            )
            .to(
              overlayRefs.current[i],
              { opacity: 1, ease: "none", duration: 1 },
              `step${i}`,
            );
        }
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: Vertical layout, expands as they enter center viewport
        vignettes.forEach((_, index) => {
          gsap.set(containerRefs.current[index], { height: "25vh" });
          gsap.set(titleRefs.current[index], { opacity: 0.3, y: 10 });
          gsap.set(descRefs.current[index], {
            height: 0,
            opacity: 0,
            marginTop: 0,
          });
          gsap.set(imageRefs.current[index], {
            scale: 1.05,
            filter: "blur(3px) brightness(0.5) grayscale(0.8)",
          });
          gsap.set(overlayRefs.current[index], { opacity: 0.4 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRefs.current[index],
              start: "top center",
              end: "bottom center",
              toggleActions: "play reverse play reverse",
            },
          });

          tl.to(
            containerRefs.current[index],
            { height: "60vh", duration: 0.5, ease: "power2.out" },
            0,
          )
            .to(
              titleRefs.current[index],
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              0,
            )
            .to(
              descRefs.current[index],
              {
                height: "auto",
                opacity: 1,
                marginTop: 16,
                duration: 0.5,
                ease: "power2.out",
              },
              0,
            )
            .to(
              imageRefs.current[index],
              {
                scale: 1,
                filter: "blur(0px) brightness(1) grayscale(0)",
                duration: 0.5,
                ease: "power2.out",
              },
              0,
            )
            .to(
              overlayRefs.current[index],
              { opacity: 1, duration: 0.5, ease: "power2.out" },
              0,
            );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] bg-navy overflow-hidden flex flex-col md:flex-row"
    >
      {vignettes.map((item, index) => {
        return (
          <div
            key={item.id}
            ref={(el) => {
              containerRefs.current[index] = el;
            }}
            className="group relative overflow-hidden border-b md:border-b-0 md:border-r border-[#ffffff20] last:border-b-0 last:border-r-0"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Image
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                src={item.image}
                alt={item.title}
                fill
                className="object-cover origin-center"
              />
            </div>

            {/* Gradient Overlay for Text Legibility */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/10 to-transparent pointer-events-none"
            />

            {/* Content Layer */}
            <div className="absolute inset-0 p-6 md:p-8 lg:p-12 flex flex-col justify-end pointer-events-none">
              <div className="flex flex-col overflow-hidden">
                <div
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  className="flex items-end gap-0"
                >
                  <h2 className="font-serif text-[clamp(2rem,4vw,5rem)] font-bold text-cream whitespace-nowrap drop-shadow-xl min-w-max flex items-baseline">
                    <span className="text-sand text-lg md:text-xl lg:text-3xl mr-4 md:mr-6 font-sans tracking-widest font-normal">
                      0{item.id}.
                    </span>
                    {item.title}
                  </h2>
                </div>

                <div
                  ref={(el) => {
                    descRefs.current[index] = el;
                  }}
                  className="overflow-hidden"
                >
                  <p className="font-sans text-cream/90 text-[clamp(0.875rem,1.5vw,1.125rem)] max-w-lg leading-relaxed md:ml-[3.5rem] lg:ml-[4.5rem]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
