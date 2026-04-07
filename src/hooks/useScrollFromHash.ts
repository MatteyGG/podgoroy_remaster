import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { scrollToDataNav } from '../utils/scrollUtils';

const useScrollFromHash = (offset: number = 0) => {
  const router = useRouter();

  useEffect(() => {
    // Проверяем наличие хеша в URL
    const hash = window.location.hash.replace('#', '');
    
    if (hash) {
      // Добавляем небольшую задержку для корректной работы
      const timer = setTimeout(() => {
        scrollToDataNav(hash, offset);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [offset, router.asPath]);
};

export default useScrollFromHash;