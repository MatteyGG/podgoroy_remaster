import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex h-full my-48 mx-4 xl:mx-20 justify-center'>
            <div className='mx-auto'>
                <h2 className='text-4xl'>Страница не найдена</h2>
                <Link className='text-3xl text-blue-700' href="/">На главную &rarr;</Link>
            </div>
        </div>
    )
}