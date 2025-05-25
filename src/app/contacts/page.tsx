export default function Constacts() {
    return (
        <div className="justify-center mx-8 space-y-5">
            <h1 className="text-lg  m-auto justify-left mt-10">Как с нами связаться?</h1>
            <div className="grid gap-5 lg:md:grid-cols-2 sm:grid-cols-1">
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Почта</dt>
                        <dd className="text-lg font-semibold">podgoroy.pz@gmail.com</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Адрес</dt>
                        <dd className="text-lg font-semibold">Подгорная ул., 32, Переславль-Залесский, Ярославская обл., 152024</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Основной номер</dt>
                        <dd className="text-lg font-semibold">+7 909 997 55 97</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Дополнительный номер</dt>
                        <dd className="text-lg font-semibold">+7 999 973 55 70</dd>
                    </div>
                </dl>
                <div className="container pb-10 min-h-40 sm:relative sm:m-0">
                    <iframe className="responsive-iframe" src="https://yandex.ru/map-widget/v1/?ll=38.827073%2C56.721867&mode=poi&poi%5Bpoint%5D=38.825952%2C56.722589&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D229937584436&z=17.58" frameBorder="1" allowFullScreen={true}></iframe>
                </div>
            </div>
        </div>
    );
}