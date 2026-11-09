"use client";

import { useEffect, useRef } from "react";
import { SITE_CONTACTS } from "@/content/site";

declare global {
  interface Window {
    homereserve?: {
      initWidgetList: (config: { token: string; tag: string }) => void;
    };
  }
}

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const widgetToken = process.env.NEXT_PUBLIC_HOMERESERVE_TOKEN;
    const section = sectionRef.current;
    if (!widgetToken || !section) return;

    const loadWidget = () => {
      const scriptId = "homereserve-widget-script";
      const initWidget = () => {
        window.homereserve?.initWidgetList({ token: widgetToken, tag: "web" });
      };
      const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (existing) {
        if (window.homereserve) initWidget();
        else existing.addEventListener("load", initWidget, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src = "https://homereserve.ru/widget.js";
      script.onload = initWidget;
      document.body.appendChild(script);
    };

    if (!("IntersectionObserver" in window)) {
      loadWidget();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      loadWidget();
      observer.disconnect();
    }, { rootMargin: "300px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="booking" ref={sectionRef} className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-8 max-w-2xl">
          <p className="section-eyebrow">Бронирование</p>
          <h2 className="section-title">Выберите даты отдыха</h2>
          <p className="body-text mt-4">Проверьте свободные даты в виджете или уточните детали по телефону.</p>
        </div>
        {process.env.NEXT_PUBLIC_HOMERESERVE_TOKEN ? (
          <div id="hr-widget" />
        ) : (
          <div className="card-surface max-w-2xl p-6 md:p-8">
            <h3 className="mb-3 text-xl font-semibold">Забронировать по телефону</h3>
            <p className="body-text mb-5">Онлайн-календарь сейчас недоступен. Позвоните, и мы подскажем свободные даты и ответим на вопросы.</p>
            <a className="button-primary" href={SITE_CONTACTS.phoneHref}>{SITE_CONTACTS.phoneDisplay}</a>
          </div>
        )}
      </div>
    </section>
  );
}
