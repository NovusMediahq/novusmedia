"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Upload, X, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SERVICES = [
  "UI/Product Motion",
  "SaaS Product Demo",
  "Promo Reel",
  "Brand Animation",
  "AI Product Video",
  "Custom Project",
];

const BUDGETS = [
  { label: "Under $500", value: "Under $500" },
  { label: "$500–$1,000", value: "$500–$1000" },
  { label: "$1,000–$2,000", value: "$1000–$2000" },
  { label: "$2,000+", value: "$2000+" },
  { label: "Let's Discuss", value: "Let's Discuss" },
];

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  services: string[];
  budget: string;
  deadline: string;
  description: string;
  referenceLinks: string;
  consentGiven: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  description?: string;
  consentGiven?: string;
}

function FloatingInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  optional,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative group transition-all duration-300 ${
          error ? "ring-1 ring-red-500/50" : ""
        }`}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? (placeholder ?? "") : ""}
          className={`w-full bg-transparent border rounded-xl px-4 pt-6 pb-3 text-sm text-foreground outline-none transition-all duration-300 peer ${
            focused
              ? "border-foreground/60 shadow-[0_0_0_1px_oklch(0.94_0.005_90_/_0.1)]"
              : error
              ? "border-red-500/50"
              : "border-foreground/10 hover:border-foreground/25"
          }`}
          style={{ background: "oklch(0.09 0.006 260 / 0.8)" }}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 pointer-events-none font-sans transition-all duration-200 ${
            isFloating
              ? "top-2.5 text-[10px] font-medium tracking-widest uppercase text-muted-foreground"
              : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
          }`}
        >
          {label}
          {optional && (
            <span className="ml-1 font-mono text-[9px] text-muted-foreground/50 normal-case tracking-normal">
              optional
            </span>
          )}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-mono pl-1">{error}</p>
      )}
    </div>
  );
}

