"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { LINE_LOTTIE_SPEED, LINE_LOTTIE_SRC } from "@/lib/site-shell-data";

export type HoverUnderlineLottieHandle = {
  playOnce: () => void;
  /** Hide stroke at rest (avoids last frame sticking after hover). */
  reset: () => void;
};

type HoverUnderlineLottieProps = {
  className: string;
};

const HoverUnderlineLottie = forwardRef<HoverUnderlineLottieHandle, HoverUnderlineLottieProps>(
  function HoverUnderlineLottie({ className }, ref) {
    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

    const playOnce = useCallback(() => {
      if (!dotLottie) return;
      if (dotLottie.isPlaying) return;
      dotLottie.setSpeed(LINE_LOTTIE_SPEED);
      dotLottie.resize();
      dotLottie.setFrame(0);
      dotLottie.play();
    }, [dotLottie]);

    const reset = useCallback(() => {
      if (!dotLottie) return;
      dotLottie.stop();
      dotLottie.setFrame(0);
    }, [dotLottie]);

    useEffect(() => {
      reset();
    }, [reset]);

    useImperativeHandle(
      ref,
      () => ({
        playOnce,
        reset
      }),
      [playOnce, reset]
    );

    return (
      <DotLottieReact
        aria-hidden="true"
        autoplay={false}
        className={className}
        dotLottieRefCallback={setDotLottie}
        loop={false}
        speed={LINE_LOTTIE_SPEED}
        src={LINE_LOTTIE_SRC}
      />
    );
  }
);

export default HoverUnderlineLottie;
