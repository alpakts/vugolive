import HomeIndex from "@/components/home";

export const metadata = {
  title: 'Vugo Live | Canlı Yayınlar',
  description: 'Vugo Live | Canlı Yayınlar',
}
// canlı yayınları göstermeyi deneyeceğim
// önerilenlere kullanıcıya önerilen profiller koyuyacalak cinsiyete göre
export default function Home() {
  return (
    <div>
      <HomeIndex></HomeIndex>
    </div>
  );
}