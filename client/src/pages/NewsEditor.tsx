import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Save, Eye } from "lucide-react";

const categories = [
  "Мероприятия",
  "События",
  "Экономика",
  "Технологии",
  "Спорт",
  "Культура",
];

export default function NewsEditor() {
  const [, params] = useRoute("/admin/news/:id/edit");
  const isEditing = params?.id && params.id !== "new";
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [title, setTitle] = useState(
    isEditing ? "Открытие нового культурного центра" : ""
  );
  const [category, setCategory] = useState(isEditing ? "Мероприятия" : "");
  const [excerpt, setExcerpt] = useState(
    isEditing
      ? "В центре столицы состоялось торжественное открытие современного культурного центра."
      : ""
  );
  const [content, setContent] = useState(
    isEditing
      ? "В центре столицы состоялось торжественное открытие современного культурного центра, который станет новой площадкой для выставок, концертов и других культурных мероприятий."
      : ""
  );
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Сохранение новости:", { title, category, excerpt, content });
    toast({
      title: isEditing ? "Новость обновлена" : "Новость создана",
      description: "Изменения успешно сохранены",
    });
    setLocation("/admin");
  };

  const handlePreview = () => {
    console.log("Предпросмотр новости");
    toast({
      title: "Предпросмотр",
      description: "Функция предпросмотра будет доступна в следующей версии",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated isAdmin username="Админ" />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">
          {isEditing ? "Редактировать новость" : "Создать новость"}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                placeholder="Введите заголовок новости"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold"
                data-testid="input-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" data-testid="select-category">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Краткое описание</Label>
              <Textarea
                id="excerpt"
                placeholder="Краткое описание для карточки новости"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="min-h-20"
                data-testid="input-excerpt"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Изображение</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate transition-all">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full aspect-[16/9] object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setImagePreview("")}
                    >
                      Изменить изображение
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <Label htmlFor="image" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>Загрузить изображение</span>
                        </Button>
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        data-testid="input-image"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Рекомендуемый размер: 1200x675 пикселей
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Содержание</Label>
              <Textarea
                id="content"
                placeholder="Полный текст новости..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-96 font-serif text-base leading-relaxed"
                data-testid="input-content"
              />
              <p className="text-xs text-muted-foreground">
                Для полноценного редактора с форматированием используйте rich text editor
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="gap-2" data-testid="button-save">
                <Save className="h-4 w-4" />
                Сохранить
              </Button>
              <Button variant="outline" onClick={handlePreview} className="gap-2" data-testid="button-preview">
                <Eye className="h-4 w-4" />
                Предпросмотр
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation("/admin")}
                data-testid="button-cancel"
              >
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
