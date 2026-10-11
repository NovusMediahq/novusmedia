"use client";

import { useEffect, useState, useRef } from "react";

const logos: Record<string, React.ReactNode> = {
  "After Effects": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M0 0v24h24V0zm13.1 16.7H11l-.7-2.2H7l-.7 2.2H4.2L7.5 7.3h2.3zm6.7 0h-1.9l-.5-1.5h-2.7l-.5 1.5H12l2.8-9.4h2.2zm-10.1-4l-.9-3-.9 3zm7.1-.8-.8-2.7-.8 2.7z"/>
    </svg>
  ),
  "Premiere Pro": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M0 0v24h24V0zm9.1 7.3c.6 0 1.1.1 1.6.3.5.2.9.5 1.2.9.3.4.6.8.7 1.3.2.5.3 1.1.3 1.7 0 .7-.1 1.3-.3 1.8-.2.5-.5 1-.9 1.4-.4.4-.8.6-1.3.8-.5.2-1 .3-1.6.3H6.8V7.3zm8.1 0c.5 0 .9.1 1.3.3.4.2.7.4 1 .8l-1 1c-.2-.3-.4-.5-.6-.6-.3-.1-.5-.2-.8-.2-.3 0-.5.1-.7.2-.2.1-.3.3-.3.5 0 .2.1.4.3.5.2.1.6.3 1.1.4.4.1.7.3 1 .4.3.2.5.4.7.6.2.2.3.5.3.9 0 .4-.1.8-.3 1.1-.2.3-.5.5-.9.7-.4.2-.8.2-1.3.2-.6 0-1.1-.1-1.5-.4-.4-.2-.8-.6-1-.9l1.1-.9c.2.3.4.5.7.7.3.1.6.2.8.2.3 0 .5-.1.7-.2.2-.1.3-.3.3-.5 0-.2-.1-.4-.3-.5-.2-.1-.5-.3-.9-.4-.5-.1-.9-.3-1.2-.5-.3-.2-.5-.4-.7-.6-.2-.2-.2-.5-.2-.9 0-.4.1-.7.3-1 .2-.3.5-.5.9-.7.3-.2.8-.2 1.2-.2zm-8.4 1.3H8.1v4.2h.6c.3 0 .6 0 .9-.1.3-.1.5-.2.8-.4.2-.2.4-.4.5-.7.1-.3.2-.6.2-1s-.1-.7-.2-1c-.1-.3-.3-.5-.5-.7-.2-.2-.5-.3-.8-.3z"/>
    </svg>
  ),
  "Figma": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 10.52c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117v-6.038H8.148zm8.704 7.509c0 2.476-2.014 4.49-4.49 4.49-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49c2.476 0 4.49 2.014 4.49 4.49zm-7.509 0c0 1.665 1.355 3.019 3.019 3.019 1.665 0 3.019-1.354 3.019-3.019 0-1.665-1.354-3.019-3.019-3.019-1.664 0-3.019 1.354-3.019 3.019zm11.723-3.019c0 2.476-2.014 4.49-4.49 4.49V10.52c2.476 0 4.49 2.014 4.49 4.49z"/>
    </svg>
  ),
  "Cinema 4D": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.424 0 9.818 4.394 9.818 9.818S17.424 21.818 12 21.818 2.182 17.424 2.182 12 6.576 2.182 12 2.182zm-.545 3.818c-3.298 0-5.455 2.357-5.455 6s2.157 6 5.455 6c1.965 0 3.436-.784 4.364-2.182h-2.182C13.09 16.727 12.3 17.09 11.455 17.09c-2.036 0-3.273-1.615-3.273-4.09s1.237-4.09 3.273-4.09c.845 0 1.636.363 2.182 1.09h2.182c-.928-1.398-2.4-2.182-4.364-2.182zm5.09.546v10.908h3.273c2.546 0 3.818-1.636 3.818-5.454s-1.272-5.454-3.818-5.454zm2.182 1.818h.545c1.455 0 2.182.9 2.182 3.636s-.727 3.636-2.182 3.636h-.545z"/>
    </svg>
  ),
  "Blender": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12.51 13.214c.046-.8.438-1.506 1.03-1.988a3.424 3.424 0 0 1 2.212-.78c.85 0 1.631.3 2.211.78.592.48.985 1.187 1.03 1.988.09 1.615-1.137 2.99-2.773 3.074a2.98 2.98 0 0 1-.47 0c-1.636-.085-2.863-1.459-2.772-3.074zM9.45 7.7c.075-.078.15-.15.225-.22l-.225.22zM11.888 0h.028c.46.008.89.275 1.132.71l4.582 7.98.04.07a14.68 14.68 0 0 1 2.04-.144c2.78 0 4.72 1.03 4.72 2.346 0 1.074-1.248 2.01-3.153 2.233.52.567.793 1.3.765 2.063-.066 2.294-1.91 4.114-4.147 4.114a4.137 4.137 0 0 1-2.766-1.053l-5.97 1.08a.836.836 0 0 1-.22.029c-.43 0-.84-.222-1.07-.605L4.25 13.31c-.53-.915-.63-2.019-.278-3.072l.042-.108-2.85-4.975A1.273 1.273 0 0 1 1.25 4.64c.008-.51.297-.975.752-1.2a1.22 1.22 0 0 1 .558-.132h4.633c.12-.588.432-1.117.9-1.491.468-.374 1.055-.582 1.662-.582h.006c.565.004 1.118.186 1.57.524L11.888 0zM8.94 8.455a3.405 3.405 0 0 0-.616 1.95c0 .638.17 1.238.47 1.75L6.044 7.35c-.218.386-.344.82-.361 1.271-.017.452.076.9.272 1.307L8.94 14.47l.017.03-1.03.186-.6.108-3.35.606c.065.108.134.216.208.325l4.32 5.518 6.6-1.197.1-.017-.1-.1a5.155 5.155 0 0 1-1.378-2.28l-4.387.794c.104.176.264.307.452.367l-.452-.367a3.384 3.384 0 0 0 .452.367 3.384 3.384 0 0 1-3.2-3.384l-.006-.284zm6.447-.748l.002-.002-.002.002z"/>
    </svg>
  ),
  "Illustrator": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M0 0v24h24V0zm14.682 6.576h1.8v8.596h-1.8zm-5.536.896h2.076l3.072 7.7H12.5l-.72-1.86H8.952L8.22 15.172H6.42zm1.032 4.524h2.304L11.166 9.24z"/>
    </svg>
  ),
};

