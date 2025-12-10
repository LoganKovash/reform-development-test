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
      gsap.to(marqueeRef.current, {
        xPercent: -30,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
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
