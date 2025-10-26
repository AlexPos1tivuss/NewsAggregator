import { Card } from "@/components/ui/card";
import CategoryBadge from "./CategoryBadge";
import { Eye, MessageCircle } from "lucide-react";
import { Link } from "wouter";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  views: number;
  commentsCount: number;
  publishedAt: string;
}

export default function NewsCard({
  id,
  title,
  excerpt,
  category,
  imageUrl,
  views,
  commentsCount,
  publishedAt,
}: NewsCardProps) {
  return (
    <Link href={`/news/${id}`}>
      <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 cursor-pointer group">
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full aspect-[16/9] object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <CategoryBadge category={category} />
          </div>
        </div>
        <div className="p-6 space-y-3">
          <h3 className="text-2xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
            <span>{publishedAt}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{commentsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
