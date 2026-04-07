import Link from "next/link";

export default function Footer() {
  return (
    // <footer classNameName="bg-white mx-2 rounded-lg shadow md:fixed md:w-full bottom-0 ">
    //   <div classNameName="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
    //     <span classNameName="text-sm text-gray-500 sm:text-center dark:text-gray-400">
    //       © Подгорой 2024[В разработке]
    //     </span>
    //     <ul classNameName="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
    //       <li>
    //         <a href="/" classNameName="hover:underline me-4 md:me-6">
    //           Домой
    //         </a>
    //       </li>
    //       <li>
    //         <a href="/contacts" classNameName="hover:underline">
    //           Контакты
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </footer>
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Подгорой</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Карта сайта</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">Главная</Link>
                </li>
                <li className="mb-4">
                  <Link href="/booking" className="hover:underline">Бронирование</Link>
                </li>
                <li className="mb-4">
                  <Link href="/pereslavl" className="hover:underline">О Переславле</Link>
                </li>
                <li className="mb-4">
                  <Link href="/contacts" className="hover:underline">Контакты</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Наши соц. сети</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Телеграм</a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline ">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© Подгорой 2025[В разработке]</span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
