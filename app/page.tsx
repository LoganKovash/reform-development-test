"use client";

import styles from "./page.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Box from "./components/Box";
import InfoBox from "./components/infoBox";
import Carousel from "./components/Carousel";
import ButtonGroup from "./components/ButtonGroup";
import ArrowRight from "./components/ArrowRight";


export default function Home() {

  // ---------- TEXT & ELEMENT REFS ----------
  // These references point to heading elements that animate differently on desktop/tablet/mobile.
  const leftTextRef = useRef<HTMLHeadingElement | null>(null);
  const rightTextMainRef = useRef<HTMLHeadingElement | null>(null);

  // Mobile-specific heading refs
  const rightTextRefMobile = useRef<HTMLHeadingElement | null>(null);
  const leftTextRefMobile = useRef<HTMLHeadingElement | null>(null);

  // Highlighted “doesn’t” span (desktop + mobile)
  const headingTextRef = useRef<HTMLHeadingElement | null>(null);
  const doesntRef = useRef<HTMLSpanElement | null>(null);
  const doesntRefMobile = useRef<HTMLSpanElement | null>(null);

  // Animated box between “get in” & “the way”
  const boxRef = useRef<HTMLDivElement | null>(null);

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
          
          // Reset to known baseline before running any animation
          gsap.set(
            [leftTextRef.current, rightTextMainRef.current, doesntRef.current],
            { skewX: 0 }
          );

          const tl = gsap.timeline({
            delay: 0.82,
            defaults: {
              duration: 2.92,
              ease: "cubic-bezier(0.7, 0, 1, 1)",
            },
          });

          // -------------------------
          // DESKTOP ANIMATION
          // -------------------------
          if (desktop) {
            tl.to(leftTextRef.current, { x: 362, ease: "power4.inOut" })
              .to(
                rightTextMainRef.current,
                { x: -350, ease: "power4.inOut" },
                "<"
              )
              .to(
                boxRef.current,
                { scale: 0, ease: "power4.inOut" },
                "<"
              )
              .to(boxRef.current, { borderRadius: "30%", ease: "power4.inOut" }, "+=1")
              .to(
                [leftTextRef.current, rightTextMainRef.current],
                {
                  color: "#00b684",
                  duration: 1.05,
                  skewX: -10,
                  ease: "power1.inOut",
                },
                "-=4.75"
              )
              .to(
                doesntRef.current,
                {
                  color: "#00b684",
                  duration: 1.05,
                  skewX: -10,
                  ease: "none",
                },
                "<"
              );
          }

          // -------------------------
          // TABLET ANIMATION
          // -------------------------
          if (tablet) {
            tl.to(leftTextRef.current, { x: 155, ease: "power4.inOut" })      // smaller move
              .to(rightTextMainRef.current, { x: -150, ease: "power4.inOut" }, "<")
              .to(boxRef.current, { scale: 0, ease: "power4.inOut" }, "<")
              .to(boxRef.current, { borderRadius: "30%", ease: "power4.inOut" }, "+=1")
              .to(
                [leftTextRef.current, rightTextMainRef.current],
                { color: "#00b684", duration: 1, skewX: -8 }, "-=4.5"
              )
              .to(
                doesntRef.current,
                { color: "#00b684", skewX: -8 },
                "<"
              );
          }

          // -------------------------
          // MOBILE ANIMATION
          // -------------------------
          if (mobile) {
            tl.to(leftTextRefMobile.current, { y: 70, ease: "power4.inOut" })      // even smaller move
              .to(rightTextRefMobile.current, { y: -5, ease: "power4.inOut" }, "<")
              .to(boxRef.current, { y: 35, scale: 0, ease: "power4.inOut" }, "<")
              .to(boxRef.current, { borderRadius: "30%", ease: "power4.inOut" }, "+=1")
              .to(
                rightTextRefMobile.current,
                { color: "#00b684", duration: 0.9, skewX: -6 }, "-=5"
              )
              .to(
                doesntRefMobile.current,
                { color: "#00b684", skewX: -6 },
                "<"
              );
          }

          return () => tl.kill();
        }
      );

      return () => mm.revert();
    }, []);


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.heading1}>
            Health insurance <br className={styles.tabletBreak} />that <span ref={doesntRef} className={styles.doesnt}>doesn&apos;t</span>
          </h1>
          <h1 className={styles.heading1Mobile} ref={leftTextRefMobile}>
            Health insurance<br /> that <span ref={doesntRefMobile} className={styles.doesnt}>doesn&apos;t get</span><br />
          </h1>
          <div className={styles.lineTwo}>
            <h1 className={styles.heading1NoPaddingHidden} ref={leftTextRef}>get in </h1> 
            <Box ref={boxRef}> </Box>
            <h1 className={styles.heading1NoPaddingHidden} ref={rightTextMainRef}>the way.</h1>
            <h1 className={styles.heading1MobileNoPadding} ref={rightTextRefMobile}>in the way.</h1>
          </div>
        </div>
        <div className={styles.bottom}>
          <InfoBox>
            <ButtonGroup
              leftLabel="Get a Custom Quote Today"
              rightIcon={<ArrowRight />}
              onLeftClick={() => console.log("Left clicked")}
              onRightClick={() => console.log("Right clicked")}
            />
          </InfoBox>
          <Carousel>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
