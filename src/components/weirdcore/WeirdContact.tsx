"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Instagram, Check, Loader2, Radio, Send, AlertCircle } from "lucide-react";
import { site, weirdInterests } from "@/data/site";
import { Eyeball } from "./Eyeball";
import { PixelCamera, PixelUFO, PixelStar } from "./PixelElements";
import { Wildflowers } from "./Wildflowers";
import { AlienObserver } from "./SpaceAlien";
import { playShutterSound } from "@/lib/audio";

type FormValues = {
  name: string;
  email: string;
  interest: string;
  message: string;
  company: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type FormStatus = "idle" | "sending" | "success" | "failed" | "unconfigured";

const initialValues: FormValues = {
  name: "",
  email: "",
  interest: "",
  message: "",
  company: "",
};

export function WeirdContact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const configured = Boolean(site.formEndpoint);

  const handleChange =
    (k: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      if (errors[k]) setErrors((err) => ({ ...err, [k]: undefined }));
    };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (values.name.trim().length < 2) errs.name = "Identify yourself (min 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      errs.email = "Enter a valid frequency (email).";
    if (!values.interest) errs.interest = "Select your photographic spectrum.";
    if (values.message.trim().length < 10)
      errs.message = "Transmission too brief (10 characters minimum).";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (values.company) return; // honeypot

    playShutterSound();
    if (!validate()) return;

    if (!configured) {
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
          message: values.message.trim(),
          club: "Shutterspace GCU",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="relative bg-[#faf5eb] py-24 sm:py-36 border-b-4 border-ink halftone-bg">
      <div className="mx-auto max-w-[1700px] px-5 sm:px-10">
        {/* Section Header */}
        <div className="mb-14 border-b-2 border-ink pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="dymo-label dymo-red text-xs">SECTION 04</span>
              <span className="pixel-text text-sm font-bold text-ink">
                TRANSMISSION TERMINAL // CONTACT US
              </span>
            </div>
            <h2
              className="display uppercase tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)" }}
            >
              Contact
              <span className="italic text-vermilion ml-3">The Collective</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-mono text-ink/80 leading-relaxed">
              Have a question, want to join the club, or want to exhibit your photographs with us? Intercept the signal or send a
              direct message to our frequency.
            </p>
          </div>
        </div>

        {/* Content Columns: Left Artifacts / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Eyeball, Alien, Botanical & Direct Instagram */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-8">
            {/* Interactive Eyeball Card */}
            <div className="relative border-3 border-ink bg-[#fffef9] p-6 rounded-2xl shadow-[6px_7px_0px_rgba(20,19,18,0.9)] w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="pixel-text text-xs text-vermilion font-bold">● SURVEILLANCE NODE</span>
                <span className="dymo-label text-[0.6rem]">EYE 01</span>
              </div>
              <div className="flex justify-center">
                <Eyeball size={160} label="WE HEAR ALL SIGNALS" />
              </div>
              <p className="pixel-text text-center text-xs text-ink/75 mt-3">
                LOCATED AT GIRIJANANDA CHOWDHURY UNIVERSITY, AZARA
              </p>
            </div>

            {/* Direct Instagram Action Card */}
            <div className="relative border-3 border-ink bg-[#fffdf9] p-6 shadow-[6px_7px_0px_rgba(20,19,18,0.9)] w-full max-w-sm transform -rotate-1">
              <div className="masking-tape -top-3 right-8 w-24" />
              <div className="flex items-center gap-2 mb-2">
                <Instagram size={20} className="text-vermilion" />
                <span className="pixel-text text-base font-bold text-ink">INSTAGRAM PORTAL</span>
              </div>
              <p className="text-xs font-mono text-ink/80 leading-relaxed">
                The fastest way to reach Shutterspace. Drop a DM, share your latest frame, or follow our ongoing campus chronicles.
              </p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playShutterSound()}
                className="mt-4 inline-flex items-center gap-2 border-2 border-ink bg-vermilion px-4 py-2.5 text-cream pixel-text text-sm font-bold shadow-[3px_4px_0px_rgba(20,19,18,1)] hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                <span>VISIT {site.instagramHandle}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Alien Observer & Wildflower accent */}
            <div className="flex items-center gap-4">
              <AlienObserver size={95} />
              <Wildflowers size={80} type="single" />
            </div>
          </div>

          {/* Right Column: Terminal Form */}
          <div className="lg:col-span-7">
            <div className="relative border-3 border-ink bg-[#fffef9] p-6 sm:p-10 shadow-[8px_10px_0px_rgba(20,19,18,0.95)]">
              <div className="masking-tape -top-3 left-10 w-32" />

              <div className="mb-8 flex items-baseline justify-between border-b-2 border-ink pb-4">
                <div>
                  <span className="pixel-text text-sm text-vermilion font-bold">TRANSMISSION ENCRYPTION</span>
                  <h3 className="display text-3xl italic text-ink mt-0.5">Transmit a Message</h3>
                </div>
                <span className="dymo-label text-[0.62rem]">TERMINAL // GCU</span>
              </div>

              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border-3 border-ink bg-crtGreen text-black font-bold">
                    <Check size={28} />
                  </div>
                  <h4 className="display text-3xl italic text-ink">Transmission Received.</h4>
                  <p className="mt-2 text-sm font-mono text-ink/80 max-w-md mx-auto">
                    Your frequency has been recorded by Shutterspace. We will reply to your signal soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 border-2 border-ink bg-ink text-white px-5 py-2 pixel-text text-xs tracking-wider"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="pixel-text text-sm text-ink block font-bold mb-1">
                      OPERATOR NAME *
                    </label>
                    <input
                      name="name"
                      value={values.name}
                      onChange={handleChange("name")}
                      placeholder="Your name or callsign"
                      className="field font-mono"
                    />
                    {errors.name && <p className="mt-1 text-xs text-vermilion font-mono">{errors.name}</p>}
                  </div>

                  {/* Email / Frequency */}
                  <div>
                    <label className="pixel-text text-sm text-ink block font-bold mb-1">
                      EMAIL FREQUENCY *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange("email")}
                      placeholder="you@gcu.ac.in or personal email"
                      className="field font-mono"
                    />
                    {errors.email && <p className="mt-1 text-xs text-vermilion font-mono">{errors.email}</p>}
                  </div>

                  {/* Photographic Spectrum */}
                  <div>
                    <label className="pixel-text text-sm text-ink block font-bold mb-1">
                      PHOTOGRAPHIC SPECTRUM *
                    </label>
                    <select
                      name="interest"
                      value={values.interest}
                      onChange={handleChange("interest")}
                      className="field font-mono bg-transparent"
                    >
                      <option value="">Select an area of interest…</option>
                      {weirdInterests.map((int) => (
                        <option key={int} value={int}>
                          {int}
                        </option>
                      ))}
                    </select>
                    {errors.interest && <p className="mt-1 text-xs text-vermilion font-mono">{errors.interest}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="pixel-text text-sm text-ink block font-bold mb-1">
                      TRANSMISSION / MESSAGE *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={handleChange("message")}
                      placeholder="What light do you chase? Any equipment or ideas you want to explore with the collective?"
                      className="field font-mono resize-none"
                    />
                    {errors.message && <p className="mt-1 text-xs text-vermilion font-mono">{errors.message}</p>}
                  </div>

                  {/* Honeypot */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <input tabIndex={-1} name="company" value={values.company} onChange={handleChange("company")} />
                  </div>

                  {/* Unconfigured Honest Fallback */}
                  {status === "unconfigured" && (
                    <div className="border-2 border-vermilion bg-[#fcf4e8] p-4 text-xs font-mono space-y-2">
                      <p className="font-bold text-vermilion flex items-center gap-1.5">
                        <AlertCircle size={14} /> Server Endpoint Not Bound
                      </p>
                      <p className="text-ink/80">
                        To guarantee your note reaches the club leadership immediately, message us on Instagram:
                      </p>
                      <a
                        href={`${site.instagram}?text=${encodeURIComponent(
                          `Hi Shutterspace! My name is ${values.name || "a GCU student"}. My interest is in ${
                            values.interest || "photography"
                          }. Note: ${values.message}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-ink text-white px-3 py-1.5 rounded pixel-text text-xs"
                      >
                        <Instagram size={13} /> Message {site.instagramHandle} on Instagram <ArrowUpRight size={12} />
                      </a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative inline-flex items-center gap-3 border-3 border-ink bg-ink px-8 py-4 text-cream shadow-[4px_5px_0px_rgba(20,19,18,0.7)] hover:bg-vermilion transition-all active:translate-y-0.5 active:shadow-none"
                  >
                    <span className="pixel-text text-base font-bold tracking-wider">
                      {status === "sending" ? "TRANSMITTING…" : "TRANSMIT TO SHUTTERSPACE"}
                    </span>
                    {status === "sending" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} className="transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
