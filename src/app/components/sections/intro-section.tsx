"use client";

import Image from "next/image";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Slider from "@/app/components/slider";
import AnimatedSliderFrame from "@/app/components/animated-slider-frame";
import { SITE_CONTACTS } from "@/content/site";
import { navigateToSection } from "@/utils/scrollUtils";

const AnimatedSection = ({ children, direction = "left", delay = 0.1 }: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up";
  delay?: number;
}) => {
  const reducedMotion = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : direction === "left" ? -32 : direction === "right" ? 32 : 0, y: reducedMotion ? 0 : direction === "up" ? 32 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: reducedMotion ? 0 : 0.6, delay, ease: "easeOut" } },
  };

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px" }} variants={variants}>
      {children}
    </motion.div>
  );
};

function SliderImages({ paths, alt, priority = false }: { paths: string[]; alt: string; priority?: boolean }) {
  return (
    <Slider>
      {paths.map((path) => (
        <Image key={path} className="slider_image" src={path} alt={alt} height={900} width={1200} priority={priority} />
      ))}
    </Slider>
  );
}

export default function IntroSection() {
  return (
    <div id="home" className="pb-8">
      <div className="section-shell">
        <h1 className="mx-auto max-w-3xl py-10 text-center text-3xl font-bold tracking-tight md:py-14 md:text-5xl">
          Добро пожаловать в Подгорой
        </h1>

        <section id="section-1" className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
          <AnimatedSliderFrame direction="left" arched>
            <Image
              className="hero_image"
              src="/images/slider/1.jpg"
              alt="Общий вид берега Плещеева озера рядом с гостевым домом"
              height={680}
              width={914}
              priority
            />
          </AnimatedSliderFrame>
          <AnimatedSection direction="right">
            <div>
              <h2 className="section-title mb-5">Ваш уютный дом вдали от дома</h2>
              <p className="body-text mb-4">Подгорой расположен в самом сердце &quot;столицы музеев&quot;. Насладитесь видом на монастырь и вольным ветром в виндсерфинг-клубе в 5 минутах езды.</p>
              <p className="body-text">Наше гостеприимное место окружено природным великолепием озера Плещеево и культурным наследием монастыря - идеальное сочетание для спокойного отдыха.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="button-primary" href="#booking" onClick={(event) => navigateToSection(event, "booking")}>Забронировать</a>
                <a className="button-secondary" href="#section-2">Подробнее</a>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section id="section-2" className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
          <AnimatedSection direction="left">
            <div>
              <h2 className="section-title mb-5">Комфорт и традиции</h2>
              <p className="body-text mb-4">В нашем доме сочетаются русское гостеприимство и современный комфорт. Просторные светлые комнаты с деревянной мебелью ручной работы, авторский текстиль и каминная зона создают атмосферу тепла и уюта.</p>
              <p className="body-text">Каждое утро начинается с ароматной выпечки и травяных чаёв из местных трав, а вечером вы сможете наблюдать за звёздным небом с террасы.</p>
              <ul className="mt-5 space-y-2 font-medium text-[var(--text)]">
                <li><span className="mr-2 text-[var(--accent)]">✓</span> Бесплатный Wi-Fi</li>
                <li><span className="mr-2 text-[var(--accent)]">✓</span> Парковка</li>
                <li><span className="mr-2 text-[var(--accent)]">✓</span> Завтрак включён</li>
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSliderFrame direction="right">
            <SliderImages paths={["/images/slider/4.jpg", "/images/slider/5.jpg"]} alt="Деревянная кухня и жилое пространство дома" />
          </AnimatedSliderFrame>
        </section>

        <section id="section-3" className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
          <AnimatedSliderFrame direction="left">
            <SliderImages paths={["/images/slider/1.jpg", "/images/slider/2.jpg"]} alt="Озеро и места для отдыха рядом с домом" />
          </AnimatedSliderFrame>
          <AnimatedSection direction="right">
            <div>
              <h2 className="section-title mb-5">Активный отдых</h2>
              <p className="body-text mb-4">Для любителей приключений мы организуем экскурсии к таинственному Синему камню, поездки на страусиную ферму и мастер-классы по старинным ремёслам.</p>
              <p className="body-text">После насыщенного дня вас ждёт банный комплекс с дубовыми вениками и чаепитие с переславскими пирогами. В тишине вековых деревьев вы обретёте чувство единения с природой.</p>
              <div className="mt-6">
                <h3 className="mb-3 font-semibold">Активности рядом:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="tag">Виндсёрфинг</span><span className="tag">Рыбалка</span><span className="tag">Велосипеды</span><span className="tag">Музеи</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section id="section-4" className="card-surface my-10 px-6 py-10 md:my-16 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection direction="up">
              <h2 className="section-title mb-5">Свяжитесь с нами</h2>
              <p className="body-text mb-8">Есть вопросы или хотите забронировать проживание? Мы с радостью поможем!</p>
              <div className="mb-8 grid gap-4 text-left md:grid-cols-3">
                <div className="card-surface p-5">
                  <h3 className="mb-2 font-semibold">Телефон</h3>
                  <a href={SITE_CONTACTS.phoneHref} className="text-[var(--accent)] hover:underline">{SITE_CONTACTS.phoneDisplay}</a>
                </div>
                <div className="card-surface p-5">
                  <h3 className="mb-2 font-semibold">Email</h3>
                  <a href={`mailto:${SITE_CONTACTS.email}`} className="break-all text-[var(--accent)] hover:underline">{SITE_CONTACTS.email}</a>
                </div>
                <div className="card-surface p-5">
                  <h3 className="mb-2 font-semibold">Адрес</h3>
                  <p className="text-[var(--muted)]">{SITE_CONTACTS.address}</p>
                </div>
              </div>
              <a className="button-primary" href={`mailto:${SITE_CONTACTS.email}`}>Написать сообщение</a>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
}
