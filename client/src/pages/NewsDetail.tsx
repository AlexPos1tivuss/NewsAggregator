import { useRoute } from "wouter";
import Header from "@/components/Header";
import CategoryBadge from "@/components/CategoryBadge";
import ShareButton from "@/components/ShareButton";
import CommentForm from "@/components/CommentForm";
import CommentItem from "@/components/CommentItem";
import { Eye, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import newsImage from '@assets/stock_images/minsk_city_events_an_e34dfbad.jpg';

//todo: remove mock functionality
const mockArticle = {
  id: "1",
  title: "Открытие нового культурного центра в центре Минска",
  category: "Мероприятия",
  imageUrl: newsImage,
  content: `
    <p>В центре столицы состоялось торжественное открытие современного культурного центра, который станет новой площадкой для выставок, концертов и других культурных мероприятий.</p>
    
    <p>Новый центр расположен в историческом здании, которое было полностью отреставрировано с сохранением архитектурного облика. Внутри создано современное пространство, оборудованное по последнему слову техники.</p>
    
    <p>«Это важное событие для культурной жизни нашего города», — отметил мэр на торжественной церемонии открытия. — «Центр станет местом встречи творческих людей и площадкой для реализации интересных проектов».</p>
    
    <p>В ближайшие месяцы здесь запланировано проведение серии выставок современного искусства, концертов классической музыки и литературных вечеров. Вход для посетителей будет свободным.</p>
    
    <p>Проект реализован при поддержке городского бюджета и частных инвесторов. На реставрацию и оборудование было потрачено более 5 миллионов долларов.</p>
  `,
  author: "Редакция",
  publishedAt: "15 мая 2025, 14:30",
  views: 1234,
  commentsCount: 45,
};

const mockComments = [
  {
    id: "1",
    username: "Алексей",
    level: 5,
    content: "Отличная новость! Давно ждал открытия этого центра. Надеюсь, программа будет действительно интересной.",
    timeAgo: "2 часа назад",
  },
  {
    id: "2",
    username: "Мария",
    level: 12,
    content: "Это действительно важное событие для культурной жизни города. Здание выглядит потрясающе после реставрации!",
    timeAgo: "1 час назад",
  },
  {
    id: "3",
    username: "Дмитрий",
    level: 8,
    content: "Хорошо, что вход будет свободным. Обязательно схожу на первую выставку.",
    timeAgo: "30 минут назад",
  },
];

export default function NewsDetail() {
  const [, params] = useRoute("/news/:id");
  
  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated username="Алексей" /> {/* todo: remove mock functionality */}
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <img
          src={mockArticle.imageUrl}
          alt={mockArticle.title}
          className="w-full h-96 object-cover rounded-xl mb-8"
        />
        
        <div className="mb-6">
          <CategoryBadge category={mockArticle.category} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {mockArticle.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{mockArticle.publishedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{mockArticle.views} просмотров</span>
          </div>
          <ShareButton newsId={mockArticle.id} title={mockArticle.title} />
        </div>

        <div 
          className="prose prose-lg max-w-none font-serif leading-relaxed"
          dangerouslySetInnerHTML={{ __html: mockArticle.content }}
        />

        <Separator className="my-12" />

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Комментарии ({mockComments.length})
          </h2>
          
          <div className="mb-8">
            <CommentForm newsId={params?.id || "1"} />
          </div>

          <div className="space-y-6">
            {mockComments.map((comment) => (
              <CommentItem key={comment.id} {...comment} />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
