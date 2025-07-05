import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="text-center py-20 space-y-6">
      <h1 className="text-5xl font-bold">📚 Learnify++</h1>
      <p className="text-muted-foreground max-w-xl mx-auto">
        AI-powered academic assistant that helps you study smarter — not harder.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/ask">
          <Button size="lg">Ask AI</Button>
        </Link>
        <Link href="/search">
          <Button variant="outline" size="lg">
            Semantic Search
          </Button>
        </Link>
      </div>
    </section>
  );
}
