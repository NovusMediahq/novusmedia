"use client";

import { useEffect, useRef, useState } from "react";

export function IndustryStandardSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative overflow-hidden">
      <div className="relative z-10 pt-32 text-center lg:pt-40">
        <span
          className={`mb-8 inline-flex items-center justify-center gap-4 text-sm font-mono text-muted-foreground transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-px w-12 bg-foreground/20" />
          Tech Stack &amp; Tools
          <span className="h-px w-12 bg-foreground/20" />
        </span>

        <h2
          className={`text-6xl font-display leading-[0.9] tracking-tight transition-all duration-1000 md:text-7xl lg:text-[128px] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Industry
          <br />
          <span className="text-muted-foreground">Standard.</span>
        </h2>

        <p
          className={`mx-auto mt-8 max-w-lg text-xl leading-relaxed text-muted-foreground transition-all delay-100 duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Industry-standard motion &amp; design tools. Every project is crafted using the same software trusted by top studios worldwide.
        </p>
      </div>

      <div
        className={`relative left-1/2 -mt-16 w-screen -translate-x-1/2 transition-all delay-200 duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}
