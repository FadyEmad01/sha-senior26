import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import Intro from "@/components/shared/intro";
import Hero from "@/components/landing/hero";

export default function HomePage() {
  return (
    <Intro>
      <Hero />
    </Intro>
  );
}
