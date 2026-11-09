"use client";

import { useEffect, useRef, useState } from "react";
import type { SectionId } from "@/content/site";

export function useActiveSection(ids: readonly SectionId[]): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(ids[0] ?? "home");
  const activeRef = useRef(activeSection);

  useEffect(() => {
    const selectSection = (id: SectionId, updateHash: boolean) => {
      if (activeRef.current === id) return;
      activeRef.current = id;
      setActiveSection(id);
      if (updateHash) window.history.replaceState(null, "", `#${id}`);
    };

    let requestedSection: SectionId | null = null;
    const selectFromHash = () => {
      const id = window.location.hash.slice(1) as SectionId;
      if (!ids.includes(id)) return;
      requestedSection = id;
      selectSection(id, false);
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768 ? "instant" as ScrollBehavior : "smooth",
        block: "start",
      });
    };

    const updateActive = () => {
      if (requestedSection) {
        const target = document.getElementById(requestedSection)?.getBoundingClientRect();
        if (target && target.top >= 0 && target.top <= 500) requestedSection = null;
        else return;
      }
      const readingLine = Math.min(window.innerHeight * 0.3, 160);
      const sections = ids.map((id) => ({ id, rect: document.getElementById(id)?.getBoundingClientRect() }));
      const current = sections.find(({ rect }) => rect && rect.top <= readingLine && rect.bottom > readingLine);
      const last = sections[sections.length - 1];
      const visibleLast = last?.rect && last.rect.top <= window.innerHeight * 0.8 ? last : undefined;
      const selected = current ?? visibleLast;
      if (selected?.id) selectSection(selected.id, true);
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    const scheduleUpdate = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(updateActive, 180);
    };

    selectFromHash();
    scheduleUpdate();
    window.addEventListener("hashchange", selectFromHash);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const observer = new IntersectionObserver(scheduleUpdate, {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0, 0.1, 0.5],
    });
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      window.removeEventListener("hashchange", selectFromHash);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [ids]);

  return activeSection;
}
