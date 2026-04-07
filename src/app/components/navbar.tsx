import Link from "next/link";
import ThemeSwitcher from "./themeSwitcher";

export default function Navbar() {
    return (<>
        <nav className=" bg-white   text-gray-950 px-2 py-2 sm:px-4 rounded dark:text-white dark:bg-gray-950">
            <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl pt-4">
                <Link href="/">
                    <span className="self-center text-2xl md:text-3xl font-semibold">
                        Подгорой
                    </span>
                </Link>
                <div className="flex items-center gap-2 md:gap-3">
                    <Link
                        href="tel:+79099755597"
                        className="text-sm hidden  text-gray-500  hover:underline md:block "
                    >
                        +7 (909) 997-55-97
                    </Link>
                    {/* {session?.user ? (
                        <>
                            <Link href="/profile">Профиль</Link>
                            <SignoutButton />
                        </>
                    ) : ( */}
                    <>
                        <div className="flex gap-1">
                            <div className="hidden md:block">
                                <Link
                                    href="/registration"
                                    className=" px-3 py-1 rounded-md"
                                >
                                    Регистрация
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="/login"
                                    className="bg-primary px-3 py-1 rounded-md"
                                >
                                    Войти
                                </Link>
                            </div>
                        </div>
                    </>
                    {/* )} */}
                </div>
            </div>
        </nav>
        <nav className="sticky top-0 z-50 bg-white border-gray-200 shadow-[0_5px_5px_-5px] shadow-slate-400 dark:shadow-slate-950   text-gray-950 px-2 py-2 sm:px-4 rounded dark:text-white dark:bg-gray-950">
                <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl pt-4">
                    <ul className="menu flex flex-row font-medium text-sm lg:text-xl gap-3 mt-0">
                        <li>
                            <Link href="/news">Новости</Link>
                        </li>
                        <li>
                            <Link href="/booking">Бронирование</Link>
                        </li>
                        <li>
                            <Link href="/pereslavl">О Переславлье</Link>
                        </li>
                        <li>
                            <Link href="/contacts">Контакты</Link>
                        </li>
                    </ul>
                    <ThemeSwitcher />
                </div>

        </nav>
    </>
    );
}

{/* Навигационная панель */ }
//   <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm py-3 px-4">
//     <nav className="flex justify-center gap-2 flex-wrap">
//       <NavLink href="#section-1">О нас</NavLink>
//       <NavLink href="#section-2">Комфорт</NavLink>
//       <NavLink href="#section-3">Активности</NavLink>
//       <NavLink href="#section-4">Контакты</NavLink>
//     </nav>
//   </header>