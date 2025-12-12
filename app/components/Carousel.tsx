"use client";

import styles from "./carousel.module.css";
import { forwardRef, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const IMAGES = [
  { src: "/images/card2.png", w: 394.4, h: 195.2, id: 2 },
  { src: "/images/card3.png", w: 394.4, h: 195.2, id: 3 },
  { src: "/images/card4.png", w: 394.4, h: 195.2, id: 4 },
  { src: "/images/card1.png", w: 394.4, h: 195.2, id: 1 },
];

const Carousel = forwardRef<HTMLDivElement>(function Carousel(_, ref) {
  const trackRef = useRef<HTMLDivElement>(null);
  const internalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1025px)",
        tablet: "(min-width: 501px) and (max-width: 1024px)",
        mobile: "(max-width: 500px)"
      },
      (context) => {
        const { desktop, tablet, mobile } = context.conditions!;
        const track = trackRef.current;

        if (!track) return;

        // Reset any transforms
        gsap.set(track.children, { clearProps: "all" });
        gsap.set(track, { clearProps: "all" });

        // Clone cards for looping
        let cards = gsap.utils.toArray<HTMLElement>(".carousel-card", track);
        const clonesA = cards.map((c) => c.cloneNode(true) as HTMLElement);
        const clonesB = cards.map((c) => c.cloneNode(true) as HTMLElement);
        track.prepend(...clonesA);
        track.append(...clonesB);

        cards = gsap.utils.toArray<HTMLElement>(".carousel-card", track);

        const scaleUp = 1.3;
        const moveDuration = 2.7;
        const pause = 0.5;

        const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

        // -------------------------
        // DESKTOP ANIMATION
        // -------------------------
        if (desktop) {
          const step = 475;
          const initialOffset = -1750;

          gsap.set(track, { x: initialOffset });

          const originals = cards.slice(clonesA.length, clonesA.length + IMAGES.length);

          originals.forEach((card, i) => {
            const nextX = initialOffset + i * step;

            tl.to(track, { x: nextX, duration: moveDuration });

            const centerCard = cards[clonesA.length - i];
            tl.to(centerCard, { scale: scaleUp, duration: 0.9 }, "+=0.1");
            tl.to(centerCard, { scale: 1, duration: 0.9 }, `+=${pause}`);
          });

          tl.set(track, { x: initialOffset, duration: moveDuration });
        }

        // -------------------------
        // TABLET ANIMATION
        // -------------------------
        if (tablet) {
          const step = 275;
          const initialOffset = 400;

          gsap.set(track, { y: initialOffset });

          const originals = cards.slice(clonesA.length, clonesA.length + IMAGES.length);

          originals.forEach((card, i) => {
            const nextX = initialOffset + i * step;

            tl.to(track, { y: nextX, duration: moveDuration });

            const centerCard = cards[clonesA.length - i];
            tl.to(centerCard, { scale: scaleUp, duration: 0.9 }, "+=0.1");
            tl.to(centerCard, { scale: 1, duration: 0.9 }, `+=${pause}`);
          });

          tl.set(track, { y: initialOffset, duration: moveDuration });
        }

        // -------------------------
        // MOBILE ANIMATION
        // -------------------------
        if (mobile) {
          const step = 242;
          const initialOffset = -905;

          gsap.set(track, { x: initialOffset });

          const originals = cards.slice(clonesA.length, clonesA.length + IMAGES.length);

          originals.forEach((card, i) => {
            const nextX = initialOffset + i * step;

            tl.to(track, { x: nextX, duration: moveDuration });

            const centerCard = cards[clonesA.length - i];
            tl.to(centerCard, { scale: scaleUp, duration: 0.9 }, "+=0.1");
            tl.to(centerCard, { scale: 1, duration: 0.9 }, `+=${pause}`);

            if(i === originals.length - 1) {
              tl.to(track, { x: 65, duration: moveDuration });
            }
          });

          tl.set(track, { x: initialOffset, duration: moveDuration });
        }



        return () => {
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div className={styles.carousel} ref={internalRef}>
      <div className={styles.track} ref={trackRef}>
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="carousel-card"
            style={{ width: img.w, height: img.h }}
          >
            <Image src={img.src} width={img.w} height={img.h} alt="" className={styles.carouselImage}/>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Carousel;
