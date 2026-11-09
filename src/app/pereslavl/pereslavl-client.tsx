"use client";

import Image from "next/image";
import Slider from "../components/slider";
import type { PereslavlPageContent } from "@/content/pereslavl-page";

type Props = {
  content: PereslavlPageContent;
  source: "directus" | "fallback";
};

export default function PereslavlClient({ content }: Props) {
  return (
    <div className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-10 max-w-3xl">
          <p className="section-eyebrow">Путеводитель для гостей</p>
          <h2 className="section-title">{content.title}</h2>
        </div>

        {content.sections.map((section, index) => {
          const reverse = index % 2 === 1;
          return (
            <section key={section.id} id={section.id} className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14">
              <div className={reverse ? "md:order-2" : ""}>
                <Slider>
                  {section.images.map((imagePath, imageIndex) => (
                    <Image
                      key={imagePath}
                      className="slider_image"
                      src={imagePath}
                      alt={section.title}
                      height={900}
                      width={1200}
                      priority={index === 0 && imageIndex === 0}
                    />
                  ))}
                </Slider>
              </div>
              <div className={reverse ? "md:order-1" : ""}>
                <h3 className="mb-5 text-2xl font-semibold md:text-3xl">{section.title}</h3>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="body-text mb-4">{paragraph}</p>
                ))}
                <div className="mt-5 flex flex-wrap gap-2">
                  {section.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </section>
          );
        })}

        <section id="practical" className="card-surface mt-12 px-6 py-10 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-5 text-2xl font-semibold md:text-3xl">{content.practical_info.title}</h3>
            <p className="body-text mb-8">{content.practical_info.description}</p>
            <div className="grid gap-5 text-left md:grid-cols-2">
              <div className="card-surface p-6">
                <h4 className="mb-3 font-semibold">Как добраться</h4>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {content.practical_info.transport.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
              <div className="card-surface p-6">
                <h4 className="mb-3 font-semibold">Лучшее время для посещения</h4>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {content.practical_info.seasonality.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
