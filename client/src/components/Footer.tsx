import { Link } from "wouter";
import { Newspaper } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Новости Минска</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Актуальные новости, события и мероприятия столицы Беларуси. Читайте, комментируйте и зарабатывайте очки опыта.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Категории</h3>
            <ul className="space-y-2">
              {[
                { label: "Все новости", href: "/" },
                { label: "Мероприятия", href: "/?category=events" },
                { label: "События", href: "/?category=news" },
                { label: "Экономика", href: "/?category=economy" },
                { label: "Технологии", href: "/?category=tech" },
                { label: "Спорт", href: "/?category=sports" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">О проекте</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Регистрация
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Войти
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Профиль
                  </span>
                </Link>
              </li>
            </ul>
            <div className="pt-2 space-y-1">
              <p className="text-xs text-muted-foreground">
                Дипломный проект
              </p>
              <p className="text-xs text-muted-foreground">
                Минск, Беларусь
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Новости Минска. Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground">
            Читайте — зарабатывайте XP — растите в уровнях
          </p>
        </div>
      </div>
    </footer>
  );
}
