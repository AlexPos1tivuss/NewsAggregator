import { useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";

// Import news images
import newsImage1 from '@assets/stock_images/minsk_city_events_an_e34dfbad.jpg';
import newsImage2 from '@assets/stock_images/minsk_city_events_an_2e7b150f.jpg';
import newsImage3 from '@assets/stock_images/minsk_city_events_an_5dc57f18.jpg';
import newsImage4 from '@assets/stock_images/business_meeting,_ec_4b4e177d.jpg';
import newsImage5 from '@assets/stock_images/business_meeting,_ec_479a01dc.jpg';
import newsImage6 from '@assets/stock_images/technology_innovatio_3ee545e3.jpg';
import newsImage7 from '@assets/stock_images/technology_innovatio_b581f144.jpg';
import newsImage8 from '@assets/stock_images/sports_competition,__754fb686.jpg';
import newsImage9 from '@assets/stock_images/sports_competition,__7dfda3fe.jpg';

//todo: remove mock functionality
const mockNews = [
  {
    id: "1",
    title: "Открытие нового культурного центра в центре Минска",
    excerpt: "В центре столицы состоялось торжественное открытие современного культурного центра, который станет площадкой для выставок, концертов и других мероприятий.",
    category: "Мероприятия",
    imageUrl: newsImage1,
    views: 1234,
    commentsCount: 45,
    publishedAt: "2 часа назад",
  },
  {
    id: "2",
    title: "Городской фестиваль искусств собрал тысячи зрителей",
    excerpt: "Ежегодный фестиваль современного искусства прошел с большим успехом. Более 50 художников представили свои работы.",
    category: "События",
    imageUrl: newsImage2,
    views: 892,
    commentsCount: 23,
    publishedAt: "5 часов назад",
  },
  {
    id: "3",
    title: "Праздничное освещение улиц: новый формат",
    excerpt: "Городские власти представили новую концепцию праздничного оформления центральных улиц с использованием LED-технологий.",
    category: "События",
    imageUrl: newsImage3,
    views: 2341,
    commentsCount: 67,
    publishedAt: "1 день назад",
  },
  {
    id: "4",
    title: "Рост экономики: новые показатели за квартал",
    excerpt: "Минская экономика показывает устойчивый рост. Эксперты отмечают увеличение деловой активности в ключевых секторах.",
    category: "Экономика",
    imageUrl: newsImage4,
    views: 1567,
    commentsCount: 34,
    publishedAt: "3 часа назад",
  },
  {
    id: "5",
    title: "Бизнес-форум: новые возможности для предпринимателей",
    excerpt: "На площадке бизнес-центра состоялся форум, посвященный развитию малого и среднего бизнеса в столице.",
    category: "Экономика",
    imageUrl: newsImage5,
    views: 987,
    commentsCount: 19,
    publishedAt: "6 часов назад",
  },
  {
    id: "6",
    title: "IT-парк расширяется: новые резиденты и проекты",
    excerpt: "Минский IT-парк объявил о привлечении 15 новых компаний в сфере разработки программного обеспечения и искусственного интеллекта.",
    category: "Технологии",
    imageUrl: newsImage6,
    views: 3421,
    commentsCount: 89,
    publishedAt: "4 часа назад",
  },
  {
    id: "7",
    title: "Цифровизация городских сервисов: что изменится",
    excerpt: "Новая платформа электронных услуг позволит жителям получать большинство справок онлайн без посещения офисов.",
    category: "Технологии",
    imageUrl: newsImage7,
    views: 2156,
    commentsCount: 52,
    publishedAt: "1 день назад",
  },
  {
    id: "8",
    title: "Чемпионат города по футболу: итоги первого тура",
    excerpt: "Стартовал новый сезон городского футбольного чемпионата. Первый тур принес несколько неожиданных результатов.",
    category: "Спорт",
    imageUrl: newsImage8,
    views: 1789,
    commentsCount: 41,
    publishedAt: "7 часов назад",
  },
  {
    id: "9",
    title: "Открытие спортивного комплекса нового поколения",
    excerpt: "Современный спортивный комплекс с бассейном, фитнес-залами и крытым катком открылся в жилом районе.",
    category: "Спорт",
    imageUrl: newsImage9,
    views: 2934,
    commentsCount: 73,
    publishedAt: "2 дня назад",
  },
];

export default function Home() {
  const [isLoading] = useState(false); //todo: remove mock functionality
  
  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated username="Алексей" /> {/* todo: remove mock functionality */}
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Новости Минска
          </h1>
          <p className="text-lg text-muted-foreground">
            Актуальные события, мероприятия и важные новости столицы
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full aspect-[16/9]" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
