"use client";

import { useState } from "react";
import { getSimilarQuestions } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<[string, number][]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await getSimilarQuestions(query);
      setResults(res);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" space-y-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Semantic Search 🔍</h2>
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., How do I understand convolution?"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search Similar Questions"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map(([question, userId], i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <p className="font-medium">{question}</p>
                <p className="text-sm text-muted-foreground">
                  Asked by user #{userId}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
