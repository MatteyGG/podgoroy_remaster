export type SectionId = "home" | "news" | "booking" | "pereslavl" | "contacts";

export const HOME_SECTIONS: ReadonlyArray<{ id: SectionId; label: string }> = [
  { id: "home", label: "Главная" },
  { id: "news", label: "Новости" },
  { id: "booking", label: "Бронирование" },
  { id: "pereslavl", label: "О Переславле" },
  { id: "contacts", label: "Контакты" },
];

export const SITE_CONTACTS = {
  address: "Подгорая ул., 32, Переславль-Залесский, Ярославская обл., 152024",
  email: "podgoroy.pz@gmail.com",
  phoneDisplay: "+7 909 997 55 97",
  phoneHref: "tel:+79099975597",
} as const;
