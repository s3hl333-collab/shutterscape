"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ART } from "@/lib/art";

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bone)",
        color: "var(--ink)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav className="nv" aria-label="Admin Navigation">
        <a className="w" href="/">
          <span
            className="in"
            dangerouslySetInnerHTML={{ __html: ART.eye() }}
          />
          shutterscape
        </a>
        <a href="/">← Back to Website</a>
      </nav>

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px 60px",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "var(--wh)",
            border: "4px solid var(--ink)",
            boxShadow: "10px 10px 0 var(--ink)",
            padding: "36px",
            width: "min(460px, 100%)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "64px",
              marginBottom: "14px",
            }}
            dangerouslySetInnerHTML={{ __html: ART.camera() }}
          />
          <h1 style={{ fontSize: "44px", lineHeight: 1, marginBottom: "8px" }}>
            Admin Login
          </h1>
          <p style={{ margin: "0 0 24px", fontSize: "15px" }}>
            Authorized access for Shutterscape core members to manage Gallery
            frames, Events &amp; Notices, and Members.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "16px" }}
          >
            <label
              style={{
                display: "grid",
                gap: "6px",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink)",
              }}
            >
              Username or Email
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin or shutterscape@gcuniversity.ac.in"
                required
                style={{
                  padding: "11px 12px",
                  border: "3px solid var(--ink)",
                  background: "var(--bone)",
                  color: "var(--ink)",
                  font: "16px Syne, sans-serif",
                }}
              />
            </label>

            <label
              style={{
                display: "grid",
                gap: "6px",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink)",
              }}
            >
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  padding: "11px 12px",
                  border: "3px solid var(--ink)",
                  background: "var(--bone)",
                  color: "var(--ink)",
                  font: "16px Syne, sans-serif",
                }}
              />
            </label>

            {error && (
              <div
                style={{
                  padding: "10px 12px",
                  background: "var(--tom)",
                  color: "#fff",
                  border: "2px solid var(--ink)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="bt"
              disabled={loading}
              style={{ width: "100%", textAlign: "center", marginTop: "6px" }}
            >
              {loading ? "Verifying..." : "Enter Admin Dashboard →"}
            </button>
          </form>

          <p
            style={{
              margin: "20px 0 0",
              fontSize: "12px",
              opacity: 0.75,
              borderTop: "2px dashed var(--ink)",
              paddingTop: "12px",
            }}
          >
            Default seeded admin credentials: username <code>admin</code> /
            password <code>shutterscape2026</code> (configurable via{" "}
            <code>.env.local</code> or MongoDB <code>admins</code> collection).
          </p>
        </div>
      </main>
    </div>
  );
}
