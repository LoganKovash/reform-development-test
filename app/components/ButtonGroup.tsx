"use client";

import { useRef } from "react";
import gsap from "gsap";
import styles from "./buttonGroup.module.css";

type ButtonGroupProps = {
  leftLabel: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  rightIcon?: React.ReactNode;
};

export default function ButtonGroup({
  leftLabel,
  onLeftClick,
  onRightClick,
  rightIcon,
}: ButtonGroupProps) {
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const borderRef = useRef<HTMLSpanElement>(null);
  const rightIconRef = useRef<HTMLSpanElement>(null);

  const gap = 6;

  const handleMouseEnter = () => {
    if (!leftButtonRef.current || !rightButtonRef.current || !borderRef.current) return;

    const leftWidth = leftButtonRef.current.offsetWidth;
    const rightWidth = rightButtonRef.current.offsetWidth;

    const rightDeltaX = -(leftWidth + gap);
    const leftDeltaX = rightWidth + gap;

    gsap.set(rightButtonRef.current, { zIndex: 1 });

    const tl = gsap.timeline();

    tl.to(
      rightButtonRef.current,
      {
        x: rightDeltaX,
        color: "#00B684",
        duration: 0.6,
        ease: "power2.inOut",
      },
      0
    )
      .to(
        leftButtonRef.current,
        {
          x: leftDeltaX,
          color: "#00B684",
          borderColor: "#00B684",
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        borderRef.current,
        {
          background:
            "conic-gradient(#00B684 100deg 315deg, #FBFAF6 300deg 360deg)",
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      );
  };

  const handleMouseLeave = () => {
    if (!leftButtonRef.current || !rightButtonRef.current || !borderRef.current) return;

    gsap.set(rightButtonRef.current, { zIndex: 10 });

    gsap.to([leftButtonRef.current, rightButtonRef.current], {
      x: 0,
      color: "#30715D",
      borderColor: "#30715D",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(rightButtonRef.current, { zIndex: 1 });
      },
    });

    gsap.to(borderRef.current, {
      background:
        "conic-gradient(#30715D 100deg 315deg, #FBFAF6 300deg 360deg)",
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const handleRightPress = () => {
    if (!rightIconRef.current) return;

    const tl = gsap.timeline();

    tl.to(rightIconRef.current, {
      y: 10,        // move icon down out of view
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    })
      .set(rightIconRef.current, {
        y: -10,     // jump ABOVE the button
        opacity: 0,
      })
      .to(rightIconRef.current, {
        y: 0,       // fall back down to original spot
        opacity: 1,
        duration: 0.30,
        ease: "power2.out",
      });
  };

// Release doesn't need to animate — press animation handles full sequence
const handleRightRelease = () => {};



  return (
    <div
      className={styles.group}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={leftButtonRef}
        className={styles.leftButton}
        onClick={onLeftClick}
      >
        {leftLabel}
      </button>

    <button
      ref={rightButtonRef}
      className={styles.rightButton}
      onClick={onRightClick}
      onMouseDown={handleRightPress}
      onMouseUp={handleRightRelease}
      onMouseLeave={handleRightRelease} // ensures it resets even if cursor leaves mid-click
    >
      <span
        ref={(el) => {
          borderRef.current = el;
          if (el) {
            el.style.background =
              "conic-gradient(#30715D 100deg 315deg, #FBFAF6 300deg 360deg)";
            el.style.willChange = "background";
            void el.offsetWidth;
          }
        }}
        className={styles.border}
      />

      {/* Wrap icon so we can animate it independently */}
      <span ref={rightIconRef} className={styles.iconWrapper}>
        {rightIcon}
      </span>
    </button>

    </div>
  );
}
