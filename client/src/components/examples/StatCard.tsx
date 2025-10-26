import StatCard from '../StatCard';
import { Users, FileText, MessageCircle, Eye } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Всего пользователей"
        value="1,234"
        icon={Users}
        trend="+12% за неделю"
        trendUp
      />
      <StatCard
        title="Новостей"
        value="456"
        icon={FileText}
        trend="+8% за неделю"
        trendUp
      />
      <StatCard
        title="Комментариев"
        value="3,892"
        icon={MessageCircle}
        trend="+23% за неделю"
        trendUp
      />
      <StatCard
        title="Просмотров"
        value="45.2K"
        icon={Eye}
        trend="+15% за неделю"
        trendUp
      />
    </div>
  );
}
