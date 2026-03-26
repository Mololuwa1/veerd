"use client";

import { useState } from "react";

interface EmailCaptureProps {
  placement?: "hero" | "footer" | "inline";
}

export default function EmailCapture({ placement = "inline" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: placement }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  };

  if (status === "success") {
    return (
      <p className="text-[15px] text-primary font-medium">
        You are on the list. We will be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="h-12 text-[16px] bg-white border border-border rounded-lg px-4 text-textPrimary placeholder:text-textSecondary/60 focus:outline-none focus:border-primary transition-colors w-full sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 text-[15px] px-6 bg-textPrimary text-background font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap w-full sm:w-auto"
        >
          {status === "loading" ? (
            <span className="inline-block w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
          ) : (
            "Get early access"
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="text-[13px] text-[#D9705A] mt-2">{errorMessage}</p>
      )}
    </form>
  );
}
