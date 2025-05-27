import Image from "next/image";
import Slider from "./components/slider";

export default function Home() {
  return (
    <div className="flex mt-5 mx-4 xl:mx-20 justify-center" >
      <div className='grid gap-1 gap-x-20 md:grid-cols-2 sm:grid-cols-1'>
        <Slider>
          <Image className="object-contain h-auto max-w-full"
            src="/images/slider/1.jpg" alt="1" height={1000} width={1000} />
          <Image className="slider_image" src="/images/slider/2.jpg" alt="2" height={1000} width={1000} />
          <Image className="slider_image" src="/images/slider/3.jpg" alt="3" height={1000} width={1000} />
        </Slider>
        <div>
          <p className='mb-3 first_latter'>Подгорой - ваш уютный дом вдали от дома, расположенный в самом сердце &#34;столицы музеев&#34;. Взгляните на мирную красоту монастыря, расположенного всего в нескольких шагах от нашего гостевого дома, и насладитесь вольным ветром в виндсерфинг-клубе, расположенном всего в 5 минутах езды на машине. Наше гостеприимное место окружено природным великолепием озера &#34;Плещеево&#34; и культурным наследием монастыря, что делает его идеальным местом для тех, кто ищет спокойствия и релаксации во время отдыха. <br/> Ждем вас!</p>
        </div>
      </div>
    </div>
  );
}