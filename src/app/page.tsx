import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import Intro from "@/components/shared/intro";

export default function HomePage() {
  return (
    <Intro>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
        <PageHeader
          title="SHA Senior App"
          description="A Next.js 16 boilerplate following senior developer conventions."
          className="text-center"
        />
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </Intro>
  );
}
