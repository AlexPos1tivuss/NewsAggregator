import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CategoryBadge from "./CategoryBadge";
import { Eye, MessageCircle, Bookmark, BookmarkCheck } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

type BookmarkedNews = { id: string; [key: string]: unknown };

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
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: bookmarks = [] } = useQuery<BookmarkedNews[]>({
    queryKey: ["/api/bookmarks"],
    enabled: isAuthenticated,
  });

  const isBookmarked = bookmarks.some((b) => b.id === id);

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/bookmarks/${id}`, {});
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks"] });
      toast({
        title: isBookmarked ? "Удалено из закладок" : "Добавлено в закладки",
        description: isBookmarked ? "Статья удалена из закладок" : "Статья сохранена в вашем профиле",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить закладку",
        variant: "destructive",
      });
    },
  });

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    bookmarkMutation.mutate();
  };

  return (
    <Link href={`/news/${id}`} data-testid={`card-news-${id}`}>
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
          {isAuthenticated && (
            <div className="absolute top-4 right-4">
              <Button
                size="icon"
                variant="ghost"
                className="bg-background/70 backdrop-blur-sm"
                onClick={handleBookmark}
                disabled={bookmarkMutation.isPending}
                data-testid={`button-bookmark-${id}`}
                aria-label={isBookmarked ? "Убрать из закладок" : "Добавить в закладки"}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
        <div className="p-6 space-y-3">
          <h3 className="text-2xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          <div className="flex items-center justify-between gap-1 text-sm text-muted-foreground pt-2">
            <span>{publishedAt}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1" data-testid={`text-views-${id}`}>
                <Eye className="h-4 w-4" />
                <span>{views}</span>
              </div>
              <div className="flex items-center gap-1" data-testid={`text-comments-${id}`}>
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
