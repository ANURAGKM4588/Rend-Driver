import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "clip";

interface RevealProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  once?: boolean;
  style?: CSSProperties;
}

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{
        ...style,
        ...({ "--reveal-delay": `${delay}ms` } as CSSProperties),
      }}
    >
      {children}
    </Component>
  );
}
