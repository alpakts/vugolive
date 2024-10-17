import HomeIndex from "@/components/home";

export const metadata = {
  title: 'Vugo Live | Canlı Yayınlar',
  description: 'Vugo Live | Canlı Yayınlar',
}
// önerilenlere kullanıcıya önerilen profiller koyuyacalak cinsiyete göre
// profil listesinde  görüntülü aramadaki elmas miktarı profilde görünecek 
// canlı yayın listesinde  yine elmas canlı yayın üzerinde görünecek
// kategoriler kısımı yapılacak
// mesaj gönderirken mesaj başı ücret uygulama ayarlarından alınacak
// hediye gönderme 
// bildirimler (opsiyonel);
// mesajlaşma kısmı yapılacak
// görüntütlü arama kısmı yapılacak dakikalık görüntülü ücret alacak kullanıcıdanda o miktar kadar azalacak
// hits kısmı en son aşamada anlar olarak değişecek
// yayıncı olduğumda kendi profiim görünmesin
export default function Home() {
  return (
    <div>
      <HomeIndex></HomeIndex>
    </div>
  );
}