# Дизайн-руководство: Новостной Агрегатор Минска

## Принципы дизайна
Reference-Based Design (Medium + Apple News + Duolingo): Контент превыше всего, плавные переходы, чистая иерархия, минимализм с акцентом на типографику.

## Типографика

**Шрифты (Google Fonts):**
- **Inter** (400, 500, 600, 700) - интерфейс, заголовки
- **Lora** (400, 600) - текст статей

**Иерархия:**
- Заголовок статьи: `text-4xl md:text-5xl font-bold leading-tight`
- Заголовок карточки: `text-2xl md:text-3xl font-bold`
- Подзаголовки: `text-lg font-semibold`
- Основной текст: `text-base leading-relaxed`
- Мета/UI: `text-sm font-medium`

## Spacing & Layout

**Отступы:** 2, 3, 4, 6, 8, 12, 16, 20
- Карточки: `p-6`
- Секции: `px-4 md:px-8 py-12 md:py-20`
- Элементы в карточках: `space-y-3`
- Формы: `space-y-6`

**Breakpoints (mobile-first):** sm(640), md(768), lg(1024), xl(1280)

## Компоненты

### Навигация
**Верхняя панель:**
```
sticky top-0 h-16 backdrop-blur-md
[Логотип] [Категории] [Профиль/Уведомления]
```
- Мобильная: гамбургер → полноэкранный оверлей
- Категории: горизонтальная прокрутка (mobile), активная с `border-b-2`

### Карточки новостей
**Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`

**Структура:**
```html
<div class="rounded-lg overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-200">
  <img class="aspect-[16/9] object-cover" />
  <span class="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium">Категория</span>
  <div class="p-6">
    <h3 class="line-clamp-2 text-2xl font-bold">Заголовок</h3>
    <p class="line-clamp-3 text-sm">Описание</p>
    <div class="flex justify-between items-center text-sm">Дата · Просмотры</div>
  </div>
</div>
```

### Детальная страница
```html
<article class="max-w-4xl mx-auto px-4">
  <img class="w-full h-96 object-cover rounded-xl mb-8" />
  <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">Заголовок</h1>
  <div class="flex items-center gap-4 mb-8">Автор · Дата · Категория · [Поделиться]</div>
  <div class="prose prose-lg max-w-none">Контент</div>
  <section class="mt-16 border-t pt-12">Комментарии</section>
</article>
```

**Кнопка "Поделиться":** `rounded-full px-4 py-2` → копирование + тост "Ссылка скопирована"

### Комментарии
**Форма:**
```html
<textarea class="min-h-24 rounded-lg p-4 w-full"></textarea>
<button class="rounded-lg px-6 py-2">Отправить</button>
```

**Отображение:**
```html
<div class="space-y-4">
  <div class="flex gap-3">
    <img class="w-10 h-10 rounded-full" />
    <div>
      <div class="font-semibold text-sm">Никнейм · <span class="text-xs">2ч назад</span></div>
      <p class="mt-2">Текст комментария</p>
    </div>
  </div>
</div>
```

### Профиль
```html
<div class="grid md:grid-cols-3 gap-8">
  <div>
    <img class="w-32 h-32 rounded-full" />
    <button>Редактировать</button>
  </div>
  <div class="md:col-span-2">
    <h2 class="text-3xl font-bold">Никнейм <span class="rounded-full px-3 py-1 bg-blue-500 text-white text-sm">Ур. 3</span></h2>
    <p class="text-sm">email@example.com</p>
    <div class="h-2 rounded-full bg-gray-200 mt-4">
      <div class="h-full rounded-full bg-blue-500" style="width: 50%"></div>
    </div>
    <p class="text-xs mt-1">150/300 XP до уровня 4</p>
  </div>
</div>
<section class="mt-12">
  <h3>Ваши комментарии</h3>
  <div class="border rounded-lg p-4">Новость · Комментарий · Дата</div>
</section>
```

### Админ-панель
**Навигация:** `w-64 fixed` боковая панель (Статистика, Пользователи, Новости, Категории)

**Редактор новостей:**
```html
<form class="max-w-5xl mx-auto space-y-6">
  <input class="text-3xl font-bold border-b pb-4 w-full" placeholder="Заголовок" />
  <div class="aspect-[16/9] border-2 border-dashed rounded-lg">Dropzone изображения</div>
  <div>[Rich text editor: Quill/Tiptap]</div>
  <select>Категория</select>
  <div class="flex gap-3">
    <button>Сохранить</button><button>Предпросмотр</button><button>Удалить</button>
  </div>
</form>
```

**Таблица пользователей:** Responsive, чередующиеся строки (Аватар · Никнейм · Email · Уровень · Комментарии · Статус · [Действия])

**Дашборд:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` метрик-карточек (Иконка · `text-3xl font-bold` число · описание · тренд)

### Формы авторизации
```html
<div class="max-w-md mx-auto mt-20">
  <h2 class="text-2xl font-bold mb-8">Вход</h2>
  <form class="space-y-4">
    <div>
      <label class="text-sm font-medium mb-2 block">Email</label>
      <input class="w-full px-4 py-3 rounded-lg" />
    </div>
    <button class="w-full py-3 rounded-lg font-medium">Войти</button>
  </form>
  <p class="text-center text-sm mt-6">Нет аккаунта? <a>Регистрация</a></p>
</div>
```

### UI элементы
**Кнопки:**
- Основная: `px-6 py-3 rounded-lg font-medium`
- Вторичная: `px-6 py-3 rounded-lg border-2`
- Маленькая: `px-4 py-2 text-sm rounded-lg`
- Иконка: `w-10 h-10 rounded-full flex items-center justify-center`

**Бейджи:** `rounded-full px-3 py-1 text-xs font-semibold`

**Тосты:** `fixed top-4 right-4 flex items-center gap-3 p-4 rounded-lg shadow-lg` + slide-in/fade-in, автоскрытие 3 сек

## Анимации
- Hover: `transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl`
- Модалы: fade-in + scale(0.95→1)
- Роуты: cross-fade
- Загрузка: skeleton loaders
- Прогресс-бар: анимированное заполнение
- **Запрещено:** Auto-play видео, чрезмерные parallax

## Изображения
- **Главная:** НЕТ hero, сразу категории + grid
- **Детальная:** `w-full h-96 object-cover rounded-xl`
- **Placeholder:** Unsplash Source / gradient с инициалами
- **Аватары:** `rounded-full` (загружаемые)

---

**Фокус:** Удобное, быстрое чтение новостей с геймификацией для вовлеченности.