const integrations = [
  { name: "After Effects", category: "Motion" },
  { name: "Premiere Pro", category: "Video" },
  { name: "Figma", category: "Design" },
  { name: "Cinema 4D", category: "3D" },
  { name: "Blender", category: "3D" },
  { name: "Illustrator", category: "Graphics" },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative overflow-hidden">

      {/* Header — centré verticalement sur l'image */}
      <div className="relative z-10 pt-32 lg:pt-40 text-center">
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="w-12 h-px bg-foreground/20" />
          Tech Stack &amp; Tools
          <span className="w-12 h-px bg-foreground/20" />
        </span>

        <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Industry
          <br />
          <span className="text-muted-foreground">Standard.</span>
        </h2>

        <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          Industry-standard motion &amp; design tools. Every project is crafted using the same software trusted by top studios worldwide.
        </p>
      </div>

      {/* Full-width image */}
      <div className={`relative left-1/2 -translate-x-1/2 w-screen -mt-16 transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Integration grid — remonte sur l'image avec spacing mobile approprié */}
      <div className="relative z-10 mt-0 lg:-mt-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className={`group relative overflow-hidden p-6 lg:p-8 border transition-all duration-500 cursor-default ${
                hoveredIndex === index
                  ? "border-foreground bg-foreground/[0.04] scale-[1.02]"
                  : "border-foreground/10 hover:border-foreground/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${index * 30 + 300}ms`,
              }}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setMousePos(null);
              }}
            >
              {/* Cursor-following halo */}
              {hoveredIndex === index && mousePos && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                  }}
                />
              )}
              {/* Category tag */}
              <span className={`absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 transition-colors ${
                hoveredIndex === index
                  ? "bg-foreground text-background"
                  : "bg-foreground/10 text-muted-foreground"
              }`}>
                {integration.category}
              </span>

              {/* Logo */}
              <div className={`w-10 h-10 mb-6 flex items-center justify-center transition-colors ${
                hoveredIndex === index ? "text-white" : "text-foreground/60"
              }`}>
                {logos[integration.name]}
              </div>

              <span className="font-medium block">{integration.name}</span>

              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20 overflow-hidden">
                <div className={`h-full bg-foreground transition-all duration-500 ${
                  hoveredIndex === index ? "w-full" : "w-0"
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats row */}
        <div className={`flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-12">
            {[
              { value: "100%", label: "Custom Built" },
              { value: "6", label: "Industry Tools" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-3xl font-display">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#pricing" className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
            View Pricing
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
