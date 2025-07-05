"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const userRes = await fetch("http://localhost:8000/auth/me", { headers });
      const userData = await userRes.json();
      setUser(userData);

      const planRes = await fetch("http://localhost:8000/auth/planner", {
        headers,
      });
      const planData = await planRes.json();
      setPlan(planData.plan);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">📊 Your Dashboard</h1>

      {user && (
        <Card>
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">👤 Profile</h2>
            <p>
              <b>Username:</b> {user.username}
            </p>
            <p>
              <b>GPA:</b> {user.gpa}
            </p>
            <p>
              <b>Branch:</b> {user.branch}
            </p>
            <p>
              <b>Semester:</b> {user.sem}
            </p>
            <p>
              <b>Subjects you're strong in:</b> {user.subin}
            </p>
            <p>
              <b>Subjects you're struggling with:</b> {user.subnin}
            </p>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <Card>
          <CardContent className="p-6 italic text-muted-foreground">
            Generating your plan...
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 prose max-w-none">
            <h2 className="text-xl font-semibold mb-2">
              🧠 Your AI-Generated Study Plan
            </h2>
            <ReactMarkdown>{plan}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
