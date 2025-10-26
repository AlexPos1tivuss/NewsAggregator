import CategoryBadge from '../CategoryBadge';

export default function CategoryBadgeExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <CategoryBadge category="Мероприятия" />
      <CategoryBadge category="События" variant="secondary" />
      <CategoryBadge category="Экономика" />
      <CategoryBadge category="Спорт" variant="secondary" />
    </div>
  );
}
