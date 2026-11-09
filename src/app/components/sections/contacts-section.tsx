import { SITE_CONTACTS } from "@/content/site";

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-8 max-w-2xl">
          <p className="section-eyebrow">Контакты</p>
          <h2 className="section-title">Как с нами связаться?</h2>
        </div>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <dl className="space-y-6">
            <div>
              <dt className="mb-1 text-sm text-[var(--muted)]">Почта</dt>
              <dd className="text-lg font-semibold"><a className="hover:underline" href={`mailto:${SITE_CONTACTS.email}`}>{SITE_CONTACTS.email}</a></dd>
            </div>
            <div>
              <dt className="mb-1 text-sm text-[var(--muted)]">Адрес</dt>
              <dd className="text-lg font-semibold">{SITE_CONTACTS.address}</dd>
            </div>
            <div>
              <dt className="mb-1 text-sm text-[var(--muted)]">Телефон</dt>
              <dd className="text-lg font-semibold"><a className="hover:underline" href={SITE_CONTACTS.phoneHref}>{SITE_CONTACTS.phoneDisplay}</a></dd>
            </div>
          </dl>
          <div className="card-surface overflow-hidden">
            <iframe
              title="Гостевой дом Подгорой на Яндекс Карте"
              className="block h-80 w-full border-0"
              src="https://yandex.ru/map-widget/v1/?ll=38.827073%2C56.721867&mode=poi&poi%5Bpoint%5D=38.825952%2C56.722589&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D229937584436&z=17.58"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
