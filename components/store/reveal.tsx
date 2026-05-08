"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
  type CSSProperties,
  type ComponentPropsWithoutRef,
} from "react";

type Animation = "fadeUp" | "fadeInBlur" | "scaleIn" | "slideRight" | "slideLeft" | "revealClip" | "fadeLeft";

type Props<T extends ElementType = "div"> = {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: T;
  threshold?: number;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className" | "style">;

export function Reveal<T extends ElementType = "div">({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 650,
  className,
  style,
  as,
  threshold = 0.12,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -32px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(visible
          ? { animation: `${animation} ${duration}ms var(--ease, cubic-bezier(.4,0,.2,1)) ${delay}ms both` }
          : { opacity: 0 }),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
