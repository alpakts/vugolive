import HomeIndex from "@/components/home";

export const metadata = {
  title: 'Vugo Live | Canlı Yayınlar',
  description: 'Vugo Live | Canlı Yayınlar',
  keywords: 'canlı yayın, Vugo Live, yayın izle, canlı performanslar, etkinlikler'
}
// canlı yayın listesinde  yine elmas canlı yayın üzerinde görünecek
// hits kısmı en son aşamada anlar olarak değişecek
// mesaj alanında input alanı aşağıda kalıyor
// mesaj kısmında görüntülü arama olacak
// elmas satın alım kısmında elmas bayı olarak arda bey telefonu olacak 
// elmas yükleme kısmında elmas işlemlerini görebilecekler
export default function Home() {
  return (
    <div>
      <HomeIndex></HomeIndex>
    </div>
  );
}