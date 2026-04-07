"use client";

import Image from "next/image";
import Slider from "../components/slider";
import type { PereslavlPageContent } from "@/content/pereslavl-page";

type Props = {
  content: PereslavlPageContent;
  source: "directus" | "fallback";
};

export default function PereslavlClient({ content, source }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl md:text-5xl text-center font-bold mb-16 mt-6">
          {content.title}
        </h1>

        {source === "fallback" ? (
          <p className="mb-8 text-sm text-amber-700">
            Сейчас используется локальный контент. Для Directus добавь
            `DIRECTUS_STATIC_TOKEN` в env.
          </p>
        ) : null}

        {content.sections.map((section, index) => {
          const reverse = index % 2 === 1;
          return (
            <section
              key={section.id}
              id={section.id}
              className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center mb-24"
            >
              <div className={reverse ? "md:order-2" : ""}>
                <Slider>
                  {section.images.map((imagePath) => (
                    <Image
                      key={imagePath}
                      className="slider_image"
                      src={imagePath}
                      alt={section.title}
                      height={1000}
                      width={1000}
                      priority={true}
                    />
                  ))}
                </Slider>
              </div>

              <div className={reverse ? "md:order-1" : ""}>
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                <div className="flex flex-wrap gap-2">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section id="practical" className="mb-24 py-12 px-6 bg-blue-50 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{content.practical_info.title}</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              {content.practical_info.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">Как добраться</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {content.practical_info.transport.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">Лучшее время для посещения</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {content.practical_info.seasonality.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
