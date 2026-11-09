"use client";

import { Children, ReactNode, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Slider({ children }: { children: ReactNode }) {
  const autoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins().autoplay;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      if (media.matches) {
        plugin.stop();
        setIsPlaying(false);
      }
    };

    applyPreference();
    media.addEventListener("change", applyPreference);
    return () => {
      media.removeEventListener("change", applyPreference);
      plugin.stop();
    };
  }, [emblaApi]);

  const togglePlayback = () => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins().autoplay;
    if (isPlaying) plugin.stop();
    else plugin.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="embla relative place-self-start">
      <div className="embla__viewport" ref={emblaRef} aria-live="off">
        <div className="embla__container">
          {Children.map(children, (child, index) => (
            <div className="embla__slide" key={index}>{child}</div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="slider-toggle"
        aria-pressed={isPlaying}
        onClick={togglePlayback}
      >
        {isPlaying ? "Пауза" : "Продолжить"}
      </button>
    </div>
  );
}
