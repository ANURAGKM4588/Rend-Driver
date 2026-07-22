import { useEffect, useRef, type ReactNode } from "react";

interface Scroll3DProps {
  children: ReactNode;
  className?: string;
  /** Max rotateX in deg (top vs bottom of viewport) */
  rotate?: number;
  /** Max Y translation in px (parallax) */
  parallax?: number;
  /** Max scale delta (1 -> 1+scale) */
  scale?: number;
}

/**
 * Scroll-driven 3D transform. Rotates on X-axis, parallaxes and subtly
 * scales as the element passes through the viewport. Uses rAF + a single
 * scroll listener for smoothness.
 */
export function Scroll3D({
  children,
  className,
  rotate = 12,
  parallax = 40,
  scale = 0.06,
}: Scroll3DProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: 0 when element top hits bottom of viewport,
      // 1 when element bottom leaves top of viewport
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      // center at 0.5 -> flat, edges tilt
      const t = (p - 0.5) * 2; // -1 .. 1
      const rx = -t * rotate;
      const ty = t * parallax;
      const sc = 1 + (1 - Math.abs(t)) * scale;
      inner.style.transform = `perspective(1200px) rotateX(${rx}deg) translate3d(0, ${ty}px, 0) scale(${sc})`;
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
  }, [rotate, parallax, scale]);

  return (
    <div ref={wrapRef} className={className} style={{ perspective: "1200px" }}>
      <div
        ref={innerRef}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 120ms linear",
        }}
      >
        {children}
      </div>
    </div>
  );
}
