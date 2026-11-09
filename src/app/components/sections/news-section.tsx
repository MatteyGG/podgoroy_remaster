export default function NewsSection() {
  return (
    <section id="news" className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mb-8 max-w-2xl">
          <p className="section-eyebrow">Новости</p>
          <h2 className="section-title">Что происходит в Подгором</h2>
        </div>
        <div className="card-surface overflow-hidden p-2">
          <iframe
            title="Новости гостевого дома в Telegram"
            src="https://widgets.sociablekit.com/telegram-channel/iframe/25605669"
            className="block h-[720px] w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