function FloatingTextarea({
  label,
  id,
  value,
  onChange,
  error,
  rows = 5,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative transition-all duration-300 ${
          error ? "ring-1 ring-red-500/50 rounded-xl" : ""
        }`}
      >
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent border rounded-xl px-4 pt-8 pb-3 text-sm text-foreground outline-none resize-none transition-all duration-300 ${
            focused
              ? "border-foreground/60 shadow-[0_0_0_1px_oklch(0.94_0.005_90_/_0.1)]"
              : error
              ? "border-red-500/50"
              : "border-foreground/10 hover:border-foreground/25"
          }`}
          style={{ background: "oklch(0.09 0.006 260 / 0.8)" }}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 pointer-events-none font-sans transition-all duration-200 ${
            isFloating
              ? "top-2.5 text-[10px] font-medium tracking-widest uppercase text-muted-foreground"
              : "top-4 text-sm text-muted-foreground"
          }`}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-mono pl-1">{error}</p>
      )}
    </div>
  );
}

export function InquiryForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    website: "",
    services: [],
    budget: "",
    deadline: "",
    description: "",
    referenceLinks: "",
    consentGiven: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (s: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!form.description.trim())
      errs.description = "Project description is required";
    if (!form.consentGiven)
      errs.consentGiven = "Please confirm your consent to continue";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/inquiry/success");
      } else {
        const data = await res.json();
        console.error("[v0] Submit error:", data);
      }
    } catch (err) {
      console.error("[v0] Network error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 h-16 flex items-center justify-between border-b border-foreground/8 bg-background/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-display text-foreground tracking-tight">
            NOVUS MEDIA
          </span>
          <span className="text-[9px] font-mono text-muted-foreground mt-0.5">TM</span>
        </Link>
        <Link
          href="/"
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to site
        </Link>
      </header>

      {/* Main content */}
      <main className="pt-28 pb-32 max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Start a Project
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-display leading-[0.92] tracking-tight text-balance mb-6">
            Tell us about
            <br />
            your project
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Fill in as much detail as you can — the more context we have, the
            faster we can turn around a tailored proposal.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
            {/* Left column — form fields */}
            <div className="space-y-12">
              {/* Section: Client Information */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                    01 &mdash; Client Information
                  </span>
                  <span className="flex-1 h-px bg-foreground/8" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatingInput
                    id="fullName"
                    label="Full Name"
                    value={form.fullName}
                    onChange={set("fullName")}
                    error={errors.fullName}
                  />
                  <FloatingInput
                    id="companyName"
                    label="Company Name"
                    value={form.companyName}
                    onChange={set("companyName")}
                    optional
                  />
                  <FloatingInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                  />
                  <FloatingInput
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    optional
                  />
                  <div className="sm:col-span-2">
                    <FloatingInput
                      id="website"
                      label="Company Website"
                      value={form.website}
                      onChange={set("website")}
                      optional
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>
              </section>

              {/* Section: Project Details */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                    02 &mdash; Project Details
                  </span>
                  <span className="flex-1 h-px bg-foreground/8" />
                </div>

                {/* Services */}
                <div className="mb-8">
                  <p className="text-xs font-mono text-muted-foreground mb-4 tracking-widest uppercase">
                    What service do you need?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className={`px-4 py-2.5 rounded-full text-sm border transition-all duration-200 ${
                          form.services.includes(s)
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-muted-foreground border-foreground/15 hover:border-foreground/40 hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="mb-6">
                  <p className="text-xs font-mono text-muted-foreground mb-4 tracking-widest uppercase">
                    Estimated Budget
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            budget: prev.budget === b.value ? "" : b.value,
                          }))
                        }
                        className={`px-4 py-2.5 rounded-full text-sm border transition-all duration-200 ${
                          form.budget === b.value
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-muted-foreground border-foreground/15 hover:border-foreground/40 hover:text-foreground"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                <FloatingInput
                  id="deadline"
                  label="Deadline"
                  value={form.deadline}
                  onChange={set("deadline")}
                  optional
                  placeholder="e.g. End of August, ASAP, Flexible…"
                />
              </section>

              {/* Section: Project Description */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                    03 &mdash; Project Description
                  </span>
                  <span className="flex-1 h-px bg-foreground/8" />
                </div>

                <div className="space-y-4">
                  <FloatingTextarea
                    id="description"
                    label="Project Description"
                    value={form.description}
                    onChange={set("description")}
                    error={errors.description}
                    rows={6}
                  />
                  <FloatingInput
                    id="referenceLinks"
                    label="Reference Links"
                    value={form.referenceLinks}
                    onChange={set("referenceLinks")}
                    optional
                    placeholder="Dribbble, Behance, YouTube links, etc."
                  />

                  {/* File Upload */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFiles}
                      accept="image/*,video/*,.pdf,.zip"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border border-dashed border-foreground/15 rounded-xl p-6 text-center hover:border-foreground/35 transition-all duration-300 group"
                    >
                      <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2 group-hover:text-foreground transition-colors" />
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        Attach files{" "}
                        <span className="font-mono text-xs opacity-60">
                          (optional)
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        Images, videos, PDFs or ZIP — up to 10 MB each
                      </p>
                    </button>

                    {files.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {files.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-foreground/10 text-sm"
                          >
                            <span className="flex items-center gap-2 text-muted-foreground min-w-0">
                              <Paperclip className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{f.name}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </section>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={form.consentGiven}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        consentGiven: !prev.consentGiven,
                      }))
                    }
                    className={`shrink-0 mt-0.5 w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
                      form.consentGiven
                        ? "bg-foreground border-foreground"
                        : errors.consentGiven
                        ? "border-red-500/60"
                        : "border-foreground/20 group-hover:border-foreground/40"
                    }`}
                  >
                    {form.consentGiven && (
                      <svg
                        className="w-3 h-3 text-background"
                        fill="none"
                        viewBox="0 0 12 12"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2 6l3 3 5-5"
                        />
                      </svg>
                    )}
                  </button>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    I understand that Novus Media will contact me regarding this
                    project.
                  </span>
                </label>
                {errors.consentGiven && (
                  <p className="mt-2 text-xs text-red-400 font-mono pl-9">
                    {errors.consentGiven}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full sm:w-auto h-14 px-10 text-base rounded-full bg-foreground hover:bg-foreground/90 text-background group transition-all duration-300 disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <>
                      Submit Project Request
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
                <p className="mt-4 text-xs font-mono text-muted-foreground">
                  We typically respond within 24–48 hours
                </p>
              </div>
            </div>

            {/* Right column — sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Trust card */}
                <div
                  className="border border-foreground/8 rounded-2xl p-6 space-y-5"
                  style={{
                    background:
                      "oklch(0.09 0.006 260 / 0.7)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                    What happens next?
                  </p>
                  <ol className="space-y-4">
                    {[
                      {
                        n: "01",
                        text: "We review your brief within 24 hours",
                      },
                      {
                        n: "02",
                        text: "We send a tailored proposal + timeline",
                      },
                      {
                        n: "03",
                        text: "Kickoff call & creative alignment",
                      },
                      {
                        n: "04",
                        text: "Production begins — first draft in 5–7 days",
                      },
                    ].map((step) => (
                      <li key={step.n} className="flex items-start gap-3">
                        <span className="text-[10px] font-mono text-muted-foreground/50 mt-0.5 w-4 shrink-0">
                          {step.n}
                        </span>
                        <span className="text-sm text-muted-foreground leading-snug">
                          {step.text}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Contact */}
                <div
                  className="border border-foreground/8 rounded-2xl p-6"
                  style={{
                    background: "oklch(0.09 0.006 260 / 0.7)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
                    Prefer email?
                  </p>
                  <a
                    href="mailto:work@novusmedia.in"
                    className="text-sm text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4 break-all"
                  >
                    work@novusmedia.in
                  </a>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Drop us a message directly — include your brief and we&apos;ll
                    reply within 24 hours.
                  </p>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-foreground/8">
                  <span className="w-2 h-2 rounded-full bg-[#eca8d6] shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Currently accepting new projects
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </main>
    </div>
  );
}
