"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

type InteractiveLottieIconProps = {
  src: string;
  size: "location" | "order";
};

export type InteractiveLottieIconHandle = {
  playOnce: () => void;
};

const InteractiveLottieIcon = forwardRef<InteractiveLottieIconHandle, InteractiveLottieIconProps>(
  function InteractiveLottieIcon({ src, size }, ref) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const playOnce = useCallback(() => {
    if (!dotLottie) return;
    if (dotLottie.isPlaying) return;
    dotLottie.setFrame(0);
    dotLottie.play();
  }, [dotLottie]);

  useImperativeHandle(
    ref,
    () => ({
      playOnce
    }),
    [playOnce]
  );

  return (
    <DotLottieReact
      aria-hidden="true"
      autoplay={false}
      className={`navbar_info-icon-lottie ${size}`}
      dotLottieRefCallback={setDotLottie}
      loop={false}
      onClick={playOnce}
      onMouseEnter={playOnce}
      onTouchStart={playOnce}
      src={src}
    />
  );
  }
);

export default InteractiveLottieIcon;
