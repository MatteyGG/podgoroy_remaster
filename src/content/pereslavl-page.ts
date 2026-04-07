export type PereslavlSection = {
  id: string;
  title: string;
  body: string[];
  tags: string[];
  images: string[];
};

export type PereslavlPracticalInfo = {
  title: string;
  description: string;
  transport: string[];
  seasonality: string[];
};

export type PereslavlPageContent = {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  sections: PereslavlSection[];
  practical_info: PereslavlPracticalInfo;
};

export const pereslavlFallbackContent: PereslavlPageContent = {
  slug: "pereslavl",
  title: "Переславль-Залесский - жемчужина Золотого кольца",
  meta_title: "Переславль-Залесский: гид для гостей Подгорой",
  meta_description:
    "История, монастыри, музеи, природа и практическая информация для поездки в Переславль-Залесский.",
  sections: [
    {
      id: "history",
      title: "Город с богатой историей",
      body: [
        "Основанный в 1152 году князем Юрием Долгоруким, Переславль-Залесский изначально задумывался как столица Северо-Восточной Руси.",
        'Именно здесь родился и был крещен Александр Невский, а молодой Петр I создал на Плещеевом озере "потешную флотилию".',
      ],
      tags: [
        "Земляные валы XII века",
        "Спасо-Преображенский собор",
        'Музей-усадьба "Ботик Петра I"',
        "Красная площадь",
      ],
      images: [
        "/images/pereslavl/history1.jpg",
        "/images/pereslavl/history2.jpg",
        "/images/pereslavl/history3.jpg",
      ],
    },
    {
      id: "monasteries",
      title: "Духовные святыни",
      body: [
        "Переславль-Залесский славится древними монастырями с уникальной историей и архитектурой.",
        "Четыре монастыря являются действующими и открыты для посещения паломниками и туристами.",
      ],
      tags: [
        "Никитский монастырь",
        "Свято-Троицкий Данилов монастырь",
        "Федоровский монастырь",
        "Свято-Никольский монастырь",
      ],
      images: [
        "/images/pereslavl/monastery1.jpg",
        "/images/pereslavl/monastery2.jpg",
      ],
    },
    {
      id: "museums",
      title: "Уникальные музеи",
      body: [
        'Переславль называют "столицей музеев": здесь множество частных коллекций и тематических экспозиций.',
        "Особенно популярны Музей утюга, Музей чайника и Музей хитростей.",
      ],
      tags: ["Музей Утюга", "Музей Чайника", "Музей Хитростей", "Музей Денег"],
      images: [
        "/images/pereslavl/museum1.jpg",
        "/images/pereslavl/museum2.jpg",
        "/images/pereslavl/museum3.jpg",
      ],
    },
    {
      id: "nature",
      title: "Природа и активный отдых",
      body: [
        "Плещеево озеро - жемчужина Залесья возрастом около 30 тысяч лет.",
        "Здесь можно заниматься виндсерфингом, рыбалкой и прогулками по природным маршрутам.",
      ],
      tags: [
        "Виндсерфинг",
        "Рыбалка",
        "Прогулки на хаски",
        "Велосипедные туры",
        "Катание на байдарках",
      ],
      images: [
        "/images/pereslavl/nature1.jpg",
        "/images/pereslavl/nature2.png",
        "/images/pereslavl/nature3.jpg",
      ],
    },
  ],
  practical_info: {
    title: "Планируйте ваше путешествие",
    description:
      "Переславль-Залесский расположен в 140 км от Москвы и входит в маршрут Золотого кольца.",
    transport: [
      'Автомобиль: трасса М8 "Холмогоры" (около 2.5 часов из Москвы)',
      "Автобус: от Центрального автовокзала Москвы",
      "Поезд: до станции Берендеево, далее автобус",
    ],
    seasonality: [
      "Май-октябрь: комфортная погода для экскурсий",
      "Июль-август: сезон отдыха на озере",
      "Зима: зимние пейзажи и прогулки с хаски",
    ],
  },
};
