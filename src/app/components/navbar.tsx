import Link from "next/link";

export default function Navbar() {
    return (<>
        <nav>
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
                                        className="text-primary_dark px-3 py-1 rounded-md"
                                    >
                                        Регистрация
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        href="/login"
                                        className="bg-primary text-white px-3 py-1 rounded-md"
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
        <nav>
            <div className="max-w-screen-xl py-3">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium text-sm lg:text-xl gap-3 mt-0">
                        <li>
                            <Link href="/news">Новости</Link>
                        </li>
                        <li>
                            <Link href="/booking">Бронирование</Link>
                        </li>
                        <li>
                            <Link href="/contacts">Контакты</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
    );
}