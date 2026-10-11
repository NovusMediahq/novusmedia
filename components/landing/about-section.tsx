"use client";

import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16 lg:mb-20">
          <span
            className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-12 h-px bg-foreground/30" />
            About Us
          </span>
          <h2
            className={`text-5xl md:text-6xl lg:text-[80px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Premium motion
            <br />
            <span className="text-muted-foreground">design for tech.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — text content */}
          <div className="lg:col-span-7">
            <div
              className={`space-y-6 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Novus Media is a commercial motion design agency built exclusively for SaaS, AI, and B2B technology brands.
              </p>

              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                We turn complex products into clear, high-converting visuals — combining premium craft with professional industry workflows across After Effects, Cinema 4D, Figma, and Blender. Every project is custom-built from scratch, no templates, with direct, fast communication throughout.
              </p>

              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                Our focus stays narrow on purpose: technology brands that need motion design to explain, launch, and convert.
              </p>
            </div>
          </div>

          {/* Right column — key values */}
          <div className="lg:col-span-5">
            <div
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                {
                  title: "100% Custom",
                  description: "No templates. Every frame is built specifically for your brand and message.",
                },
                {
                  title: "Industry-Standard Tools",
                  description: "After Effects, Cinema 4D, Figma, Blender — we speak the language of professional production.",
                },
                {
                  title: "Direct Communication",
                  description: "Work directly with us. Fast feedback cycles, clear deliverables, no agency bloat.",
                },
                {
                  title: "Tech-Focused",
                  description: "We specialize in SaaS, AI, and B2B. We understand your products and audiences.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`pb-8 border-b border-foreground/10 last:border-b-0 last:pb-0 transition-all duration-700`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <h3 className="text-base font-display text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
