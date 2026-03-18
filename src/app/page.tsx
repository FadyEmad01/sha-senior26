import Footer from "@/features/home/components/Footer";
import Hero from "@/features/home/components/Hero";

import Intro from "@/features/home/components/Intro";

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <Intro />
      <Footer />
    </main>
  );
}
