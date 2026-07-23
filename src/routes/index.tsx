// Main landing page route
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ScrollCinematic } from "@/components/ScrollCinematic";
import bannerDriver from "@/assets/banner-driver.jpg";
import carBlack from "@/assets/car-black.png";
import { DriverTermsModal } from "@/components/DriverTermsModal";
import { DriverApplicationModal } from "@/components/DriverApplicationModal";

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
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-taxi font-display font-bold text-sm">
            P
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            PILOTED
          </span>
        </a>
        <nav className="hidden gap-7 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:flex">
          <a href="#story" className="link-underline hover:text-foreground transition-colors">Story</a>
          <a href="#how" className="link-underline hover:text-foreground transition-colors">How it works</a>
          <a href="#standards" className="link-underline hover:text-foreground transition-colors">Standards</a>
          <a href="#insurance" className="link-underline hover:text-foreground transition-colors">Insurance</a>
          <a href="#packages" className="link-underline hover:text-foreground transition-colors">Packages</a>
          <a href="#careers" className="link-underline hover:text-foreground transition-colors">Driver Jobs</a>
          <a href="#faq" className="link-underline hover:text-foreground transition-colors">FAQ</a>
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
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-widest text-taxi transition-transform hover:-translate-y-0.5"
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
  const targetPRef = useRef(0);
  const currentPRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

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
  const introFade = 1 - introProgress;
  const introY = -introProgress * 60;

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

          {/* 1. Initial Intro headline (Reverse gradient exit scroll animation) */}
          <div
            className="absolute inset-x-0 top-0 z-20 flex flex-col items-center justify-start pt-14 sm:pt-20 lg:pt-24 px-6 text-center pointer-events-none"
            style={reverseGradientExitStyle(introProgress)}
          >
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground text-center">
              — PILOTED
            </div>

            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl text-center">
              Who drives
              <br />
              <span className="italic font-normal text-muted-foreground">
                your car
              </span>
              <br />
              <span className="relative inline-block">
                when you can't?
                <span className="absolute -bottom-1.5 left-0 h-3.5 w-full rounded-full bg-taxi -z-10" />
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
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-widest text-taxi transition-transform hover:-translate-y-0.5"
              >
                Book on the app
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
              <a
                href="#story"
                className="text-sm font-medium underline decoration-taxi decoration-4 underline-offset-8"
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
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#111" strokeWidth="3" />
                    <circle cx="50" cy="50" r="14" fill="#111" />
                    {Array.from({ length: 6 }).map((_, k) => (
                      <line
                        key={k}
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="8"
                        stroke="#111"
                        strokeWidth="4"
                        strokeLinecap="round"
                        transform={`rotate(${k * 60} 50 50)`}
                      />
                    ))}
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
    { n: "01", t: "Open the app", d: "Tell us where, when, and how long you need a driver. That's it." },
    { n: "02", t: "We dispatch a driver", d: "A vetted PILOTED driver arrives at your door — uniformed, on time, ready." },
    { n: "03", t: "You ride. We drive.", d: "Sit back. Answer emails. Sleep. Talk. It's still your car." },
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

        <div className="mt-16 grid grid-cols-1 gap-px bg-bone/10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              variant="up"
              delay={i * 160}
              className="group flex flex-col items-center justify-between rounded-3xl bg-ink p-8 text-center transition-colors hover:bg-bone/[0.04] lg:p-10"
            >
              <div className="font-display text-6xl font-extrabold text-taxi transition-transform duration-500 group-hover:-translate-y-1 lg:text-7xl">
                {s.n}
              </div>
              <div className="mt-16 text-center">
                <h3 className="font-display text-2xl font-semibold text-bone">
                  {s.t}
                </h3>
                <p className="mt-3 text-bone/60">{s.d}</p>
                <div className="mt-6 mx-auto h-px w-0 bg-taxi transition-all duration-700 group-hover:w-full" />
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
  const plans = [
    {
      name: "By the hour",
      tag: "One-off",
      lead: "A driver for a school run, an errand, a night out.",
      unit: "/ hour",
      bullets: ["2 hour minimum", "On-demand dispatch", "Same-city trips"],
      tone: "bone",
    },
    {
      name: "Half day",
      tag: "Most booked",
      lead: "Four hours of a dedicated driver for events, weddings, city days.",
      unit: "/ 4 hrs",
      bullets: ["Waiting time included", "Fuel not included", "Formal uniform"],
      tone: "taxi",
    },
    {
      name: "Monthly driver",
      tag: "Retainer",
      lead: "A dedicated driver assigned to you and your car, on a monthly plan.",
      unit: "/ month",
      bullets: ["Fixed driver, fixed hours", "Priority dispatch", "Personal briefing"],
      tone: "ink",
    },
  ];

  const toneClass = (t: string) =>
    t === "ink"
      ? "bg-ink text-bone"
      : t === "taxi"
        ? "bg-taxi text-ink"
        : "bg-background text-ink border border-border";

  return (
    <section id="packages" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            — Packages
          </Reveal>
          <Reveal as="h2" variant="gradient" delay={120} className="mt-4 font-display text-5xl font-bold leading-[0.9] lg:text-7xl text-center">
            An hour. A day.
            <br />
            Or every day
            <span className="text-taxi-deep">.</span>
          </Reveal>
          <Reveal as="p" variant="up" delay={240} className="mx-auto mt-6 max-w-md text-muted-foreground text-center">
            Rates and quotes finalise inside the app — this is the shape of it.
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              variant="up"
              delay={i * 140}
              className={`tile-hover group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 lg:p-10 text-center ${toneClass(p.tone)}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs uppercase tracking-[0.3em] opacity-60">
                    {p.tag}
                  </span>
                  <span className="font-display text-xs opacity-40">/ 0{i + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-5xl text-center">
                  {p.name}
                </h3>
                <p className="mt-4 max-w-sm mx-auto text-sm opacity-70 text-center">{p.lead}</p>
              </div>

              <div className="mt-10 border-t border-current/15 pt-6 flex flex-col items-center text-center">
                <ul className="space-y-2 text-sm opacity-80 inline-block text-left">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col items-center gap-1">
                  <span className="font-display text-2xl font-semibold tracking-tight">
                    From
                  </span>
                  <span className="font-display text-xs uppercase tracking-widest opacity-60">
                    Quoted in-app {p.unit}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
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
    <section id="app" className="relative overflow-hidden border-b border-border bg-taxi text-ink">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] checker-stripe" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center justify-center text-center px-6 py-24 lg:px-10 lg:py-32">
        <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-ink/70">
          — Book only in the app
        </Reveal>
        <Reveal as="h2" variant="gradient" delay={120} className="mt-4 font-display text-5xl font-bold leading-[0.9] lg:text-7xl text-center">
          Download. Tap. Drive.
        </Reveal>
        <Reveal as="p" variant="up" delay={260} className="mt-6 max-w-md text-ink/80 text-center">
          The website tells the story. The app does the work. Bookings,
          dispatch and driver tracking live entirely in the PILOTED app.
        </Reveal>

        <Reveal variant="up" delay={340} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <StoreButton store="App Store" sub="Download on the" />
          <StoreButton store="Google Play" sub="Get it on" />
        </Reveal>
      </div>
    </section>
  );
}

function StoreButton({ store, sub }: { store: string; sub: string }) {
  return (
    <a
      href="#"
      className="group flex min-w-[220px] items-center justify-center gap-4 rounded-2xl bg-ink px-6 py-5 text-taxi transition-transform hover:-translate-y-1"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full border border-taxi/40 font-display text-lg font-bold">
        ▶
      </span>
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[10px] uppercase tracking-widest text-taxi/60">
          {sub}
        </span>
        <span className="font-display text-lg font-semibold">{store}</span>
      </span>
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
