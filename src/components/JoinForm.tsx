"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Loader2, Instagram, AlertCircle } from "lucide-react";
import { interests, site } from "@/data/site";
import { playShutterSound } from "@/lib/audio";

type Values = {
  name: string;
  email: string;
  interest: string;
  handle: string;
  message: string;
  company: string;
};

type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "success" | "failed" | "unconfigured";

const empty: Values = {
  name: "",
  email: "",
  interest: "",
  handle: "",
  message: "",
  company: "",
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.interest) e.interest = "Pick the area that pulls you most.";
  const m = v.message.trim().length;
  if (m < 10) e.message = "A few words, at least (10 characters minimum).";
  else if (m > 1000) e.message = "Please keep it under 1000 characters.";
  return e;
}

function Field({
  k,
  label,
  error,
  children,
}: {
  k: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={k} className="mono-label text-[0.62rem] text-obsidian/75 font-medium block mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${k}-err`} className="mt-1.5 text-[0.8rem] font-medium text-crimson flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

export function JoinForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const form = useRef<HTMLFormElement>(null);
  const configured = Boolean(site.formEndpoint);

  const set =
    (k: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (values.company) return; // honeypot — silently ignore bots

    const errs = validate(values);
    setErrors(errs);
    const first = (Object.keys(errs) as (keyof Values)[])[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    playShutterSound();

    if (!configured) {
      // In accordance with guidelines: Never show false success when no remote endpoint is configured
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          interest: values.interest,
          handle: values.handle.trim(),
          message: values.message.trim(),
          source: "shutterspace-website",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("failed");
    }
  }

  const err = (k: keyof Values) => (errors[k] ? `${k}-err` : undefined);

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[26rem] flex-col justify-center">
        <span className="mb-6 grid h-12 w-12 place-items-center bg-obsidian text-ivory">
          <Check size={20} />
        </span>
        <h3 className="display text-[2.8rem] italic leading-tight text-obsidian">Frame received.</h3>
        <p className="mt-4 max-w-md text-obsidian/80 leading-relaxed text-[0.95rem]">
          Your inquiry reached the Shutterspace desk. We will review your portfolio / notes and reach out soon. In the
          meantime, connect with us on Instagram.
        </p>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mono-label mt-8 inline-flex items-center gap-2 text-[0.72rem] text-crimson underline underline-offset-4 font-bold"
        >
          <Instagram size={14} /> {site.instagramHandle} <ArrowUpRight size={13} />
        </a>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={onSubmit} noValidate aria-label="Shutterspace inquiry form" className="space-y-6">
      <Field k="name" error={errors.name} label="Your name *">
        <input
          id="name"
          name="name"
          autoComplete="name"
          className="field"
          placeholder="Full name"
          value={values.name}
          onChange={set("name")}
          aria-invalid={!!errors.name}
          aria-describedby={err("name")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field k="email" error={errors.email} label="Email address *">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            placeholder="you@gcu.ac.in"
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={err("email")}
          />
        </Field>

        <Field k="handle" label="Instagram / Portfolio (optional)">
          <input
            id="handle"
            name="handle"
            className="field"
            placeholder="@yourhandle or URL"
            value={values.handle}
            onChange={set("handle")}
          />
        </Field>
      </div>

      <Field k="interest" error={errors.interest} label="Primary photographic interest *">
        <div className="relative">
          <select
            id="interest"
            name="interest"
            className="field appearance-none pr-8"
            value={values.interest}
            onChange={set("interest")}
            aria-invalid={!!errors.interest}
            aria-describedby={err("interest")}
          >
            <option value="">Select an area of interest…</option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-obsidian/60" />
        </div>
      </Field>

      <Field k="message" error={errors.message} label="Message / What would you like to photograph? *">
        <textarea
          id="message"
          name="message"
          rows={4}
          className="field resize-none"
          placeholder="Tell us about the light you chase, what equipment you have (if any), or what you hope to explore with the collective…"
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={err("message")}
        />
      </Field>

      {/* Honeypot anti-spam field */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input tabIndex={-1} autoComplete="off" name="company" value={values.company} onChange={set("company")} />
        </label>
      </div>

      {status === "unconfigured" && (
        <div
          role="alert"
          className="border-l-2 border-crimson bg-crimson/10 p-4 text-[0.88rem] leading-relaxed text-obsidian space-y-3"
        >
          <p className="font-semibold text-crimson flex items-center gap-2">
            <AlertCircle size={15} /> Form endpoint not yet attached to server
          </p>
          <p className="text-[0.84rem] text-obsidian/80">
            To ensure your submission is never lost, send your message directly to the club on Instagram:
          </p>
          <a
            href={`${site.instagram}?text=${encodeURIComponent(
              `Hi Shutterspace! My name is ${values.name || "a GCU student"}, interested in ${values.interest || "photography"}. Here's my note: ${values.message}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-obsidian px-4 py-2.5 text-[0.72rem] font-mono text-ivory hover:bg-crimson transition-colors"
          >
            <Instagram size={14} /> Message {site.instagramHandle} on Instagram <ArrowUpRight size={13} />
          </a>
        </div>
      )}

      {status === "failed" && (
        <p role="alert" className="text-[0.9rem] font-medium text-crimson">
          Network submission was interrupted. Please reach out to us directly on Instagram{" "}
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            {site.instagramHandle}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative inline-flex items-center gap-3 overflow-hidden bg-obsidian px-8 py-5 text-ivory transition-colors hover:bg-crimson disabled:opacity-60 shadow-xl"
      >
        <span className="mono-label text-[0.75rem] font-bold">
          {status === "sending" ? "Submitting Frame…" : "Send Inquiry"}
        </span>
        {status === "sending" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
        )}
      </button>
    </form>
  );
}
