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
  const leftTextRef = useRef<HTMLHeadingElement | null>(null);
  const rightTextMainRef = useRef<HTMLHeadingElement | null>(null);
  const rightTextSecondaryRef = useRef<HTMLHeadingElement | null>(null);
  const headingTextRef = useRef<HTMLHeadingElement | null>(null);
  const doesntRef = useRef<HTMLSpanElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      gsap.set([leftTextRef.current, rightTextMainRef.current, doesntRef.current], {
        skewX: 0,
      });

      const tl = gsap.timeline({
        delay: 0.82, defaults: { duration: 2.92, ease: "cubic-bezier(0.7, 0, 1, 1)" }
      });

      tl.to(leftTextRef.current, {
        x: 362,      // move slightly right
      })
        .to(
          rightTextMainRef.current,
          {
            x: -350,  // move slightly left
          },
          "<"       // start at same time
        )
        .to(
          boxRef.current,
          {
            scale: 0,
            opacity: 0,
          },
          "<"     // overlap so it shrinks as the words move
        )

        .to(
          [leftTextRef.current, rightTextMainRef.current],
          {
            color: "#00b684",
            duration: 1.05,
            skewX: -15,
            ease: "power1.inOut",
            
          }
        )

        .to(
          doesntRef.current,
          {
            color: "#00b684",
            duration: 1.05,
            skewX: -15,
            ease: "none",
            
          },
          "<" // start at same time as the previous animation
        );
            }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading1}>
          Health insurance <br className={styles.tabletBreak} />that <span ref={doesntRef} className={styles.doesnt}>doesn&apos;t</span>
        </h1>
        <h1 className={styles.heading1Mobile}>
          Health insurance that doesn&apos;t get
        </h1>
        <div className={styles.lineTwo}>
          <h1 className={styles.heading1NoPaddingHidden} ref={leftTextRef}>get in </h1> 
          <Box ref={boxRef}> </Box>
          <h1 className={styles.heading1NoPaddingHidden} ref={rightTextMainRef}>the way.</h1>
          <h1 className={styles.heading1MobileNoPadding} ref={rightTextSecondaryRef}>in the way.</h1>
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
