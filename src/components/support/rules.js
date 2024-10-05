// components/RulesComponent.js
export default function RulesComponent() {
    return (
      <div className="p-6 ">
        <h1 className="text-3xl font-bold mb-6">Davranış Kuralları</h1>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Yasayı İhlal Etmek</h2>
          <p className="mt-2 text-secondary">
            Hizmetlerimizi kullanırken yürürlükteki tüm yerel, ulusal ve uluslararası yasalara saygı göstermelisiniz. 
            Yasadışı faaliyetler içeren, teşvik eden veya talep eden her türlü içerik veya faaliyet yasaktır.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Hesap Askıya Alma</h2>
          <p className="mt-2 text-secondary">
            Tüm askıya almalar süresi dolana veya itiraz üzerine kaldırılana kadar bağlayıcıdır. 
            Başka hesaplar kullanarak site genelinde platformda veya sohbette askıya alma işlemini atlatma girişimleri de 
            askıya alma ile sonuçlanacaktır. Uzaklaştırmadan kaçınma sadece uzaklaştırma süresini artırmakla kalmaz aynı zamanda 
            süresiz uzaklaştırmaya da yol açabilir.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Kendine Zarar Veren Davranışlar</h2>
          <p className="mt-2 text-secondary">
            Hayatınızı tehlikeye atabilecek veya fiziksel zarar görmenize yol açabilecek her türlü faaliyet yasaktır. 
            Buna intihar tehditleri, kasıtlı fiziksel travma, yasadışı uyuşturucu kullanımı ve aşırı alkol kullanımı dahildir, 
            ancak bunlarla sınırlı değildir.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Başka Kişilere Yönelik Hedefli Taciz, Tehdit ve Şiddet</h2>
          <p className="mt-2 text-secondary">
            Vugo Ekibi, Vugo Live veya herhangi bir Vugo resmi hesabı dahi olmak üzere diğer kişileri veya kullanıcıları 
            taciz etmek, karalamak, korkutmak, kötü niyetle baskın yapmak veya takip etmek kesinlikle yasaktır. 
            Aşağıdakiler sıfır toleranslı taciz ihlalleri olarak kabul edilir ve bu tür etkinliklerle ilişkili tüm hesaplar 
            derhal süresiz olarak askıya alınacaktır:
          </p>
          <ul className="list-disc pl-6 mt-2 text-secondary">
            <li>Başka bir kişiye zarar vermeye veya öldürmeye teşebbüs etmek veya tehdit etmek.</li>
            <li>Silah, bıçak veya patlayıcı gibi ölümcül veya zararlı silahlar satmak.</li>
          </ul>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Özel Bilgilerin İzinsiz Paylaşımı</h2>
          <p className="mt-2 text-secondary">
            Başkalarının mahremiyetini ihlal etmeyin. Kişiler veya özel konutlar hakkında özel kişisel bilgileri ortaya çıkarabilecek içeriklerin 
            izinsiz olarak paylaşılması yasaktır.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Nefret Söylemi ve Diğer Tacizler</h2>
          <p className="mt-2 text-secondary">
            Irk, etnik köken, cinsiyet kimliği, cinsel yönelim, yaş, engellilik, din veya milliyete dayalı ayrımcılık, 
            taciz veya şiddeti kolaylaştıran, teşvik eden veya destekleyen her türlü içerik veya faaliyet yasaktır.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Taklitçilik</h2>
          <p className="mt-2 text-secondary">
            Bir kişi veya kuruluşu taklit etmeye yönelik içerik veya faaliyet yasaktır. Kendinizi Vugo Ekibi, 
            Vugo Live veya Yöneticilerin bir üyesi olarak yanlış tanıtma girişimleri sıfır tolerans ihlalidir ve derhal süresiz 
            uzaklaştırma ile sonuçlanacaktır.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Spam, Dolandırıcılık ve Diğer Kötü Amaçlı Davranışlar</h2>
          <p className="mt-2 text-secondary">
            Vugo hizmetlerinin bütünlüğünü veya başka bir kullanıcının deneyimini ya da cihazlarını bozan, kesintiye uğratan, zarar veren 
            veya başka bir şekilde ihlal eden her türlü içerik veya faaliyet yasaktır.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Pornografi ve Diğer Cinsel İçerikli Davranışlar</h2>
          <p className="mt-2 text-secondary">
            Pornografi, cinsel ilişki veya yetişkin hizmetleri içeren her türlü içerik veya faaliyet yasaktır. Küçüklerin 
            istismarını içeren davranışlar yetkililere bildirilecektir.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Aşırı Şiddet, Gore ve Diğer Müstehcen Davranışlar</h2>
          <p className="mt-2 text-secondary">
            Yalnızca aşırı veya gereksiz kan ve şiddete odaklanan içerikler yasaktır.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">İzinsiz İçerik Paylaşımı ve Diğer Telif Hakkı İhlalleri</h2>
          <p className="mt-2 text-secondary">
            Haklarına sahip olmadığınız veya başka bir şekilde kullanma yetkiniz olmayan herhangi bir içeriği yüklemek, 
            Hizmet Şartlarımızı ihlal eder ve hesabınızı üçüncü taraf hak sahipleri tarafından DMCA kaldırmalarına karşı sorumlu hale getirebilir.
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Geri Bildirim</h2>
          <p className="mt-2 text-secondary">
            E-posta: <a href="mailto:vugolive@gmail.com" className="text-blue-500">vugolive@gmail.com</a>
          </p>
        </div>
      </div>
    );
  }
  