import NewsCard from '../NewsCard';
import newsImage from '@assets/stock_images/minsk_city_events_an_e34dfbad.jpg';

export default function NewsCardExample() {
  return (
    <div className="max-w-md">
      <NewsCard
        id="1"
        title="Открытие нового культурного центра в Минске"
        excerpt="В центре столицы состоялось торжественное открытие современного культурного центра, который станет площадкой для выставок и концертов."
        category="События"
        imageUrl={newsImage}
        views={1234}
        commentsCount={45}
        publishedAt="2 часа назад"
      />
    </div>
  );
}
