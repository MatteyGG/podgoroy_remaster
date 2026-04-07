"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    homereserve?: {
      initWidgetList: (config: { token: string; tag: string }) => void;
    };
  }
}

export default function Booking() {
  useEffect(() => {
    const widgetToken = process.env.NEXT_PUBLIC_HOMERESERVE_TOKEN;
    if (!widgetToken) {
      return;
    }

    const scriptId = "homereserve-widget-script";
    const initWidget = () => {
      window.homereserve?.initWidgetList({
        token: widgetToken,
        tag: "web",
      });
    };

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      if (window.homereserve) {
        initWidget();
      } else {
        existing.addEventListener("load", initWidget, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "module";
    script.src = "https://homereserve.ru/widget.js";
    script.onload = initWidget;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Бронирование</h1>
      {!process.env.NEXT_PUBLIC_HOMERESERVE_TOKEN ? (
        <p className="mb-4 text-sm text-red-600">
          Не задан `NEXT_PUBLIC_HOMERESERVE_TOKEN` в env.
        </p>
      ) : null}
      <div id="hr-widget" />
    </section>
  );
}
