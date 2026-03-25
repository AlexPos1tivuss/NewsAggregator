import { useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  views: number;
  createdAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  commentsCount: number;
}

function useDebounce(value: string, delay: number): string {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Home() {
  const search = useSearch();
  const categorySlug = new URLSearchParams(search).get("category") || "all";
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 350);

  const { data: newsItems, isLoading: newsLoading } = useQuery<NewsItem[]>({
    queryKey: ["/api/news", categorySlug],
    queryFn: async () => {
      const url = categorySlug === "all"
        ? "/api/news"
        : `/api/news?category=${categorySlug}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
    enabled: !debouncedSearch,
  });

  const { data: searchResults, isLoading: searchLoading } = useQuery<NewsItem[]>({
    queryKey: ["/api/news/search", debouncedSearch],
    queryFn: async () => {
      const res = await fetch(`/api/news/search?q=${encodeURIComponent(debouncedSearch)}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to search");
      return res.json();
    },
    enabled: !!debouncedSearch,
  });

  const isLoading = debouncedSearch ? searchLoading : newsLoading;
  const displayedItems = debouncedSearch ? (searchResults || []) : (newsItems || []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Новости Минска
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Актуальные события, мероприятия и важные новости столицы
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Поиск новостей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
              data-testid="input-search"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
                data-testid="button-clear-search"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {debouncedSearch && (
          <p className="text-sm text-muted-foreground mb-4" data-testid="text-search-results-label">
            {searchLoading
              ? "Поиск..."
              : `Результаты поиска по запросу «${debouncedSearch}»: ${displayedItems.length} ${
                  displayedItems.length === 1 ? "статья" :
                  displayedItems.length < 5 ? "статьи" : "статей"
                }`
            }
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((newsItem) => (
              <NewsCard
                key={newsItem.id}
                id={newsItem.id}
                title={newsItem.title}
                excerpt={newsItem.excerpt}
                category={newsItem.category.name}
                imageUrl={newsItem.imageUrl || undefined}
                views={newsItem.views}
                commentsCount={newsItem.commentsCount}
                publishedAt={formatDistanceToNow(new Date(newsItem.createdAt), {
                  addSuffix: true,
                  locale: ru,
                })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16" data-testid="text-no-news">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-lg text-muted-foreground">
              {debouncedSearch ? `По запросу «${debouncedSearch}» ничего не найдено` : "Новостей пока нет"}
            </p>
            {debouncedSearch && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Сбросить поиск
              </Button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
