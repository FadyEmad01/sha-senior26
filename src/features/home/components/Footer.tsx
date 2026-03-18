"use client";

import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    // Access global lenis instance created in SmoothScroll
    // biome-ignore lint/suspicious/noExplicitAny: allow global lenis
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative h-[420px] w-full bg-cream text-navy flex flex-col items-center justify-center pt-12 pb-8 overflow-hidden">
      <div className="relative w-40 h-40 rounded-[24px] overflow-hidden mb-8 shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070"
          alt="Forever"
          fill
          className="object-cover"
        />
      </div>

      <h2 className="font-serif text-5xl font-medium mb-8">Forever.</h2>

      <button
        type="button"
        onClick={scrollToTop}
        className="px-6 py-3 bg-sand text-navy rounded-full font-sans font-medium hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer"
      >
        Back to Top
      </button>
    </footer>
  );
}
