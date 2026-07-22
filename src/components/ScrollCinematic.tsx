import { useEffect, useRef, type ReactNode } from "react";

interface ScrollCinematicProps {
  children: ReactNode;
  className?: string;
}

/**
 * Aperture reveal.
 *
 * The image is masked by an expanding rounded rectangle that opens from
 * a thin horizontal slit at the center — like a cinema aperture or
 * camera shutter blade retracting. The image starts blurred, zoomed and
 * desaturated, then resolves to sharp/full-color as the aperture opens.
 * A hairline taxi-yellow rule tracks the top and bottom edges of the
 * aperture during the reveal. After the reveal, continued scroll
 * produces a soft vertical parallax.
 */
export function ScrollCinematic({ children, className }: ScrollCinematicProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.style.setProperty("--ap-inset-y", "0%");
      wrap.style.setProperty("--ap-inset-x", "0%");
      wrap.style.setProperty("--ap-blur", "0px");
      wrap.style.setProperty("--ap-scale", "1");
      wrap.style.setProperty("--ap-sat", "1");
      wrap.style.setProperty("--ap-rule", "0");
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // overall progress across the whole pass (parallax)
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));

      // reveal window: 0 when top hits bottom of viewport, 1 near 35% up
      const revealStart = vh;
      const revealEnd = vh * 0.35;
      const rp = Math.max(
        0,
        Math.min(1, (revealStart - rect.top) / (revealStart - revealEnd)),
      );
      // easeOutExpo — dramatic opening
      const eased = rp === 1 ? 1 : 1 - Math.pow(2, -10 * rp);

      // vertical aperture opens first (0..0.55), horizontal expands next (0.35..1)
      const vp = Math.min(1, eased / 0.55);
      const hp = Math.max(0, (eased - 0.35) / 0.65);
      const hpEased = Math.min(1, Math.max(0, hp));

      // insets: start as a thin horizontal slit at center (48% top/bottom, 8% side padding)
      const insetY = (1 - vp) * 48; // 48% -> 0%
      const insetX = (1 - hpEased) * 8; // 8% -> 0%

      const blur = (1 - eased) * 14; // 14px -> 0
      const scale = 1.18 - eased * 0.18;
      const sat = 0.35 + eased * 0.65;
      const rule = Math.sin(Math.PI * rp); // hairline glow peaks mid-reveal

      const imgY = (p - 0.5) * -36;

      wrap.style.setProperty("--ap-inset-y", `${insetY}%`);
      wrap.style.setProperty("--ap-inset-x", `${insetX}%`);
      wrap.style.setProperty("--ap-blur", `${blur}px`);
      wrap.style.setProperty("--ap-scale", `${scale}`);
      wrap.style.setProperty("--ap-sat", `${sat}`);
      wrap.style.setProperty("--ap-rule", `${rule}`);
      wrap.style.setProperty("--ap-img-y", `${imgY}px`);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "relative",
        borderRadius: 24,
        background: "#0b0b0c",
        overflow: "hidden",
      }}
    >
      {/* Aperture-masked image */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            clipPath:
              "inset(var(--ap-inset-y, 48%) var(--ap-inset-x, 8%) var(--ap-inset-y, 48%) var(--ap-inset-x, 8%) round 20px)",
            WebkitClipPath:
              "inset(var(--ap-inset-y, 48%) var(--ap-inset-x, 8%) var(--ap-inset-y, 48%) var(--ap-inset-x, 8%) round 20px)",
            transition:
              "clip-path 180ms cubic-bezier(0.22, 1, 0.36, 1), -webkit-clip-path 180ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "clip-path",
          } as React.CSSProperties
        }
      >
        <div
          style={
            {
              height: "100%",
              transform:
                "translate3d(0, var(--ap-img-y, 0px), 0) scale(var(--ap-scale, 1.18))",
              filter:
                "blur(var(--ap-blur, 14px)) saturate(var(--ap-sat, 0.35)) contrast(calc(0.9 + 0.15 * var(--ap-sat, 0.35)))",
              transition: "transform 160ms linear, filter 160ms linear",
              willChange: "transform, filter",
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>

      {/* Top hairline rule tracking the aperture */}
      <div
        aria-hidden
        style={
          {
            position: "absolute",
            left: "var(--ap-inset-x, 8%)",
            right: "var(--ap-inset-x, 8%)",
            top: "var(--ap-inset-y, 48%)",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, #f5c518 50%, transparent 100%)",
            opacity: "var(--ap-rule, 0)",
            transition:
              "top 180ms cubic-bezier(0.22, 1, 0.36, 1), left 180ms, right 180ms, opacity 180ms",
            pointerEvents: "none",
          } as React.CSSProperties
        }
      />
      {/* Bottom hairline rule */}
      <div
        aria-hidden
        style={
          {
            position: "absolute",
            left: "var(--ap-inset-x, 8%)",
            right: "var(--ap-inset-x, 8%)",
            bottom: "var(--ap-inset-y, 48%)",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, #f5c518 50%, transparent 100%)",
            opacity: "var(--ap-rule, 0)",
            transition:
              "bottom 180ms cubic-bezier(0.22, 1, 0.36, 1), left 180ms, right 180ms, opacity 180ms",
            pointerEvents: "none",
          } as React.CSSProperties
        }
      />

      {/* Subtle vignette for cinematic depth */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
          borderRadius: 24,
        }}
      />
    </div>
  );
}
