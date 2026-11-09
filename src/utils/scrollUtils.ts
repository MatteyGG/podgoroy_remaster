import type { MouseEvent } from "react";
import type { SectionId } from "@/content/site";

export function navigateToSection(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  window.history.pushState(null, "", `#${id}`);
  window.dispatchEvent(new Event("hashchange"));
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768 ? "instant" as ScrollBehavior : "smooth",
    block: "start",
  });
}

export const scrollToElement = (element: HTMLElement, offset: number = 0) => {
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementPosition - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
};

export const scrollToDataNav = (navId: string, offset: number = 0) => {
  if (typeof document === "undefined") return;

  const selector = `[data-scroll-nav="${navId}"]`;
  const target = document.querySelector(selector) as HTMLElement | null;

  if (target) {
    scrollToElement(target, offset);
  } else {
    console.warn(`Element with ${selector} not found`);
  }
};

export type ScrollHandler = (navId: string) => void;
