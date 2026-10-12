"use client";

import { useEffect, useRef, useState } from "react";

const works = [
  {
    title: "Series B Pitch Deck Opener",
    category: "Kinetic Typography",
    videoUrl: "https://res.cloudinary.com/t9mizwob/video/upload/v1785234423/New_Project_25_C07D6C7_txznnf.mp4",
  },
  {
    title: "App Store Preview",
    category: "Promo Reel",
    videoUrl: "https://res.cloudinary.com/t9mizwob/video/upload/v1785234560/-sW5UykO2cpGDh3P_tdzh0z.mp4",
  },
  {
    title: "SaaS Product Demo",
    category: "Product Motion",
    videoUrl: "https://res.cloudinary.com/t9mizwob/video/upload/v1785234485/Interactive_Product_Walkthrough_xczo37.mp4",
  },
  {
    title: "Brand Launch Reel",
    category: "Motion Spot",
    videoUrl: "/videos/brand-launch-reel.mp4",
  },
  {
    title: "AI Feature Walkthrough",
    category: "UI Animation",
    videoUrl: "https://res.cloudinary.com/t9mizwob/video/upload/v1785234470/Video-609_hzacni.mp4",
  },
];

function VideoCard({
  title,
  category,
  videoUrl,
  index,
  isVisible,
}: {
  title: string;
  category: string;
  videoUrl: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`group flex flex-col gap-4 transition-all duration-700`}
      style={{ transitionDelay: `${index * 80}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(32px)" }}
    >
      {/* Video container */}
      <div className="relative overflow-hidden rounded-sm border border-foreground/10 bg-card aspect-video">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            muted
            loop
            playsInline
            aria-label={title}
            className="w-full h-full object-cover"
          />
        ) : null}
        {/* Placeholder overlay shown when src is empty */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none bg-card transition-opacity duration-300 ${videoUrl ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        >
          {/* Play icon outline */}
          <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-foreground/30 translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M6 4.75L17.25 12 6 19.25V4.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xs font-mono text-foreground/25 tracking-wider uppercase">
            Video Placeholder
          </span>
        </div>

        {/* Hover shimmer edge */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm ring-1 ring-inset ring-foreground/20" />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-display text-foreground leading-tight group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
          {category}
        </span>
      </div>
    </div>
  );
}

export function OurWorkSection() {
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

  const firstRow = works.slice(0, 3);
  const secondRow = works.slice(3, 5);

  return (
    <section
      id="our-work"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <span
              className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-12 h-px bg-foreground/30" />
              Selected Work
            </span>
            <h2
              className={`text-5xl md:text-6xl lg:text-[80px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Motion design
              <br />
              <span className="text-muted-foreground">in action.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p
              className={`text-lg text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              A curated selection of motion projects spanning product demos, brand reels, and kinetic identity work.
            </p>
          </div>
        </div>

        {/* Row 1 — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {firstRow.map((work, i) => (
            <VideoCard
              key={work.title}
              title={work.title}
              category={work.category}
              videoUrl={work.videoUrl}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Row 2 — 2 cards centered */}
        <div className="flex justify-center gap-6">
          {secondRow.map((work, i) => (
            <div key={work.title} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <VideoCard
                title={work.title}
                category={work.category}
                videoUrl={work.videoUrl}
                index={i + 3}
                isVisible={isVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
