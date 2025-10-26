import CommentItem from '../CommentItem';

export default function CommentItemExample() {
  return (
    <div className="max-w-2xl space-y-4">
      <CommentItem
        username="Алексей"
        level={5}
        content="Отличная новость! Давно ждал открытия этого центра."
        timeAgo="2 часа назад"
      />
      <CommentItem
        username="Мария"
        level={12}
        content="Это действительно важное событие для культурной жизни города. Надеюсь, программа будет разнообразной."
        timeAgo="1 час назад"
      />
    </div>
  );
}
