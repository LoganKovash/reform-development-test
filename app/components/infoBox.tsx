"use client";

import styles from "./infoBox.module.css";
import gsap from "gsap";
import { useEffect, useRef, ReactNode, forwardRef } from "react";

const InfoBox = forwardRef<HTMLDivElement, { children?: ReactNode }>(
  function InfoBox({ children }, ref) {
    return (
      <div className={styles.container} ref={ref}>
        <div className={styles.text}>
            <p className={styles.bodyL}>
                Join hundreds of businesses who trust us to offer health insurance that works the way it should: affordable coverage that puts employees and <br className={styles.break}/>their doctors in the driving seat.
            </p>
        </div>

        <div className={styles.actions}>
          {children}
        </div>
      </div>
    );
  }
);

export default InfoBox;
