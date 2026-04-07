// Функция для плавной прокрутки к элементу
export const scrollToElement = (element: HTMLElement, offset: number = 0) => {
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

// Функция для поиска элемента по data-атрибуту
export const scrollToDataNav = (navId: string, offset: number = 0) => {
  // Проверяем, что код выполняется в браузере
  if (typeof document === 'undefined') return;
  
  // Находим элемент по атрибуту
  const selector = `[data-scroll-nav="${navId}"]`;
  const target = document.querySelector(selector) as HTMLElement | null;
  
  if (target) {
    scrollToElement(target, offset);
  } else {
    console.warn(`Element with ${selector} not found`);
  }
};

// Тип для обработчика прокрутки
export type ScrollHandler = (navId: string) => void;