import { useState } from "react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, MessageCircle, Eye, Ban, Edit, Trash2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

//todo: remove mock functionality
const mockUsers = [
  { id: "1", username: "Алексей", email: "alexey@example.com", level: 5, commentsCount: 23, status: "active" },
  { id: "2", username: "Мария", email: "maria@example.com", level: 12, commentsCount: 89, status: "active" },
  { id: "3", username: "Дмитрий", email: "dmitry@example.com", level: 8, commentsCount: 45, status: "blocked" },
  { id: "4", username: "Ольга", email: "olga@example.com", level: 3, commentsCount: 12, status: "active" },
];

const mockNews = [
  { id: "1", title: "Открытие нового культурного центра", category: "Мероприятия", views: 1234, comments: 45 },
  { id: "2", title: "Городской фестиваль искусств", category: "События", views: 892, comments: 23 },
  { id: "3", title: "Рост экономики: новые показатели", category: "Экономика", views: 1567, comments: 34 },
  { id: "4", title: "IT-парк расширяется", category: "Технологии", views: 3421, comments: 89 },
];

export default function Admin() {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);

  const handleBlockUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "blocked" : "active" }
        : user
    ));
    toast({
      title: "Статус изменен",
      description: "Статус пользователя успешно обновлен",
    });
  };

  const handleDeleteNews = (newsId: string) => {
    console.log("Удаление новости:", newsId);
    toast({
      title: "Новость удалена",
      description: "Новость успешно удалена из системы",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated isAdmin username="Админ" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Панель администратора</h1>
          <Link href="/admin/news/new">
            <Button className="gap-2" data-testid="button-create-news">
              <Plus className="h-4 w-4" />
              Добавить новость
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="stats" className="space-y-8">
          <TabsList>
            <TabsTrigger value="stats" data-testid="tab-stats">Статистика</TabsTrigger>
            <TabsTrigger value="users" data-testid="tab-users">Пользователи</TabsTrigger>
            <TabsTrigger value="news" data-testid="tab-news">Новости</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Уровень</TableHead>
                      <TableHead>Комментарии</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {user.username.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.username}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Ур. {user.level}</Badge>
                        </TableCell>
                        <TableCell>{user.commentsCount}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "destructive"}>
                            {user.status === "active" ? "Активен" : "Заблокирован"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBlockUser(user.id)}
                            className="gap-2"
                            data-testid={`button-toggle-user-${user.id}`}
                          >
                            <Ban className="h-4 w-4" />
                            {user.status === "active" ? "Заблокировать" : "Разблокировать"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>Управление новостями</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Просмотры</TableHead>
                      <TableHead>Комментарии</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockNews.map((news) => (
                      <TableRow key={news.id}>
                        <TableCell className="font-medium">{news.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{news.category}</Badge>
                        </TableCell>
                        <TableCell>{news.views}</TableCell>
                        <TableCell>{news.comments}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/news/${news.id}/edit`}>
                              <Button variant="ghost" size="sm" className="gap-2" data-testid={`button-edit-${news.id}`}>
                                <Edit className="h-4 w-4" />
                                Редактировать
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNews(news.id)}
                              className="gap-2 text-destructive hover:text-destructive"
                              data-testid={`button-delete-${news.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
