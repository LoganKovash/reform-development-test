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
          // const initialOffset = -1750;

          const originals = cards.slice(clonesA.length, clonesA.length + IMAGES.length);

          // Width calculations
          const container = internalRef.current;
          const firstCard = originals[0];
          const cardWidth = firstCard.offsetWidth;
          const containerCenter = container.offsetWidth / 2;
          const initialCenterCard = originals[0];
          const trackRect = track.getBoundingClientRect();
          const firstCardRect = firstCard.getBoundingClientRect();
          const firstCardCenter = firstCardRect.left - trackRect.left + cardWidth / 2;

          const initialOffset = containerCenter - firstCardCenter;

          gsap.set(track, { x: initialOffset });

          gsap.set(initialCenterCard, { scale: scaleUp }); // start scaled up

          originals.forEach((card, i) => {
            const nextX = initialOffset + i * step;

            tl.to(track, { x: nextX, duration: moveDuration, ease: "power4.inOut" }, "-=1");

            const centerCard = cards[clonesA.length - i];
            if (i === 0) {
              tl.to(centerCard, { scale: 1, duration: 1, ease: "power4.inOut" }, "-=0.5");
            } else {
              tl.to(centerCard, { scale: scaleUp, duration: 1.5, ease: "power4.inOut" }, "+=0.1");
              tl.to(centerCard, { scale: 1, duration: 1.5, ease: "power4.inOut" }, `+=${pause}`);
            }
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

          const initialCenterCard = originals[0];

          gsap.set(initialCenterCard, { scale: scaleUp });

          originals.forEach((card, i) => {
            const nextX = initialOffset + i * step;

            tl.to(track, { y: nextX, duration: moveDuration, ease: "power4.inOut" }, "-=1");

            const centerCard = cards[clonesA.length - i];
            if(i === 0) {
              tl.to(centerCard, { scale: 1, duration: 1, ease: "power4.inOut" }, "-=0.5");
            } else {
              tl.to(centerCard, { scale: scaleUp, duration: 1.5, ease: "power4.inOut" }, "+=0.1");
              tl.to(centerCard, { scale: 1, duration: 1.5, ease: "power4.inOut" }, `+=${pause}`);
            }

            console.log(nextX)

            if(i === originals.length - 1) {
              tl.to(track, { y: 1500, duration: moveDuration, ease: "power4.inOut" });
              tl.to(clonesA[0], { scale: scaleUp, duration: 1.5, ease: "power4.inOut" }, "+=0.1");
            }
          });

          tl.set(track, { y: initialOffset, duration: moveDuration });
        }

        // -------------------------
        // MOBILE ANIMATION
        // -------------------------
        if (mobile) {
          const step = 242;

          const originals = cards.slice(clonesA.length, clonesA.length + IMAGES.length);

          // Width calculations
          const container = internalRef.current;
          const firstCard = originals[0];
          const cardWidth = firstCard.offsetWidth;
          const containerCenter = container.offsetWidth / 2;
          const initialCenterCard = originals[0];
          const trackRect = track.getBoundingClientRect();
          const firstCardRect = firstCard.getBoundingClientRect();
          const firstCardCenter = firstCardRect.left - trackRect.left + cardWidth / 2;

          const initialOffset = containerCenter - firstCardCenter;

          gsap.set(track, { x: initialOffset });

          gsap.set(initialCenterCard, { scale: scaleUp });
          

          originals.forEach((card, i) => {
            const nextX = initialOffset + i * step;

            tl.to(track, { x: nextX, duration: moveDuration, ease: "power4.inOut" }, "-=1");

            const centerCard = cards[clonesA.length - i];
            if(i === 0) {
              tl.to(centerCard, { scale: 1, duration: 1, ease: "power4.inOut" }, "-=0.5");
            } else {
              tl.to(centerCard, { scale: scaleUp, duration: 1.5, ease: "power4.inOut" }, "+=0.1");
              tl.to(centerCard, { scale: 1, duration: 1.5, ease: "power4.inOut" }, `+=${pause}`);
            }

            if(i === originals.length - 1) {
              tl.to(track, { x: 65, duration: moveDuration, ease: "power4.inOut" });
            }
          });

          tl.set(track, { x: initialOffset, duration: moveDuration, ease: "power4.inOut" }, "-=1");
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
