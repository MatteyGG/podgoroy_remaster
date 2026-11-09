"use client";

import Link from "next/link";
import { HOME_SECTIONS, SITE_CONTACTS } from "@/content/site";
import { navigateToSection } from "@/utils/scrollUtils";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto grid w-full max-w-screen-xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <Link href="/#home" className="text-2xl font-semibold dark:text-white" onClick={(event) => navigateToSection(event, "home")}>Подгорой</Link>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Гостевой дом в Переславле-Залесском</p>
        </div>
        <nav aria-label="Навигация в подвале">
          <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">Карта сайта</h2>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400">
            {HOME_SECTIONS.map((section) => (
              <li key={section.id}><a href={`/#${section.id}`} className="hover:underline" onClick={(event) => navigateToSection(event, section.id)}>{section.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">Контакты</h2>
          <address className="space-y-2 text-sm not-italic text-gray-500 dark:text-gray-400">
            <p>{SITE_CONTACTS.address}</p>
            <p><a className="hover:underline" href={`mailto:${SITE_CONTACTS.email}`}>{SITE_CONTACTS.email}</a></p>
            <p><a className="hover:underline" href={SITE_CONTACTS.phoneHref}>{SITE_CONTACTS.phoneDisplay}</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} Подгорой
      </div>
    </footer>
  );
}
