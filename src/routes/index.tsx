// Main landing page route
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ScrollCinematic } from "@/components/ScrollCinematic";
import bannerDriver from "@/assets/banner-driver.jpg";
import carBlack from "@/assets/car-black.png";
import { DriverTermsModal } from "@/components/DriverTermsModal";
import { DriverApplicationModal } from "@/components/DriverApplicationModal";
import { ServiceDetailsModal, type ServicePackageDetails } from "@/components/ServiceDetailsModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PILOTED — Your car. Our driver." },
      {
        name: "description",
        content:
          "PILOTED is a driver-providing agency. You keep the wheel of your own car — we bring the hands. Vetted professional drivers, on demand.",
      },
      { property: "og:title", content: "PILOTED — Your car. Our driver." },
      {
        property: "og:description",
        content:
          "A driver-providing agency. Keep your car, borrow a professional to drive it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Scroll window to top (Hero section) immediately
      window.scrollTo(0, 0);

      const onBeforeUnload = () => {
        window.scrollTo(0, 0);
      };
      window.addEventListener("beforeunload", onBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", onBeforeUnload);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav onOpenApply={() => setIsApplyOpen(true)} />
      <Hero />
      <Ticker />
      <Manifesto />
      <How />
      <Standards />
      <Insurance />
      <ForWho />
      <Packages />
      <Cities />
      <Testimonials />
      <FAQ />
      <AppCTA />
      <DriverCareers
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenApply={() => setIsApplyOpen(true)}
      />
      <Footer
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenCareers={() => setIsApplyOpen(true)}
      />

      {/* Driver Job Application & Qualification Modals */}
      <DriverTermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onOpenApply={() => setIsApplyOpen(true)}
      />
      <DriverApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}

function Nav({ onOpenApply }: { onOpenApply: () => void }) {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" onClick={scrollTo("top")} className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-taxi font-display font-bold text-sm">
            P
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            PILOTED
          </span>
        </a>
        <nav className="hidden gap-7 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:flex">
          <a href="#story" onClick={scrollTo("story")} className="link-underline hover:text-foreground transition-colors">Story</a>
          <a href="#how" onClick={scrollTo("how")} className="link-underline hover:text-foreground transition-colors">How it works</a>
          <a href="#standards" onClick={scrollTo("standards")} className="link-underline hover:text-foreground transition-colors">Standards</a>
          <a href="#insurance" onClick={scrollTo("insurance")} className="link-underline hover:text-foreground transition-colors">Insurance</a>
          <a href="#packages" onClick={scrollTo("packages")} className="link-underline hover:text-foreground transition-colors">Packages</a>
          <a href="#careers" onClick={scrollTo("careers")} className="link-underline hover:text-foreground transition-colors">Driver Jobs</a>
          <a href="#faq" onClick={scrollTo("faq")} className="link-underline hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenApply}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider hover:border-taxi hover:text-taxi-deep transition-colors"
          >
            Apply as Driver
          </button>
          <a
            href="#app"
            onClick={scrollTo("app")}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-widest text-taxi transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Get the app
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0); // 0..1 smooth scroll progress through the hero
  const [mounted, setMounted] = useState(false);
  const targetPRef = useRef(0);
  const currentPRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Trigger page-reload entrance animation
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const calculateTarget = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      return total > 0 ? scrolled / total : 0;
    };

    const animate = () => {
      const target = targetPRef.current;
      const current = currentPRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        // 0.09 LERP factor provides silky physics momentum damping
        const next = current + diff * 0.09;
        currentPRef.current = next;
        setP(next);
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        currentPRef.current = target;
        setP(target);
        rafIdRef.current = null;
      }
    };

    const onScroll = () => {
      targetPRef.current = calculateTarget();
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };

    targetPRef.current = calculateTarget();
    currentPRef.current = targetPRef.current;
    setP(targetPRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
  const seg = (start: number, end: number) => clamp((p - start) / (end - start));

  // 1. Initial 'Who drives your car when you can't?' headline fades out first (0.0 -> 0.20)
  const introProgress = seg(0.0, 0.20);

  // 2. Car drives across (0.0 -> 0.85)
  const carP = seg(0.0, 0.85);
  const carX = -180 + carP * 360; // -180% -> +180%
  const wheelRotate = carP * 1440;

  // 3. First scroll phase: 'Your car. Our driver.' headline reveals first (0.20 -> 0.45)
  const titleP = seg(0.20, 0.45);

  // 4. Next scroll phase: Description text AND buttons appear together simultaneously (0.48 -> 0.72)
  const subAndCtaP = seg(0.48, 0.72);

  const gradientPopupStyle = (v: number, startY = 75) => {
    // Eased curve for ultra-smooth spring text entry
    const ease = 1 - Math.pow(1 - v, 3);
    const translateY = (1 - ease) * startY;
    const scale = 0.94 + ease * 0.06;

    // Gradient opacity: Top portion starts at 60% opacity (0.6), bottom at 0 opacity (0), scaling smoothly to 100% (1.0)
    const topOpacity = Math.min(0.6 + v * 0.4, 1.0);
    const bottomOpacity = Math.min(v * 1.0, 1.0);
    const midOpacity = (topOpacity + bottomOpacity) / 2;

    const maskImage = `linear-gradient(to bottom, rgba(0,0,0,${topOpacity.toFixed(2)}) 0%, rgba(0,0,0,${midOpacity.toFixed(2)}) 50%, rgba(0,0,0,${bottomOpacity.toFixed(2)}) 100%)`;

    return {
      opacity: Math.min(v * 1.4, 1),
      transform: `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
      WebkitMaskImage: maskImage,
      maskImage: maskImage,
      willChange: "opacity, transform, mask-image, -webkit-mask-image",
      visibility: v <= 0.005 ? ("hidden" as const) : ("visible" as const),
    };
  };

  const reverseGradientExitStyle = (progress: number) => {
    // progress: 0.0 at top of page -> 1.0 when scrolled past intro phase
    const v = 1 - progress;
    const translateY = -progress * 70;
    const scale = 1.0 - progress * 0.06;

    // Reverse gradient fade: bottom dissolves to 0 opacity first, top stays visible longer (top 60% -> 0%)
    const topOpacity = Math.min(v * 1.2, 1.0);
    const bottomOpacity = Math.max(0, (v - 0.2) * 1.25);
    const midOpacity = (topOpacity + bottomOpacity) / 2;

    const maskImage = `linear-gradient(to bottom, rgba(0,0,0,${topOpacity.toFixed(2)}) 0%, rgba(0,0,0,${midOpacity.toFixed(2)}) 50%, rgba(0,0,0,${bottomOpacity.toFixed(2)}) 100%)`;

    return {
      opacity: Math.min(v * 1.5, 1.0),
      transform: `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
      WebkitMaskImage: maskImage,
      maskImage: maskImage,
      willChange: "opacity, transform, mask-image, -webkit-mask-image",
      visibility: v <= 0.005 ? ("hidden" as const) : ("visible" as const),
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden border-b border-border text-center">
        <div className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col items-center justify-center px-6 text-center lg:px-10">

          {/* 1. Initial Intro headline (Original Typography + Page-Reload Entrance Animation) */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center sm:justify-start pt-6 sm:pt-20 lg:pt-24 px-4 sm:px-6 text-center pointer-events-none w-full mx-auto"
            style={reverseGradientExitStyle(introProgress)}
          >
            <div
              className={`mb-3 sm:mb-4 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground text-center w-full transition-all duration-700 delay-100 transform ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              — PILOTED
            </div>

            <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-center w-full mx-auto">
              <span
                className={`block text-center w-full transition-all duration-700 delay-200 transform ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                Who drives
              </span>
              <span
                className={`block italic font-normal text-muted-foreground text-center w-full my-1 sm:my-0 transition-all duration-700 delay-350 transform ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                your car
              </span>
              <span
                className={`relative inline-block text-center mx-auto transition-all duration-700 delay-500 transform ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                when you can't?
                <span
                  className={`absolute -bottom-1 left-0 h-3 rounded-full bg-taxi -z-10 transition-all duration-1000 delay-700 ease-out origin-left ${
                    mounted ? "w-full scale-x-100 opacity-100" : "w-0 scale-x-0 opacity-0"
                  }`}
                />
              </span>
            </h1>
          </div>

          {/* 2. Hero revealed content (Gradient fade & popup scroll reveal) */}
          <div className="relative z-0 mx-auto max-w-3xl text-center flex flex-col items-center justify-center">
            <div
              style={gradientPopupStyle(titleP, 40)}
              className="mb-6 inline-flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span className="h-px w-8 bg-ink" />
              A driver-providing agency
              <span className="h-px w-8 bg-ink" />
            </div>

            <h1
              style={gradientPopupStyle(titleP, 85)}
              className="font-display text-[14vw] leading-[0.85] font-extrabold tracking-tighter sm:text-[11vw] lg:text-[9vw] xl:text-[8rem] text-center"
            >
              Your car.
              <br />
              <span className="italic font-normal text-muted-foreground">Our</span>{" "}
              <span className="relative inline-block">
                driver.
                <span
                  className="absolute -bottom-2 left-0 h-3 rounded-full bg-taxi -z-10"
                  style={{ width: `${titleP * 100}%` }}
                />
              </span>
            </h1>

            <p
              style={gradientPopupStyle(subAndCtaP, 50)}
              className="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted-foreground text-center"
            >
              You already own the car you love. We bring the professional who
              drives it — for the school run, the long night home, the airport
              dash, the workday behind you.
            </p>

            <div
              style={gradientPopupStyle(subAndCtaP, 40)}
              className="mt-10 flex flex-wrap items-center justify-center gap-6"
            >
              <a
                href="#app"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("app")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-widest text-taxi transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                Book on the app
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
              <a
                href="#story"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium underline decoration-taxi decoration-4 underline-offset-8 cursor-pointer"
              >
                Read the story
              </a>
            </div>
          </div>

          {/* 3. Car Image with rotating wheels (Drives across in sync starting at 0.0) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[95%] max-w-3xl lg:w-[80%]"
            style={{
              transform: `translate(calc(-50% + ${carX}%), -50%)`,
              willChange: "transform",
            }}
          >
            <div className="relative">
              <img
                src={carBlack}
                alt="PILOTED Black Luxury Sedan"
                className="block w-full"
              />
              {[
                { left: "26.3%", top: "57.9%", width: "10.4%" },
                { left: "79.2%", top: "57.9%", width: "10.4%" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    width: pos.width,
                    aspectRatio: "1 / 1",
                    transform: `translate(-50%, -50%) rotate(${wheelRotate}deg)`,
                    willChange: "transform",
                  }}
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
                    <defs>
                      <linearGradient id="ySpokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#222228" />
                        <stop offset="50%" stopColor="#141418" />
                        <stop offset="100%" stopColor="#08080a" />
                      </linearGradient>
                    </defs>

                    {/* Rubber Tire Ring (100% Transparent Center) */}
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#0a0a0d" strokeWidth="4" />
                    <circle cx="50" cy="50" r="45.5" fill="none" stroke="#222228" strokeWidth="1.2" />

                    {/* Yellow Performance Brake Caliper Accent */}
                    <path d="M 20 44 A 32 32 0 0 1 36 20 L 41 26 A 25 25 0 0 0 27 46 Z" fill="#f5c518" opacity="0.9" />

                    {/* Polished Metallic Outer Rim Lip */}
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#444" strokeWidth="1.5" />

                    {/* 10-Y-Spoke Forged Mesh Geometry (Transparent Gaps Between Spokes) */}
                    {Array.from({ length: 10 }).map((_, k) => {
                      const angle = k * 36;
                      return (
                        <g key={k} transform={`rotate(${angle} 50 50)`}>
                          {/* Y-Spoke Base to Branch */}
                          <path d="M 48.5 40 L 46 22 L 39 9 L 43 9 L 48 20 L 50 40 Z" fill="url(#ySpokeGrad)" stroke="#000" strokeWidth="0.5" />
                          <path d="M 51.5 40 L 54 22 L 61 9 L 57 9 L 52 20 L 50 40 Z" fill="url(#ySpokeGrad)" stroke="#000" strokeWidth="0.5" />
                          {/* CNC Machined Edge Highlights */}
                          <line x1="48" y1="20" x2="41" y2="9" stroke="#666" strokeWidth="0.75" />
                          <line x1="52" y1="20" x2="59" y2="9" stroke="#666" strokeWidth="0.75" />
                        </g>
                      );
                    })}

                    {/* Center Lock Hub & Cap */}
                    <circle cx="50" cy="50" r="11" fill="#0d0e12" stroke="#f5c518" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="5.5" fill="#f5c518" />
                    <circle cx="50" cy="50" r="2" fill="#141414" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const words = [
    "Your car",
    "Our driver",
    "School runs",
    "Airport dashes",
    "Late nights",
    "Business hours",
    "Weekend errands",
    "Long drives home",
  ];
  const line = [...words, ...words, ...words, ...words];
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let rafId: number;
    let autoP = 0;

    const animate = () => {
      // Continuous smooth loop (~0.035% per frame)
      autoP += 0.035;
      const scrollP = window.scrollY * 0.015;
      // Wrap every 25% for 100% seamless infinite loop
      const totalP = (autoP + scrollP) % 25;
      setPercent(totalP);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="overflow-hidden border-b border-border bg-taxi py-5 select-none">
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          transform: `translate3d(-${percent}%, 0, 0)`,
        }}
      >
        {line.map((w, i) => (
          <span
            key={i}
            className="mx-8 font-display text-2xl font-bold uppercase tracking-tight text-ink flex items-center shrink-0"
          >
            {w} <span className="ml-8 text-ink/40 font-normal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}




function Manifesto() {
  return (
    <section id="story" className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 text-left">
            <Reveal variant="up" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-6 bg-ink/40" />
              The Story
            </Reveal>
            <Reveal
              as="h2"
              variant="gradient"
              delay={120}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl text-left"
            >
              We don't rent cars.
              <span className="block text-taxi-deep mt-2">We lend hands.</span>
            </Reveal>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-8 text-base leading-relaxed text-foreground/80 sm:text-lg lg:text-xl text-left">
            <Reveal as="p" variant="up" delay={140}>
              Every other service asks you to give something up — your car, your
              route, your control. PILOTED starts from the opposite idea. You
              already have a car you love. What you don't always have is the time,
              the energy, or the licence to drive it.
            </Reveal>
            <Reveal as="p" variant="up" delay={240}>
              So we built an agency of drivers. Not a fleet. Not a rideshare. Just
              people. Vetted, uniformed, insured, and dispatched to your door in
              minutes.
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={340}
              className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl text-left border-l-4 border-taxi pl-5 py-1"
            >
              You keep the wheel. We bring the hands.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    {
      n: "01",
      t: "Open the app",
      d: "Tell us where, when, and how long you need a driver. That's it.",
    },
    {
      n: "02",
      t: "We dispatch a driver",
      d: "A vetted PILOTED driver arrives at your door — uniformed, on time, ready.",
    },
    {
      n: "03",
      t: "You ride. We drive.",
      d: "Sit back. Answer emails. Sleep. Talk. It's still your car.",
    },
  ];
  return (
    <section id="how" className="border-b border-border bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-taxi">
            — How it works
          </Reveal>
          <Reveal as="h2" variant="gradient" delay={120} className="mt-4 font-display text-5xl font-bold leading-[0.95] lg:text-6xl text-center">
            Three taps.
            <br />
            One driver.
          </Reveal>
          <Reveal as="p" variant="up" delay={240} className="mx-auto mt-6 max-w-lg text-bone/60 text-center">
            Bookings happen in the PILOTED app. This site is here to tell you
            who we are before you download it.
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              variant="up"
              delay={i * 160}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-bone/15 bg-bone/5 p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-taxi/80 hover:bg-bone/10 hover:shadow-2xl lg:p-10"
            >
              <div className="flex flex-col items-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-taxi/15 font-display text-2xl font-black text-taxi transition-transform duration-500 group-hover:scale-110 group-hover:bg-taxi group-hover:text-ink">
                  {s.n}
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-bone">
                  {s.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/70 max-w-xs">
                  {s.d}
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="h-1 w-12 rounded-full bg-taxi/30 transition-all duration-500 group-hover:w-full group-hover:bg-taxi" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Standards() {
  const items = [
    { t: "Vetted", d: "Background, licence and driving-record checks — every driver, every quarter." },
    { t: "Trained", d: "In-house academy: defensive driving, hospitality, discretion." },
    { t: "Uniformed", d: "You'll know the driver at your door is ours the moment you see them." },
    { t: "Insured", d: "Every trip is covered end-to-end. Your car stays your car." },
  ];
  return (
    <section id="standards" className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 text-left">
            <Reveal variant="up" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-6 bg-ink/40" />
              The Standard
            </Reveal>
            <Reveal as="h2" variant="gradient" delay={120} className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl text-left">
              A driver you'd hand your keys to<span className="text-taxi-deep">.</span>
            </Reveal>
            <Reveal as="p" variant="up" delay={220} className="mt-6 text-muted-foreground text-left text-base leading-relaxed max-w-sm">
              We don't send random drivers. Every single person behind your wheel goes through rigorous vetting, academy training, and complete commercial insurance.
            </Reveal>
          </div>

          {/* Right Column: Standards Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal
                key={it.t}
                variant="up"
                delay={i * 120}
                className="group flex flex-col justify-start rounded-3xl border border-border bg-background p-8 text-left transition-colors hover:bg-taxi/10"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-taxi transition-transform duration-500 group-hover:scale-150" />
                  <h3 className="font-display text-xl font-bold">{it.t}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-left">
                  {it.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Insurance() {
  const coverageItems = [
    {
      title: "Full Comprehensive & Collision",
      tag: "$1M+ Commercial Policy",
      desc: "Every trip is backed by master commercial insurance covering your personal vehicle against physical damage, theft, or collision while our driver is at the wheel.",
    },
    {
      title: "Third-Party & Public Liability",
      tag: "Complete Legal Protection",
      desc: "Full coverage for third-party property damage and bodily injury liability claims, protecting vehicle owners against external claims.",
    },
    {
      title: "Passenger Medical Payments",
      tag: "Occupant Protection",
      desc: "Medical expense coverage for all passengers, family members, and occupants inside your car during active PILOTED dispatches.",
    },
    {
      title: "Zero-Deductible Guarantee",
      tag: "100% Owner Safeguard",
      desc: "Vehicle owners pay $0 out-of-pocket deductible in the event of an approved claim during an active booking.",
    },
  ];

  return (
    <section id="insurance" className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 text-left">
            <Reveal variant="up" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-6 bg-ink/40" />
              Commercial Protection
            </Reveal>
            <Reveal as="h2" variant="gradient" delay={120} className="mt-6 font-display text-4xl font-extrabold leading-[0.95] lg:text-6xl text-left">
              Comprehensive insurance. Every single mile<span className="text-taxi-deep">.</span>
            </Reveal>
            <Reveal as="p" variant="up" delay={220} className="mt-6 text-muted-foreground text-left text-base leading-relaxed max-w-md">
              You keep your car. We cover the risk. Every trip booked through PILOTED includes complete commercial insurance protection while our driver is at the wheel.
            </Reveal>
            <Reveal variant="up" delay={300} className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-taxi/40 bg-taxi/10 p-4 text-xs font-semibold text-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-taxi font-bold">
                ✓
              </span>
              <span>24/7 Incident Hotline & On-Scene Claims Support</span>
            </Reveal>
          </div>

          {/* Right Column: 2x2 Coverage Grid Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {coverageItems.map((c, i) => (
              <Reveal key={c.title} variant="up" delay={i * 100}>
                <div className="group rounded-3xl border border-border bg-card p-8 transition-all hover:border-taxi hover:shadow-lg">
                  <span className="inline-block rounded-full bg-taxi/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-taxi-deep mb-4">
                    {c.tag}
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ForWho() {
  const cards = [
    { n: "01", tag: "Busy parents", title: "The school run,\nwithout the school run.", note: "Morning drop-offs. Ballet pick-ups. Your car in your driveway by dinner.", span: "md:col-span-4 md:row-span-2", tone: "ink" },
    { n: "02", tag: "Executives", title: "A moving\noffice.", note: "Take the call. Close the deck. Arrive sharp.", span: "md:col-span-4", tone: "bone" },
    { n: "03", tag: "After a drink", title: "Home safe.\nCar home too.", note: "No taxi line. No car left behind at the bar.", span: "md:col-span-4", tone: "taxi" },
    { n: "04", tag: "Family & elders", title: "A trusted driver\nfor the days you shouldn't.", note: "Appointments, groceries, grandkids — driven by someone you'd trust with keys.", span: "md:col-span-4", tone: "bone" },
    { n: "05", tag: "Weddings & events", title: "A chauffeured\nday — in your own car.", note: "One driver. One day. Your vehicle, treated like a limousine.", span: "md:col-span-4", tone: "ink" },
  ];

  const toneClass = (t: string) =>
    t === "ink"
      ? "bg-ink text-bone"
      : t === "taxi"
        ? "bg-taxi text-ink"
        : "bg-background text-ink border border-border";

  return (
    <section id="who" className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            — Who it's for
          </Reveal>
          <Reveal as="h2" variant="gradient" delay={120} className="mt-4 font-display text-5xl font-bold leading-[0.9] lg:text-7xl text-center">
            Built for the people who'd rather{" "}
            <span className="italic font-normal text-muted-foreground">not</span>{" "}
            be driving
            <span className="text-taxi-deep">.</span>
          </Reveal>
          <Reveal as="p" variant="up" delay={240} className="mx-auto mt-6 max-w-md text-muted-foreground text-center">
            Five kinds of moments where handing over the wheel — but keeping
            your car — just makes sense.
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-8 md:auto-rows-[minmax(220px,auto)]">
          {cards.map((c, i) => (
            <Reveal
              key={c.n}
              variant="up"
              delay={i * 120}
              className={`tile-hover group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 lg:p-10 text-center ${c.span} ${toneClass(c.tone)}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-display text-xs uppercase tracking-[0.3em] opacity-60">
                  {c.tag}
                </span>
                <span className="font-display text-xs opacity-40">/ {c.n}</span>
              </div>
              <div className="mt-12 flex flex-col items-center text-center">
                <h3 className="whitespace-pre-line font-display text-3xl font-semibold leading-[1.05] tracking-tight lg:text-4xl text-center">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm opacity-70 text-center">{c.note}</p>
              </div>
              <span
                aria-hidden
                className="absolute -bottom-6 -right-4 font-display text-[8rem] font-extrabold leading-none opacity-[0.06] transition-all duration-700 group-hover:opacity-25 group-hover:-translate-y-2"
              >
                {c.n}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  const [activeModalPackage, setActiveModalPackage] = useState<ServicePackageDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (pkg: ServicePackageDetails) => {
    setActiveModalPackage(pkg);
    setIsModalOpen(true);
  };

  const handleExplore = () => {
    const el = document.getElementById("app");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const plans: ServicePackageDetails[] = [
    {
      id: "hourly",
      name: "Hourly",
      tag: "Flex & Short Trips",
      lead: "A vetted driver on-demand for errands, dinner dates, doctor visits, or school runs.",
      unit: "Quoted in-app / Hour",
      bullets: ["2-Hour Minimum", "Instant On-Demand Dispatch", "Same-City Coverage"],
      tone: "bone",
      fullDetails: {
        description:
          "Perfect for flexible day-to-day driving needs. You keep your car in your driveway while a uniformed PILOTED driver arrives at your location to handle city traffic, parking hassle, and navigation.",
        whatsIncluded: [
          "Vetted & Uniformed Professional Driver",
          "Commercial Supplemental Liability Insurance",
          "Real-Time In-App Driver Tracking",
          "Waiting & Multi-Stop Assistance",
        ],
        packageSpecs: [
          { label: "Minimum Duration", value: "2 Hours" },
          { label: "Billing Unit", value: "Hourly Pro-rata" },
          { label: "Notice Period", value: "30 Mins Lead Time" },
        ],
        termsAndConditions: [
          "Fuel, tolls, and parking passes are borne by the vehicle owner.",
          "Vehicle must have valid registration and basic vehicle insurance.",
          "Cancellations are free up to 15 minutes before driver arrival.",
        ],
      },
    },
    {
      id: "full-day",
      name: "Full day",
      tag: "Most Popular",
      lead: "8 to 12 hours of a dedicated driver for business, weddings, family events, or city days.",
      unit: "Quoted in-app / 8-12 Hrs",
      bullets: ["Dedicated All-Day Driver", "Unlimited City Stops", "Zero Waiting Charges"],
      tone: "taxi",
      fullDetails: {
        description:
          "Our signature full-day chauffeur service. Have a dedicated professional driver at your beck and call all day for back-to-back corporate meetings, shopping sprees, family events, or city tours.",
        whatsIncluded: [
          "Dedicated Senior Executive Driver",
          "Unlimited Multi-Stop City Driving",
          "Zero Extra Waiting Time Fees",
          "Formal Uniform & Door Assistance",
        ],
        packageSpecs: [
          { label: "Standard Shift", value: "8 to 12 Hours" },
          { label: "Coverage Area", value: "Full Metropolitan Area" },
          { label: "Overtime Rate", value: "Flat In-App Add-on" },
        ],
        termsAndConditions: [
          "Driver meal break of 30 minutes recommended during 8+ hour shifts.",
          "Parking and state entry permits (if applicable) paid by vehicle owner.",
          "Overtime after standard shift hours calculated automatically in app.",
        ],
      },
    },
    {
      id: "airport",
      name: "Airport and Other Trips",
      tag: "Point-to-Point",
      lead: "Seamless stress-free airport drop-offs, pickups, corporate transfers, and event shuttles.",
      unit: "Quoted in-app / Trip",
      bullets: ["Flight Status Tracking", "Luggage & Door Assistance", "24/7 Red-Eye Dispatch"],
      tone: "ink",
      fullDetails: {
        description:
          "Never worry about airport parking fees or early morning flight fatigue. Our driver arrives at your home, loads your luggage, drives you safely to the departure terminal, and parks your car back in your garage.",
        whatsIncluded: [
          "Real-Time Flight Status Monitoring",
          "Luggage Handling & Terminal Drop-off",
          "Return Pickup & Home Garage Parking",
          "24/7 Red-Eye Flight Dispatch",
        ],
        packageSpecs: [
          { label: "Service Type", value: "Point-to-Point Transfer" },
          { label: "Flight Delay Buffer", value: "60 Mins Free Wait" },
          { label: "Vehicle Return", value: "Safe Home Garage Drop" },
        ],
        termsAndConditions: [
          "Flight number required during booking for real-time delay tracking.",
          "Toll plaza fees and airport parking passes added to final invoice.",
          "Driver will wait up to 60 minutes post flight landing at no extra fee.",
        ],
      },
    },
    {
      id: "out-of-state",
      name: "Out of State",
      tag: "Intercity & Highway",
      lead: "Long-distance highway driving across state borders for weekend getaways and intercity travel.",
      unit: "Unlocking Soon",
      bullets: ["Highway Certified Driver", "Overnight Stays Allowed", "Multi-State Permits"],
      tone: "dark",
      isComingSoon: true,
      fullDetails: {
        description:
          "Intercity out-of-state highway driving service is currently in final licensing and compliance preparation. Soon you will be able to book highway-certified drivers for interstate road trips!",
        whatsIncluded: [
          "Certified Highway Defensive Driver",
          "Interstate Route Planning",
          "Overnight Stay Accommodations",
        ],
        packageSpecs: [
          { label: "Status", value: "Coming Soon" },
          { label: "Target Launch", value: "Q4 2026" },
        ],
        termsAndConditions: [
          "Sign up in the PILOTED mobile app to get notified when Out of State trips launch!",
        ],
      },
    },
  ];

  const toneClass = (t: string) =>
    t === "ink"
      ? "bg-ink text-bone border border-border/40"
      : t === "taxi"
        ? "bg-taxi text-ink border border-taxi"
        : t === "dark"
          ? "bg-ink/95 text-bone border border-bone/20"
          : "bg-card text-foreground border border-border";

  return (
    <section id="packages" className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            — Service Packages
          </Reveal>
          <Reveal as="h2" variant="gradient" delay={120} className="mt-4 font-display text-5xl font-bold leading-[0.9] lg:text-7xl text-center">
            Driven for every trip
            <span className="text-taxi-deep">.</span>
          </Reveal>
          <Reveal as="p" variant="up" delay={240} className="mx-auto mt-6 max-w-md text-muted-foreground text-center">
            Rates and quotes finalise inside the app — select your trip type below.
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal
              key={p.id}
              variant="up"
              delay={i * 140}
              className={`tile-hover group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 lg:p-8 text-center ${toneClass(p.tone)}`}
            >
              {/* Blurred Coming Soon Overlay for Out of State */}
              {p.isComingSoon && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-6 bg-ink/75 backdrop-blur-[6px] text-center border border-taxi/40 rounded-3xl animate-in fade-in duration-300">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-display text-[10px] uppercase tracking-[0.25em] text-taxi font-bold">
                      {p.tag}
                    </span>
                    <span className="font-display text-xs text-taxi/60">/ 0{i + 1}</span>
                  </div>

                  <div className="my-auto flex flex-col items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-taxi/20 text-taxi font-display text-2xl mb-4 shadow-inner">
                      🔒
                    </span>
                    <span className="inline-block rounded-full bg-taxi px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-ink shadow-md mb-3">
                      Coming Soon
                    </span>
                    <h3 className="font-display text-2xl font-bold text-bone">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-xs text-bone/70 max-w-[210px] leading-relaxed">
                      Highway & Intercity driver dispatches launching soon.
                    </p>
                  </div>

                  <div className="w-full text-center pb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-taxi/70">
                      Unlocking Soon
                    </span>
                  </div>
                </div>
              )}

              {/* Standard Card Content */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] uppercase tracking-[0.25em] opacity-60">
                    {p.tag}
                  </span>
                  <span className="font-display text-xs opacity-40">/ 0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-center">
                  {p.name}
                </h3>
                <p className="mt-3 text-xs leading-relaxed opacity-75 text-center min-h-[48px]">
                  {p.lead}
                </p>
              </div>

              <div className="mt-6 border-t border-current/15 pt-5 flex flex-col items-center text-center">
                <ul className="space-y-2 text-xs opacity-85 text-left w-full pl-2 mb-6">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6 flex flex-col items-center gap-0.5">
                  <span className="font-display text-xs uppercase tracking-widest opacity-60">
                    {p.unit}
                  </span>
                </div>

                {/* Two Action Buttons: Explore & View More */}
                <div className="w-full space-y-2">
                  <button
                    onClick={handleExplore}
                    className={`w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      p.tone === "taxi"
                        ? "bg-ink text-taxi hover:bg-background hover:text-ink shadow-md"
                        : "bg-taxi text-ink hover:bg-ink hover:text-taxi shadow-md"
                    }`}
                  >
                    Explore
                  </button>
                  <button
                    onClick={() => handleOpenDetails(p)}
                    className="w-full py-2.5 rounded-full border border-current/25 text-xs font-semibold uppercase tracking-wider hover:bg-current/10 transition-colors cursor-pointer"
                  >
                    View More
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Package View More Full Details Modal */}
      <ServiceDetailsModal
        packageData={activeModalPackage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExplore={handleExplore}
      />
    </section>
  );
}

function Cities() {
  const moments = [
    "The school run",
    "The airport dash",
    "The wedding day",
    "The night out",
    "The board meeting",
    "The hospital visit",
    "The long weekend",
    "The daily commute",
  ];
  const row = [...moments, ...moments, ...moments, ...moments];
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let rafId: number;
    let autoP = 0;

    const animate = () => {
      // Continuous smooth loop (~0.035% per frame)
      autoP += 0.035;
      const scrollP = window.scrollY * 0.015;
      // Wrap every 25% for 100% seamless infinite loop
      const totalP = (autoP + scrollP) % 25;
      setPercent(totalP);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="border-b border-border bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-taxi">
            — Where we drive
          </Reveal>
          <Reveal as="h2" variant="gradient" delay={120} className="mt-4 font-display text-4xl font-bold leading-[0.95] lg:text-5xl text-center">
            One country.
            <br />
            Every moment.
          </Reveal>
          <Reveal as="p" variant="up" delay={200} className="mx-auto mt-6 max-w-xl text-bone/60 text-center lg:text-lg">
            PILOTED runs a single, tightly-held driver network — one country,
            one standard, one number to call. Dispatch under 25 minutes,
            from the first street to the last.
          </Reveal>
        </div>

        <div className="mt-14 overflow-hidden select-none">
          <div
            className="flex whitespace-nowrap will-change-transform"
            style={{
              transform: `translate3d(-${percent}%, 0, 0)`,
            }}
          >
            {row.map((c, i) => (
              <span
                key={i}
                className="mx-8 flex items-center gap-6 font-display text-4xl font-bold uppercase tracking-tight text-bone/80 lg:text-6xl shrink-0"
              >
                {c}
                <span className="text-taxi/60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DriverCareers({
  onOpenTerms,
  onOpenApply,
}: {
  onOpenTerms: () => void;
  onOpenApply: () => void;
}) {
  const requirements = [
    { title: "21+ Years Old & Commercial License", desc: "Valid Indian LMV / Transport license with 3+ years active driving experience." },
    { title: "Clean Driving Record", desc: "Zero major violations, suspensions, or DUI records in the last 5 years." },
    { title: "Police Clearance Verified", desc: "PCC background clearance and identity verification mandatory." },
    { title: "Uniform & Professional Code", desc: "Ironed uniform standards, client confidentiality, and defensive driving." },
  ];

  return (
    <section id="careers" className="border-b border-border bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28 text-left">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading & CTA Buttons */}
          <div className="lg:col-span-5 text-left">
            <Reveal variant="up" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-taxi">
              — Join the Network
            </Reveal>
            <Reveal as="h2" variant="gradient" delay={120} className="mt-6 font-display text-4xl font-extrabold leading-[0.95] lg:text-6xl text-bone text-left">
              Drive with PILOTED<span className="text-taxi">.</span>
            </Reveal>
            <Reveal as="p" variant="up" delay={220} className="mt-6 text-bone/70 text-left text-base leading-relaxed max-w-md">
              Earn premium rates driving luxury sedans, SUVs, and personal vehicles. Flexible hours, verified clients, and weekly direct payouts.
            </Reveal>

            {/* Action Buttons */}
            <Reveal variant="up" delay={300} className="mt-10 flex flex-wrap items-center gap-4 relative z-10">
              <button
                type="button"
                onClick={onOpenApply}
                className="group relative inline-flex items-center gap-3 rounded-full bg-taxi px-7 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 shadow-lg cursor-pointer"
              >
                Apply Now
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </button>
              <button
                type="button"
                onClick={onOpenTerms}
                className="rounded-full border border-bone/30 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-bone hover:border-taxi hover:text-taxi transition-colors cursor-pointer"
              >
                View More Details
              </button>
            </Reveal>
          </div>

          {/* Right Column: Qualifications Checklist */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {requirements.map((r, i) => (
              <Reveal key={r.title} variant="up" delay={i * 100}>
                <div className="rounded-3xl border border-bone/15 bg-bone/5 p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-taxi text-ink font-bold text-xs">
                      ✓
                    </span>
                    <h3 className="font-display text-base font-bold text-bone">
                      {r.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-bone/60 pl-10">
                    {r.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const notes = [
    {
      q: "I kept my car. I lost the driving. Honestly a rebrand of my week.",
      who: "Layla H.",
      role: "Mother of two, Dubai",
    },
    {
      q: "Same driver every morning. Knows the route, knows the coffee order. Feels like a colleague.",
      who: "Omar K.",
      role: "Managing partner, Riyadh",
    },
    {
      q: "I don't drink and drive anymore. I just PILOTED it home.",
      who: "Sara D.",
      role: "Photographer, Beirut",
    },
  ];
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            — People who let us drive
          </Reveal>
          <Reveal as="h2" variant="gradient" delay={120} className="mt-4 font-display text-5xl font-bold leading-[0.95] lg:text-6xl text-center">
            Handed the keys.
            <br />
            Never looked back.
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {notes.map((n, i) => (
            <Reveal
              key={n.who}
              variant="up"
              delay={i * 140}
              className="tile-hover group flex flex-col justify-between rounded-3xl border border-border bg-background p-8 text-center lg:p-10"
            >
              <div className="font-display text-5xl text-taxi text-center">“</div>
              <p className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-ink lg:text-2xl text-center">
                {n.q}
              </p>
              <div className="mt-10 flex flex-col items-center border-t border-border pt-6 text-xs uppercase tracking-widest text-muted-foreground text-center gap-1">
                <span className="text-ink font-semibold">{n.who}</span>
                <span>{n.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "So you don't provide the car?",
      a: "Correct. PILOTED is a driver-only agency. You keep your car — we bring the professional who drives it.",
    },
    {
      q: "How are drivers vetted?",
      a: "Every driver clears background, licence and driving-record checks, then completes our in-house academy in defensive driving, hospitality and discretion.",
    },
    {
      q: "Is my car insured while your driver is behind the wheel?",
      a: "Yes. Every PILOTED trip is covered end-to-end with a supplemental commercial policy on top of your own.",
    },
    {
      q: "Can I book on this website?",
      a: "No — bookings, dispatch and tracking all live inside the PILOTED app. This site is our story; the app does the work.",
    },
    {
      q: "Can I request the same driver every time?",
      a: "Yes, on the monthly retainer package a dedicated driver is assigned to you and your car.",
    },
  ];
  return (
    <section id="faq" className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 text-left">
            <Reveal variant="up" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-6 bg-ink/40" />
              Answered
            </Reveal>
            <Reveal as="h2" variant="gradient" delay={120} className="mt-6 font-display text-4xl font-extrabold leading-[0.95] lg:text-6xl text-left">
              Everything you'd ask<span className="text-taxi-deep">.</span>
            </Reveal>
            <Reveal as="p" variant="up" delay={220} className="mt-6 text-muted-foreground text-left text-base leading-relaxed max-w-sm">
              Got questions before downloading? Here is how PILOTED keeps your car, trip, and keys completely safe.
            </Reveal>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 divide-y divide-border border-y border-border text-left w-full">
            {faqs.map((f, i) => (
              <Reveal key={f.q} variant="up" delay={i * 80}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="font-display text-lg font-semibold tracking-tight text-ink lg:text-xl text-left">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-taxi transition-transform duration-500 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base text-left pr-6">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AppCTA() {
  return (
    <section id="app" className="relative overflow-hidden border-b border-border bg-taxi text-ink py-20 lg:py-28">
      {/* Subtle Watermark */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] checker-stripe" />
      
      {/* Vignette depth gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.1)_100%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 3D Perspective Smartphones (Opposite Side 3D Angle) */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-start pt-6 lg:pt-0" style={{ perspective: '1200px' }}>
            
            {/* Phone 1 (Back Left Smartphone - Opposite 3D Side View) */}
            <Reveal variant="left" className="relative z-10 w-[205px] sm:w-[235px] shrink-0" style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateY(24deg) rotateX(10deg) rotateZ(-3deg)', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }}>
              {/* White 3D Case Frame with Side Bevel & Volume Buttons */}
              <div className="relative rounded-[40px] border-[5px] border-white bg-white p-2 shadow-none text-left">
                {/* Right Side Volume Buttons Graphic */}
                <div className="absolute -right-[8px] top-16 w-[4px] h-7 bg-neutral-300 rounded-r-sm" />
                <div className="absolute -right-[8px] top-26 w-[4px] h-7 bg-neutral-300 rounded-r-sm" />

                {/* Smartphone Screen Content */}
                <div className="rounded-[32px] bg-[#0e0e12] p-4 text-bone space-y-3 font-sans h-[360px] sm:h-[390px] flex flex-col justify-between">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[9px] text-bone/60 font-semibold px-1">
                    <span>••• BELL</span>
                    <span>4:21 PM</span>
                  </div>

                  <div className="space-y-2.5 my-auto">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-taxi" />
                      <span className="w-1.5 h-1.5 rounded-full bg-bone/30" />
                      <span className="w-1.5 h-1.5 rounded-full bg-bone/30" />
                    </div>
                    <h4 className="font-display text-lg sm:text-xl font-black text-white leading-tight uppercase tracking-tight">
                      YOUR CAR. <br />
                      <span className="text-taxi">OUR DRIVER.</span>
                    </h4>
                    <p className="text-[10px] text-bone/70 leading-relaxed">
                      Executive chauffeurs at your service 24/7.
                    </p>
                  </div>

                  <div className="w-full py-2.5 rounded-full bg-taxi text-ink font-extrabold text-[10px] uppercase tracking-wider text-center shadow-md">
                    EXPLORE APP →
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Phone 2 (Front Right Smartphone - Opposite 3D Side View) */}
            <Reveal variant="right" delay={150} className="relative z-20 -ml-12 sm:-ml-16 w-[220px] sm:w-[250px] shrink-0" style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateY(24deg) rotateX(10deg) rotateZ(-3deg)', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))' }}>
              {/* White 3D Case Frame with Side Bevel & Volume Buttons */}
              <div className="relative rounded-[44px] border-[5px] border-white bg-white p-2 shadow-none text-left">
                {/* Right Side Volume Buttons Graphic */}
                <div className="absolute -right-[8px] top-18 w-[4px] h-8 bg-neutral-300 rounded-r-sm" />
                <div className="absolute -right-[8px] top-30 w-[4px] h-8 bg-neutral-300 rounded-r-sm" />

                {/* Smartphone Screen Content */}
                <div className="rounded-[36px] bg-[#0e0e12] p-4 text-bone space-y-3 font-sans h-[380px] sm:h-[410px] flex flex-col justify-between">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[9px] text-bone/60 font-semibold px-1">
                    <span>••• BELL</span>
                    <span>4:21 PM</span>
                    <span>100% 🔋</span>
                  </div>

                  {/* App Logo Branding */}
                  <div className="text-center pt-2 space-y-1">
                    <div className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-taxi text-ink font-display font-black text-2xl shadow-md mx-auto">
                      P
                    </div>
                    <h3 className="font-display text-2xl font-black text-white tracking-widest uppercase">PILOTED</h3>
                  </div>

                  {/* Clean Input Fields */}
                  <div className="space-y-2 px-1">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-[11px] text-bone/70">
                      <span>👤</span> username
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-[11px] text-bone/70">
                      <span>🔒</span> password
                    </div>
                  </div>

                  <div className="w-full py-2.5 rounded-full bg-taxi text-ink font-extrabold text-[10px] uppercase tracking-wider text-center shadow-lg">
                    SIGN IN / DISPATCH DRIVER
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Title, Description & White Side-by-Side Store Pills (matching reference image) */}
          <div className="lg:col-span-6 text-left space-y-6 z-10">
            <Reveal variant="up" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink/10 border border-ink/20 text-ink text-xs font-extrabold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-ink animate-ping" />
              BOOK ONLY IN THE APP
            </Reveal>

            <Reveal as="h2" variant="gradient" delay={100} className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-ink tracking-tight leading-[0.95]">
              Download. <br />
              <span className="underline decoration-ink/20">Tap. Drive.</span>
            </Reveal>

            <Reveal as="p" variant="up" delay={200} className="text-ink/85 text-base sm:text-lg leading-relaxed font-medium max-w-lg">
              Make your chauffeur experience easier and faster. Bookings, live driver tracking, and dispatch live entirely inside the PILOTED app.
            </Reveal>

            {/* Side-by-Side White Pill Store Buttons */}
            <Reveal variant="up" delay={300} className="pt-2 flex flex-wrap gap-4 items-center">
              <WhiteStorePill store="App Store" sub="Download on the" isApple />
              <WhiteStorePill store="Google Play" sub="GET IT ON" isGoogle />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

function WhiteStorePill({
  store,
  sub,
  isApple,
  isGoogle,
}: {
  store: string;
  sub: string;
  isApple?: boolean;
  isGoogle?: boolean;
}) {
  return (
    <a
      href="#app"
      onClick={(e) => {
        e.preventDefault();
        alert("PILOTED mobile app is available on the iOS App Store & Google Play Store.");
      }}
      className="group flex min-w-[195px] items-center justify-center gap-3.5 rounded-2xl bg-white hover:bg-ink text-ink hover:text-taxi px-6 py-4 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl cursor-pointer border border-ink/10"
    >
      <div className="shrink-0 text-current">
        {isApple ? (
          <svg className="w-6 h-6 fill-current text-ink group-hover:text-taxi transition-colors" viewBox="0 0 384 512">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 63.9 24.1 113.8c18.5 37.9 44.5 76.5 81.3 75.8 34.6-.7 47.9-22.3 89.2-22.3 40.5 0 52.8 22.3 89.2 21.6 37.6-.7 62.9-34.9 81-73.4 12-25.2 20.6-54 20.7-54.8-1.5-1-66.5-25.9-66.8-65.5zM260.6 86.8c15.7-19.1 27.5-45.9 24.3-73.1-23.7 1-52.1 15.9-68.4 35-14.7 17.1-27.4 44.3-23.9 70.8 26.4 2 52.8-13.6 68-32.7z" />
          </svg>
        ) : isGoogle ? (
          <svg className="w-5 h-5 fill-current text-ink group-hover:text-taxi transition-colors" viewBox="0 0 512 512">
            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
          </svg>
        ) : (
          "▶"
        )}
      </div>
      <div className="flex flex-col text-left leading-tight">
        <span className="text-[9px] font-bold uppercase tracking-widest text-ink/60 group-hover:text-taxi/70 transition-colors">
          {sub}
        </span>
        <span className="font-display text-base font-extrabold text-ink group-hover:text-white transition-colors">{store}</span>
      </div>
    </a>
  );
}

function Footer({
  onOpenTerms,
  onOpenCareers,
}: {
  onOpenTerms: () => void;
  onOpenCareers: () => void;
}) {
  return (
    <footer className="border-t border-border bg-background text-foreground text-left">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-16 text-left">
          {/* Brand & Description */}
          <div className="md:col-span-6 flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-taxi font-display font-extrabold text-base shadow-sm">
                P
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                PILOTED
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed text-left">
              A driver-providing agency. Your car. Our driver. Professional, vetted, insured chauffeurs dispatched directly to your vehicle.
            </p>
          </div>

          {/* Nav Links Column 1 */}
          <div className="md:col-span-3 text-left">
            <div className="flex flex-col items-start text-left">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground text-left">
                Company & Driver Jobs
              </div>
              <ul className="mt-4 space-y-3 text-sm text-left">
                <li className="text-left">
                  <a href="#story" className="hover:text-taxi-deep transition-colors text-left">
                    Story
                  </a>
                </li>
                <li className="text-left">
                  <a href="#standards" className="hover:text-taxi-deep transition-colors text-left">
                    Standards
                  </a>
                </li>
                <li className="text-left">
                  <a href="#insurance" className="hover:text-taxi-deep transition-colors text-left">
                    Insurance Coverage
                  </a>
                </li>
                <li className="text-left">
                  <button
                    onClick={onOpenCareers}
                    className="hover:text-taxi-deep transition-colors text-left font-semibold text-foreground"
                  >
                    Apply for Driver Job
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Nav Links Column 2 */}
          <div className="md:col-span-3 text-left">
            <FooterCol
              title="Contact & Social"
              items={["hello@piloted.co", "+000 000 0000", "Instagram", "LinkedIn"]}
            />
          </div>
        </div>

        {/* Bottom Copyright & Links */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/80 pt-8 text-xs text-muted-foreground md:flex-row md:items-center text-left">
          <div className="text-left">
            © {new Date().getFullYear()} PILOTED Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-left">
            <button
              onClick={onOpenTerms}
              className="hover:text-ink transition-colors text-left font-medium"
            >
              Terms & Conditions
            </button>
            <a href="#" className="hover:text-ink transition-colors">
              Privacy Policy
            </a>
            <span className="checker-stripe h-3 w-16 opacity-70" aria-hidden />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col items-start text-left">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground text-left">
        {title}
      </div>
      <ul className="mt-4 space-y-3 text-sm text-left">
        {items.map((i) => (
          <li key={i} className="text-left">
            <a href="#" className="hover:text-taxi-deep transition-colors text-left">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
