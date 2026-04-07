"use client"

import Image from "next/image";
import Slider from "./components/slider";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

// Оптимизированные анимированные компоненты
const AnimatedSection = ({
  children,
  direction = "left",
  delay = 0.2
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up";
  delay?: number;
}) => {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
      y: direction === "up" ? 40 : 0
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const FloatingSlider = ({
  children,
  direction = "left"
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    // Проверка предпочтений пользователя по анимациям
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const variants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      x: reducedMotion ? 0 : direction === "right" ? "40%" : "-40%",
      scale: reducedMotion ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      z: reducedMotion ? 0 : 20,
      rotate: reducedMotion ? 0 : direction === "right" ? 0.5 : -0.5,
      transition: { 
        duration: 0.8,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        whileHover={reducedMotion ? "" : "hover"}
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={variants}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10 shadow-xl rounded-xl overflow-hidden"
      >
        {children}
      </motion.div>
      
      {/* Адаптивная тень */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.3, scale: 0.97 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute inset-0 bg-black rounded-xl blur-lg z-0"
      />
    </div>
  );
};

// Компонент для якорных ссылок
// const NavLink = ({ href, children }: { href: string; children: string }) => (
//   <a 
//     href={href}
//     className="px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
//     onClick={(e) => {
//       e.preventDefault();
//       document.getElementById(href.substring(1))?.scrollIntoView({
//         behavior: 'smooth'
//       });
//     }}
//   >
//     {children}
//   </a>
// );

export default function Home() {
  // Обработка хеша при загрузке
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl md:text-5xl text-center font-bold mb-16 mt-6">
          Добро пожаловать в Подгорой
        </h1>

        {/* Секция 1 */}
        <section 
          id="section-1" 
          className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center mb-24"
        >
          <FloatingSlider direction="left">
            <Slider>
            <Image
              className="object-contain h-auto max-w-full"
              src="/images/slider/1.jpg" alt="1" height={1000} width={1000} priority={true}
            />
            <Image
              className="slider_image"
              src="/images/slider/2.jpg" alt="2" height={1000} width={1000} priority={true}
            />
            <Image
              className="slider_image"
              src="/images/slider/3.jpg" alt="3" height={1000} width={1000} priority={true}
            />
          </Slider>
          </FloatingSlider>
          
          <AnimatedSection direction="right" delay={0.4}>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Ваш уютный дом вдали от дома</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Подгорой расположен в самом сердце &quot;столицы музеев&quot;. Насладитесь видом на 
                монастырь и вольным ветром в виндсерфинг-клубе в 5 минутах езды.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Наше гостеприимное место окружено природным великолепием озера Плещеево 
                и культурным наследием монастыря - идеальное сочетание для спокойного отдыха.
              </p>
              <div className="mt-6 flex gap-3">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Забронировать
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Подробнее
                </button>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Секция 2 */}
        <section 
          id="section-2"
          className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center mb-24"
        >
          <AnimatedSection direction="left" delay={0.4}>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Комфорт и традиции</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                В нашем доме сочетаются русское гостеприимство и современный комфорт. 
                Просторные светлые комнаты с деревянной мебелью ручной работы, авторский 
                текстиль и каминная зона создают атмосферу тепла и уюта.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Каждое утро начинается с ароматной выпечки и травяных чаёв из местных трав, 
                а вечером вы сможете наблюдать за звёздным небом с террасы.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span> Бесплатный Wi-Fi
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span> Парковка
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span> Завтрак включён
                </li>
              </ul>
            </div>
          </AnimatedSection>
          
          <FloatingSlider direction="right">
            <Slider>
            <Image
              className="object-contain h-auto max-w-full"
              src="/images/slider/1.jpg" alt="1" height={1000} width={1000} priority={true}
            />
            <Image
              className="slider_image"
              src="/images/slider/2.jpg" alt="2" height={1000} width={1000} priority={true}
            />
            <Image
              className="slider_image"
              src="/images/slider/3.jpg" alt="3" height={1000} width={1000} priority={true}
            />
          </Slider>
          </FloatingSlider>
        </section>

        {/* Секция 3 */}
        <section 
          id="section-3"
          className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center mb-24"
        >
          <FloatingSlider direction="left">
            <Slider>
            <Image
              className="object-contain h-auto max-w-full"
              src="/images/slider/1.jpg" alt="1" height={1000} width={1000} priority={true}
            />
            <Image
              className="slider_image"
              src="/images/slider/2.jpg" alt="2" height={1000} width={1000} priority={true}
            />
            <Image
              className="slider_image"
              src="/images/slider/3.jpg" alt="3" height={1000} width={1000} priority={true}
            />
          </Slider>
          </FloatingSlider>
          
          <AnimatedSection direction="right" delay={0.4}>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Активный отдых</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Для любителей приключений мы организуем экскурсии к таинственному Синему камню, 
                поездки на страусиную ферму и мастер-классы по старинным ремёслам.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                После насыщенного дня вас ждёт банный комплекс с дубовыми вениками и 
                чаепитие с переславскими пирогами. В тишине вековых деревьев вы обретёте 
                чувство единения с природой.
              </p>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Активности рядом:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Виндсёрфинг
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Рыбалка
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Велосипеды
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Музеи
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Секция 4 - Контакты */}
        <section 
          id="section-4" 
          className="mb-24 py-12 px-6 bg-blue-50 rounded-2xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection direction="up">
              <h2 className="text-3xl font-bold mb-6">Свяжитесь с нами</h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Есть вопросы или хотите забронировать проживание? Мы с радостью поможем!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href="tel:+79099975597" className="text-blue-600 hover:underline">
                    +7 (909) 997-55-97 
                  </a>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:info@podgoroy.ru" className="text-blue-600 hover:underline">
                    info@podgoroy.ru
                  </a>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2">Адрес</h3>
                  <p>г. Переславль-Залесский, ул. Подгорная, д. 15</p>
                </div>
              </div>
              <div className="container pb-10 min-h-40 sm:relative sm:m-0">
                    <iframe className="responsive-iframe w-full h-full" src="https://yandex.ru/map-widget/v1/?ll=38.827073%2C56.721867&mode=poi&poi%5Bpoint%5D=38.825952%2C56.722589&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D229937584436&z=17.58" frameBorder="1" allowFullScreen={true}></iframe>
                </div>
              
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
                Написать сообщение
              </button>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  );
}
