"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SuccessScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, oklch(0.55 0.08 300 / 0.08), transparent 70%)",
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/20"
            style={{ top: `${16.67 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
      </div>

      <div
        className={`relative z-10 max-w-2xl w-full text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Icon */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 border border-foreground/10 rounded-full" />
            <div className="absolute inset-3 border border-[#eca8d6]/30 rounded-full animate-pulse" />
            <CheckCircle className="w-8 h-8 text-[#eca8d6]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Mono tag */}
        <div
          className={`mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            Request Confirmed
            <span className="w-8 h-px bg-foreground/30" />
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-display leading-[0.95] tracking-tight mb-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Project Request
          <br />
          <span className="text-stroke">Received</span>
        </h1>

        {/* Body */}
        <p
          className={`text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-14 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Thank you for contacting Novus Media. We&apos;ve received your project
          details and will review everything carefully. You&apos;ll receive a reply
          within{" "}
          <span className="text-foreground font-medium">24–48 hours</span>.
        </p>

        {/* Actions */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Return Home
            </Button>
          </Link>
        </div>

        {/* Footer note */}
        <p
          className={`mt-14 text-xs font-mono text-muted-foreground transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Confirmation sent to your email &mdash; check your inbox
        </p>
      </div>

      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 1.5px currentColor;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
