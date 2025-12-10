"use client";

import styles from "./carousel.module.css";
import { forwardRef, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const IMAGES = [
  { src: "/images/card2.png", w: 394.4, h: 195.2, id: 2 },
  { src: "/images/card3.png", w: 394.4, h: 195.2, id: 3 },
  { src: "/images/card4.png", w: 394.4, h: 195.2, id: 4 },
  { src: "/images/card1.png", w: 394.4, h: 195.2, id: 1 },
];

const Carousel = forwardRef<HTMLDivElement>(function Carousel(_, ref) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let cards = gsap.utils.toArray<HTMLDivElement>(
        ".carousel-card",
        trackRef.current
      );
      if (!cards.length) return;

      const step = 475;       // horizontal distance each card moves
      const scaleUp = 1.3;    // scale factor when centered
      const moveDuration = 2.71;
      const pause = 0.5;

      // 1. Clone cards for seamless looping
      const clonesBefore = cards.map(c => c.cloneNode(true) as HTMLElement);
      trackRef.current!.prepend(...clonesBefore);

      const clonesAfter = cards.map(c => c.cloneNode(true) as HTMLElement);
      trackRef.current!.append(...clonesAfter);

      // 2. Recompute full cards list (clones + originals)
      cards = gsap.utils.toArray<HTMLDivElement>(".carousel-card", trackRef.current);

      // 3. Position track so first original card starts off left
      const initialOffset = -1750; // account for prepended clones
      console.log("Initial offset is:", initialOffset, cards.length)
      gsap.set(trackRef.current, { x: initialOffset });

      const firstCard = cards[clonesBefore.length]; // first original card
      gsap.set(firstCard, { scale: scaleUp });  

      // 4. Build timeline
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      const originalCards = cards.slice(clonesBefore.length, clonesBefore.length + IMAGES.length);

      originalCards.forEach((card, i) => {
        const nextX = initialOffset + i * step;
        // Positive X moves track right → cards appear from left

        tl.to(trackRef.current, { x: nextX, duration: moveDuration, ease: "power4.out" });

        const centerCard = cards[clonesBefore.length - i];

        // Scale current card up as it centers
        tl.to(centerCard, { scale: scaleUp, duration: 0.9, ease: "cubic-bezier(0.8, 0, 0.2, 1)" }, "+=0.1");

        // Scale back down before next card
        tl.to(centerCard, { scale: 1, duration: 0.9, ease: "cubic-bezier(0.8, 0, 0.2, 1)" }, `+=${pause}`);
      });
      // 6. Optional: smooth reset
      tl.set(trackRef.current, { x: initialOffset, duration: 1.71, ease: "power4.out" });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.carousel} ref={ref}>
      <div className={styles.track} ref={trackRef}>
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="carousel-card"
            style={{ width: img.w, height: img.h }}
          >
            <img src={img.src} width={img.w} height={img.h} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
});

export default Carousel;
