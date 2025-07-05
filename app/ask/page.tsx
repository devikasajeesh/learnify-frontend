"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/qa/ai-answer?q=${encodeURIComponent(question)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setAnswer(data.answer);
    } catch (e) {
      setAnswer("❌ Failed to fetch AI answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Ask Learnify++ AI 🤖</h2>
          <Textarea
            placeholder="e.g., What is Fourier Transform?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button onClick={askAI} disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </Button>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="p-6 text-muted-foreground italic">
            Generating answer...
          </CardContent>
        </Card>
      )}

      {!loading && answer && (
        <Card>
          <CardContent className="p-6 prose max-w-none">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
