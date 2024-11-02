import HomeIndex from "@/components/home";

export const metadata = {
  title: 'Vugo Live | Canlı Yayınlar',
  description: 'Vugo Live | Canlı Yayınlar',
  keywords: 'canlı yayın, Vugo Live, yayın izle, canlı performanslar, etkinlikler'
}
// canlı yayın listesinde  yine elmas canlı yayın üzerinde görünecek
// hits kısmı en son aşamada anlar olarak değişecek
// mesaj kısmında görüntülü arama olacak
export default function Home() {
  return (
    <div>
      <HomeIndex></HomeIndex>
    </div>
  );
}