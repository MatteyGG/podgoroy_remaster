"use client";

import Link from "next/link";
import ThemeSwitcher from "./themeSwitcher";
import { HOME_SECTIONS, SITE_CONTACTS, type SectionId } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navigateToSection } from "@/utils/scrollUtils";

const SECTION_IDS = HOME_SECTIONS.map((section) => section.id);

export default function Navbar() {
  const activeSection = useActiveSection(SECTION_IDS);

  const linkClass = (id: SectionId) =>
    `block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
      activeSection === id
        ? "text-blue-700 underline decoration-2 underline-offset-8 dark:text-blue-300"
        : "text-gray-600 dark:text-gray-300"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 text-gray-950 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 dark:text-white">
      <div className="mx-auto flex min-h-20 max-w-screen-xl items-center justify-between gap-4 px-4">
        <Link href="/#home" className="shrink-0 text-2xl font-semibold md:text-3xl" onClick={(event) => navigateToSection(event, "home")}>Подгорой</Link>

        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {HOME_SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`/#${section.id}`} className={linkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined} onClick={(event) => navigateToSection(event, section.id)}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={SITE_CONTACTS.phoneHref} className="hidden px-3 text-sm text-gray-600 hover:underline dark:text-gray-300 lg:block">
            {SITE_CONTACTS.phoneDisplay}
          </a>
          {/* <div className="flex gap-1">
            <a href="/registration" className="px-3 py-1 rounded-md">Регистрация</a>
            <a href="/login" className="bg-primary px-3 py-1 rounded-md">Войти</a>
          </div> */}
          <ThemeSwitcher />
          <details className="relative md:hidden" onKeyDown={(event) => {
            if (event.key === "Escape") event.currentTarget.open = false;
          }}>
            <summary className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium dark:border-gray-700">Меню</summary>
            <nav aria-label="Мобильная навигация" className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
              <ul>
                {HOME_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a href={`/#${section.id}`} className={linkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined} onClick={(event) => {
                      navigateToSection(event, section.id);
                      event.currentTarget.closest("details")!.open = false;
                    }}>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
