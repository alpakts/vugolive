import HomeIndex from "@/components/home";

export const metadata = {
  title: 'Vugo Live | Canlı Yayınlar',
  description: 'Vugo Live | Canlı Yayınlar',
}
// önerilenlere kullanıcıya önerilen profiller koyuyacalak cinsiyete göre
// canlı yayın listesinde  yine elmas canlı yayın üzerinde görünecek
// görüntütlü arama kısmı yapılacak dakikalık görüntülü ücret alacak kullanıcıdanda o miktar kadar azalacak
// hits kısmı en son aşamada anlar olarak değişecek
export default function Home() {
  return (
    <div>
      <HomeIndex></HomeIndex>
    </div>
  );
}