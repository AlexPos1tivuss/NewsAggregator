import { useState } from "react";
import Header from "@/components/Header";
import UserLevelBadge from "@/components/UserLevelBadge";
import XPProgress from "@/components/XPProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

//todo: remove mock functionality
const mockUser = {
  username: "Алексей",
  email: "alexey@example.com",
  level: 5,
  currentXP: 450,
  requiredXP: 500,
  avatarUrl: "",
  commentsHistory: [
    {
      id: "1",
      newsTitle: "Открытие нового культурного центра в центре Минска",
      newsId: "1",
      content: "Отличная новость! Давно ждал открытия этого центра.",
      createdAt: "2 часа назад",
    },
    {
      id: "2",
      newsTitle: "IT-парк расширяется: новые резиденты и проекты",
      newsId: "6",
      content: "Здорово, что IT-сектор в городе развивается!",
      createdAt: "1 день назад",
    },
    {
      id: "3",
      newsTitle: "Чемпионат города по футболу: итоги первого тура",
      newsId: "8",
      content: "Отличные результаты у нашей команды!",
      createdAt: "2 дня назад",
    },
  ],
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(mockUser.username);
  const [avatar, setAvatar] = useState(mockUser.avatarUrl);
  const { toast } = useToast();

  const handleSave = () => {
    console.log("Сохранение профиля:", { username, avatar });
    toast({
      title: "Профиль обновлен",
      description: "Ваши изменения успешно сохранены",
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated username={username} avatarUrl={avatar} />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">Мой профиль</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="md:col-span-1">
            <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
              <Avatar className="h-32 w-32">
                {avatar && <AvatarImage src={avatar} alt={username} />}
                <AvatarFallback className="text-3xl">
                  {username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <div className="w-full">
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>Загрузить фото</span>
                    </Button>
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    data-testid="input-avatar"
                  />
                </div>
              )}
              
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                  data-testid="button-edit-profile"
                >
                  <Edit className="h-4 w-4" />
                  Редактировать
                </Button>
              ) : (
                <div className="flex gap-2 w-full">
                  <Button size="sm" onClick={handleSave} className="flex-1" data-testid="button-save-profile">
                    Сохранить
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setUsername(mockUser.username);
                      setAvatar(mockUser.avatarUrl);
                    }}
                    className="flex-1"
                    data-testid="button-cancel-edit"
                  >
                    Отмена
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Никнейм</Label>
                {isEditing ? (
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    data-testid="input-username"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold">{username}</p>
                    <UserLevelBadge level={mockUser.level} />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-muted-foreground">{mockUser.email}</p>
              </div>

              <div className="space-y-2">
                <Label>Прогресс</Label>
                <XPProgress
                  currentXP={mockUser.currentXP}
                  requiredXP={mockUser.requiredXP}
                  level={mockUser.level}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              История комментариев
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUser.commentsHistory.map((comment) => (
                <Link key={comment.id} href={`/news/${comment.newsId}`}>
                  <Card className="hover-elevate transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <p className="font-semibold text-sm hover:text-primary transition-colors">
                          {comment.newsTitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {comment.createdAt}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
