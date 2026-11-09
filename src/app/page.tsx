import IntroSection from "@/app/components/sections/intro-section";
import NewsSection from "@/app/components/sections/news-section";
import BookingSection from "@/app/components/sections/booking-section";
import PereslavlSection from "@/app/components/sections/pereslavl-section";
import ContactsSection from "@/app/components/sections/contacts-section";
import { getPereslavlContent } from "@/lib/pereslavl-content";

export default async function Home() {
  const result = await getPereslavlContent();

  return (
    <>
      <IntroSection />
      <NewsSection />
      <BookingSection />
      <PereslavlSection content={result.data} source={result.source} />
      <ContactsSection />
    </>
  );
}
