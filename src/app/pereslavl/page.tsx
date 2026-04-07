"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Slider from "../components/slider";

// Reusing your optimized animated components
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
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.3, scale: 0.97 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute inset-0 bg-black rounded-xl blur-lg z-0"
      />
    </div>
  );
};

export default function AboutPereslavl() {
  const [activeSection, setActiveSection] = useState('history');
  
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: [0.1, 0.3, 0.5] });

    sections.forEach(section => observer.observe(section));
    
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

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
          Переславль-Залесский - жемчужина Золотого кольца
        </h1>

        {/* Historical Significance Section */}
        <section 
          id="history" 
          className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center mb-24"
        >
          <FloatingSlider direction="left">
            <Slider>
              <Image
                className="object-contain h-auto max-w-full"
                src="/images/pereslavl/history1.jpg" alt="Переславский кремль и земляные валы" height={1000} width={1000} priority={true}
              />
              <Image
                className="slider_image"
                src="/images/pereslavl/history2.jpg" alt="Спасо-Преображенский собор" height={1000} width={1000} priority={true}
              />
              <Image
                className="slider_image"
                src="/images/pereslavl/history3.jpg" alt="Памятник Александру Невскому" height={1000} width={1000} priority={true}
              />
            </Slider>
          </FloatingSlider>
          
          <AnimatedSection direction="right" delay={0.4}>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Город с богатой историей</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Основанный в 1152 году князем Юрием Долгоруким, Переславль-Залесский изначально задумывался 
                как столица Северо-Восточной Руси . Город сохранил уникальные памятники 
                древнерусского зодчества и богатое историческое наследие.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Именно здесь родился и был крещен великий полководец Александр Невский , 
                а позднее молодой Петр I создал на Плещеевом озере свою "потешную флотилию", 
                положившую начало российскому военному флоту.
              </p>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Исторические объекты:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Земляные валы XII века
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Спасо-Преображенский собор
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Музей-усадьба "Ботик Петра I"
                  </span>``
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Красная площадь
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Religious Heritage Section */}
        <section 
          id="monasteries"
          className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center mb-24"
        >
          <AnimatedSection direction="left" delay={0.4}>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Духовные святыни</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Переславль-Залесский славится своими древними монастырями, каждый из которых имеет 
                уникальную историю и архитектуру. Четыре монастыря являются действующими и открыты 
                для посещения паломниками и туристами .
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Никитский монастырь, основанный в XI веке, является одним из самых древних , 
                а в Горицком монастыре сейчас располагается историко-архитектурный музей-заповедник 
                с богатой коллекцией икон и церковной утвари .
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span> Никитский монастырь (действующий)
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span> Свято-Троицкий Данилов монастырь
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span> Федоровский монастырь
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span> Свято-Никольский монастырь
                </li>
              </ul>
            </div>
          </AnimatedSection>
          
          <FloatingSlider direction="right">
            <Slider>
              <Image
                className="object-contain h-auto max-w-full"
                src="/images/pereslavl/monastery1.jpg" alt="Никитский монастырь" height={1000} width={1000} priority={true}
              />
              <Image
                className="slider_image"
                src="/images/pereslavl/monastery2.jpg" alt="Горицкий монастырь" height={1000} width={1000} priority={true}
              />
            </Slider>
          </FloatingSlider>
        </section>

        {/* Museums Section */}
        <section 
          id="museums"
          className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center mb-24"
        >
          <FloatingSlider direction="left">
            <Slider>
              <Image
                className="object-contain h-auto max-w-full"
                src="/images/pereslavl/museum1.jpg" alt="Музей утюга" height={1000} width={1000} priority={true}
              />
              <Image
                className="slider_image"
                src="/images/pereslavl/museum2.jpg" alt="Музей хитростей и смекалки" height={1000} width={1000} priority={true}
              />
              <Image
                className="slider_image"
                src="/images/pereslavl/museum3.jpg" alt="Музей Александра Невского" height={1000} width={1000} priority={true}
              />
            </Slider>
          </FloatingSlider>
          
          <AnimatedSection direction="right" delay={0.4}>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Уникальные музеи</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Переславль называют "столицей музеев" - здесь находится множество частных коллекций 
                и тематических музеев, которые не оставят равнодушными ни детей, ни взрослых 10].
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Откройте для себя Музей утюга с коллекцией из 200 экспонатов 10], 
                посетите Музей хитростей и смекалки с забавными бытовыми приспособлениями , 
                или погрузитесь в историю в Музее Александра Невского .
              </p>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Популярные музеи:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Музей Утюга
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Музей Чайника
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Музей Хитростей
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Музей Денег
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Nature and Activities Section */}
        <section 
          id="nature"
          className="grid gap-12 md:gap-16 grid-cols-1 md:grid-cols-2 items-center mb-24"
        >
          <AnimatedSection direction="left" delay={0.4}>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Природа и активный отдых</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Плещеево озеро - жемчужина Залесья, возрастом около 30 тысяч лет, предлагает 
                множество возможностей для отдыха на природе . Здесь можно заниматься 
                виндсерфингом, рыбалкой, кататься на лодках или просто наслаждаться живописными пейзажами.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Посетите дендрологический сад имени Харитонова с растениями со всего мира , 
                отправьтесь в конный поход 2], или зимой прокатитесь на собачьей упряжке 
                с хаски 2]9].
              </p>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Активности:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Виндсерфинг
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Рыбалка
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Прогулки на хаски
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Велосипедные туры
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Катание на байдарках
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <FloatingSlider direction="right">
            <Slider>
              <Image
                className="object-contain h-auto max-w-full"
                src="/images/pereslavl/nature1.jpg" alt="Плещеево озеро" height={1000} width={1000} priority={true}
              />
              <Image
                className="slider_image"
                src="/images/pereslavl/nature2.jpg" alt="Виндсерфинг на озере" height={1000} width={1000} priority={true}
              />
              <Image
                className="slider_image"
                src="/images/pereslavl/nature3.jpg" alt="Дендрологический сад" height={1000} width={1000} priority={true}
              />
            </Slider>
          </FloatingSlider>
        </section>

        {/* Practical Information Section */}
        <section 
          id="practical" 
          className="mb-24 py-12 px-6 bg-blue-50 rounded-2xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection direction="up">
              <h2 className="text-3xl font-bold mb-6">Планируйте ваше путешествие</h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Переславль-Залесский расположен в 140 км от Москвы и входит в маршрут Золотого кольца России. 
                Город ежегодно принимает около 400 тысяч туристов, что свидетельствует о его популярности.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2">Как добраться</h3>
                  <p className="text-sm text-gray-600">
                    На автомобиле: по трассе М8 "Холмогоры" (2,5 часа из Москвы) <br/>
                    На автобусе: от Центрального автовокзала Москвы <br/>
                    На поезде: до станции Берендеево, затем на автобусе 
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2">Лучшее время для посещения</h3>
                  <p className="text-sm text-gray-600">
                    Май-октябрь: комфортная погода для экскурсий<br/>
                    Июль-август: идеально для отдыха на озере<br/>
                    Зимой: катание на собачьих упряжках, зимние пейзажи
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm max-w-2xl mx-auto mb-8">
                <h3 className="font-semibold mb-4">Стоимость посещения основных музеев</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Музей-заповедник</h4>
                    <p>350 руб. - взрослый</p>
                    <p>150 руб. - школьный</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Музей Утюга</h4>
                    <p>200 руб. - взрослый</p>
                    <p>100 руб. - детский</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Музей Ботик Петра I</h4>
                    <p>100 руб. - входной билет</p>
                    <p>250 руб. - с экскурсией</p>
                  </div>
                </div>
              </div>

              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
                Скачать путеводитель по Переславлю
              </button>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  );
}