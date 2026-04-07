"use client"
import React, { ReactNode } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export default function Slider({ children }: { children: ReactNode }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({
        delay: 6000,
    })])

    return (
    <div className="embla rounded-2xl place-self-start">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {children}
        </div>
      </div>
    </div>
    )
}

