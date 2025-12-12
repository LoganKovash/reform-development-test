"use client";

import styles from "./Box.module.css";
import gsap from "gsap";
import { useEffect, useRef, ReactNode, forwardRef } from "react";
import Image from "next/image";

const terms = [
  "unpredictable rate increases",
  "lack of transparency",
  "implementation headaches",
  "claim denials",
  "frustrated users",
];

const Box = forwardRef<HTMLDivElement, { children?: ReactNode }>(
  function Box({ children }, ref) {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1025px)",
          tablet: "(min-width: 501px) and (max-width: 1024px)",
          mobile: "(max-width: 500px)",
        },
        (context) => {
          const { desktop, tablet, mobile } = context.conditions!;
          const element = marqueeRef.current;
          if (!element) return;

          let duration = 20; // default duration
          let xStart = -80;
          let xEnd = 80;
          let startOffset = 0;

          // Customize settings per breakpoint
          if (desktop) {
            duration = 20;
            xStart = -40;
            xEnd = -30;
            startOffset = -36.25;
          } else if (tablet) {
            duration = 15;
            xStart = -40;
            xEnd = -30;
            startOffset = -36.05;
          } else if (mobile) {
            duration = 10;
            xStart = -80;
            xEnd = 40;
            startOffset = -43;
          }

          gsap.set(element, { xPercent: startOffset });

          const tl = gsap.timeline({ repeat: -1, defaults: { ease: "cubic-bezier(0.5, 0, 0, 1);" } });

          tl.to(element, { xPercent: xStart, duration: 2 });
          tl.to(element, { xPercent: xEnd, duration: 2 });


          return () => {
            gsap.killTweensOf(element);
          };
        }
      );

      return () => mm.revert();
    }, []);

    return (
      <div className={styles.box} ref={ref}>
        {children}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeContent} ref={marqueeRef}>
            {terms.map((t, i) => (
              <span key={i} className={styles.item}>
                {t}
                <Image src="/icons/Illo.svg" alt="" width={16} height={16} />
              </span>
            ))}
            {terms.map((t, i) => (
              <span key={`dup-${i}`} className={styles.item}>
                {t}
                <Image src="/icons/Illo.svg" alt="" width={16} height={16} />
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Box;
