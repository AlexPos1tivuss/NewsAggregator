"""Generate diagram PNGs for the diploma thesis."""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

os.makedirs("dist/figures", exist_ok=True)

FONT = {"family": "DejaVu Sans", "size": 9}
plt.rcParams.update({"font.family": FONT["family"], "font.size": FONT["size"]})


def box(ax, x, y, w, h, text, fc="white", ec="black", lw=1.2, fontsize=9, weight="normal"):
    p = FancyBboxPatch(
        (x, y), w, h,
        boxstyle="round,pad=0.02,rounding_size=0.05",
        linewidth=lw, edgecolor=ec, facecolor=fc,
    )
    ax.add_patch(p)
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center",
            fontsize=fontsize, weight=weight, wrap=True)


def arrow(ax, x1, y1, x2, y2, style="-|>", color="black", lw=1.0):
    a = FancyArrowPatch((x1, y1), (x2, y2),
                        arrowstyle=style, mutation_scale=12,
                        color=color, linewidth=lw)
    ax.add_patch(a)


def fig_belta_org():
    fig, ax = plt.subplots(figsize=(11, 6.5))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 9)
    ax.axis("off")

    box(ax, 5.5, 7.7, 3, 0.9, "Генеральный директор\nРУП «БЕЛТА»",
        fc="#E6EEF8", weight="bold")

    # Зам. директора
    box(ax, 1.2, 6.0, 3.0, 0.8, "Заместитель директора\nпо редакционной работе", fc="#F2F2F2")
    box(ax, 5.5, 6.0, 3.0, 0.8, "Заместитель директора\nпо технологиям", fc="#F2F2F2")
    box(ax, 9.8, 6.0, 3.0, 0.8, "Заместитель директора\nпо распространению", fc="#F2F2F2")

    arrow(ax, 7.0, 7.7, 2.7, 6.8)
    arrow(ax, 7.0, 7.7, 7.0, 6.8)
    arrow(ax, 7.0, 7.7, 11.3, 6.8)

    # Под зам. редакционной
    box(ax, 0.1, 4.2, 2.2, 0.8, "Отдел\nновостной\nленты", fontsize=8.5)
    box(ax, 2.5, 4.2, 2.2, 0.8, "Отдел\nтематических\nрубрик", fontsize=8.5)
    arrow(ax, 2.7, 6.0, 1.2, 5.0)
    arrow(ax, 2.7, 6.0, 3.6, 5.0)

    # Под зам. технологий
    box(ax, 4.8, 4.2, 2.0, 0.8, "Отдел\nIT-инфраструктуры", fontsize=8.5)
    box(ax, 7.0, 4.2, 2.0, 0.8, "Отдел разработки\nи поддержки CMS", fontsize=8.5)
    arrow(ax, 7.0, 6.0, 5.8, 5.0)
    arrow(ax, 7.0, 6.0, 8.0, 5.0)

    # Под зам. распространения
    box(ax, 9.4, 4.2, 2.0, 0.8, "Отдел рекламы\nи маркетинга", fontsize=8.5)
    box(ax, 11.6, 4.2, 2.2, 0.8, "Отдел распространения\nи соцсетей", fontsize=8.5)
    arrow(ax, 11.3, 6.0, 10.4, 5.0)
    arrow(ax, 11.3, 6.0, 12.7, 5.0)

    # Лента -> журналисты, фотокорреспонденты
    box(ax, 0.1, 2.4, 2.2, 0.8, "Журналисты-\nкорреспонденты", fontsize=8.5)
    box(ax, 2.5, 2.4, 2.2, 0.8, "Фото- и видео-\nкорреспонденты", fontsize=8.5)
    arrow(ax, 1.2, 4.2, 1.2, 3.2)
    arrow(ax, 3.6, 4.2, 3.6, 3.2)

    # IT -> сис.админы
    box(ax, 4.8, 2.4, 2.0, 0.8, "Системные\nадминистраторы", fontsize=8.5)
    box(ax, 7.0, 2.4, 2.0, 0.8, "Программисты,\nконтент-менеджеры", fontsize=8.5)
    arrow(ax, 5.8, 4.2, 5.8, 3.2)
    arrow(ax, 8.0, 4.2, 8.0, 3.2)

    # Маркетинг -> SMM
    box(ax, 9.4, 2.4, 2.0, 0.8, "Менеджеры\nрекламы", fontsize=8.5)
    box(ax, 11.6, 2.4, 2.2, 0.8, "SMM-специалисты,\nредакторы рассылок", fontsize=8.5)
    arrow(ax, 10.4, 4.2, 10.4, 3.2)
    arrow(ax, 12.7, 4.2, 12.7, 3.2)

    plt.tight_layout()
    plt.savefig("dist/figures/fig_1_1_belta_org.png", dpi=180, bbox_inches="tight")
    plt.close(fig)


def fig_existing_system():
    fig, ax = plt.subplots(figsize=(11, 6.5))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 8.5)
    ax.axis("off")

    ax.text(7, 8.2, "Существующая информационная система РУП «БЕЛТА»",
            ha="center", fontsize=11, weight="bold")

    # Internal users layer
    box(ax, 0.5, 6.4, 3.5, 0.9, "Журналисты, редакторы\n(внутренние пользователи)", fc="#FFF4E5")
    box(ax, 10.0, 6.4, 3.5, 0.9, "Читатели сайта belta.by\n(внешние пользователи)", fc="#FFF4E5")

    # Subsystems middle
    box(ax, 0.3, 4.4, 3.0, 1.2, "Подсистема ввода\nи редактирования\nматериалов (внутр. CMS)", fc="#E6EEF8")
    box(ax, 3.7, 4.4, 2.6, 1.2, "Подсистема\nрубрикации\nи поиска", fc="#E6EEF8")
    box(ax, 6.6, 4.4, 2.6, 1.2, "Подсистема\nпубликации\nна сайте", fc="#E6EEF8")
    box(ax, 9.5, 4.4, 2.6, 1.2, "Подсистема\nстатистики\nпосещений", fc="#E6EEF8")
    box(ax, 12.4, 4.4, 1.5, 1.2, "Рассылки\nи соцсети", fc="#E6EEF8")

    # Storage layer
    box(ax, 2.5, 2.4, 4.5, 1.0, "Централизованное хранилище\nновостного контента (БД)", fc="#E8F5E9", weight="bold")
    box(ax, 8.0, 2.4, 4.5, 1.0, "Хранилище медиафайлов\n(фото, видео, графика)", fc="#E8F5E9", weight="bold")

    # External
    box(ax, 4.5, 0.5, 5.0, 1.0, "Внешний веб-сайт belta.by\n(публичный интерфейс)", fc="#FCE4EC", weight="bold")

    # Arrows: users -> subsystems
    arrow(ax, 2.0, 6.4, 1.8, 5.6)
    arrow(ax, 11.7, 6.4, 7.0, 5.6)  # readers -> publication
    arrow(ax, 11.7, 6.4, 10.8, 5.6)  # readers -> stats

    # Subsystems -> storage
    for sx in [1.8, 5.0, 7.9, 10.8]:
        arrow(ax, sx, 4.4, 4.7, 3.4)
    arrow(ax, 13.1, 4.4, 10.2, 3.4)

    # Storage -> external site
    arrow(ax, 4.7, 2.4, 6.0, 1.5)
    arrow(ax, 10.2, 2.4, 8.0, 1.5)

    plt.tight_layout()
    plt.savefig("dist/figures/fig_1_2_existing_system.png", dpi=180, bbox_inches="tight")
    plt.close(fig)


def fig_developed_system():
    fig, ax = plt.subplots(figsize=(12, 7.5))
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 10)
    ax.axis("off")

    ax.text(8, 9.6, "Структурная схема разработанной системы «Минск.Новости»",
            ha="center", fontsize=11, weight="bold")
    ax.text(8, 9.2, "(полужирной рамкой выделены разработанные модули)",
            ha="center", fontsize=9, style="italic")

    DEV = dict(fc="#E6EEF8", ec="#0B5394", lw=2.2, weight="bold")
    EXT = dict(fc="#F5F5F5", ec="#666666", lw=1.0)

    # Client layer
    ax.text(0.3, 8.5, "Клиентская часть (React SPA)", fontsize=10, weight="bold")
    box(ax, 0.3, 7.4, 2.4, 0.8, "Маршрутизация\n(wouter)", **DEV)
    box(ax, 2.9, 7.4, 2.4, 0.8, "AuthContext\n(React Context)", **DEV)
    box(ax, 5.5, 7.4, 2.4, 0.8, "TanStack Query\n(серв. данные)", **DEV)
    box(ax, 8.1, 7.4, 2.4, 0.8, "UI-компоненты\nNewsCard, Footer", **DEV)
    box(ax, 10.7, 7.4, 2.4, 0.8, "Страницы Home,\nNewsDetail, Profile", **DEV)
    box(ax, 13.3, 7.4, 2.4, 0.8, "Admin,\nNewsEditor", **DEV)

    # Browser
    box(ax, 13.3, 8.6, 2.4, 0.6, "Браузер пользователя", **EXT)

    # API gateway
    box(ax, 5.5, 5.8, 5.0, 0.9, "REST API (HTTPS, JSON)\n/api/news, /api/auth, /api/admin ...", **DEV)

    # Server layer
    ax.text(0.3, 5.0, "Серверная часть (Node.js + Express)", fontsize=10, weight="bold")
    box(ax, 0.3, 3.8, 2.4, 0.9, "requireAuth /\nrequireAdmin\n(middleware)", **DEV)
    box(ax, 2.9, 3.8, 2.4, 0.9, "Маршруты\nserver/routes.ts", **DEV)
    box(ax, 5.5, 3.8, 2.4, 0.9, "Слой хранения\nIStorage / DbStorage", **DEV)
    box(ax, 8.1, 3.8, 2.4, 0.9, "Модуль начисления\nXP и уровней", **DEV)
    box(ax, 10.7, 3.8, 2.4, 0.9, "Загрузка изображений\n(multer)", **DEV)
    box(ax, 13.3, 3.8, 2.4, 0.9, "Сессии\n(express-session)", **EXT)

    # Shared schema
    box(ax, 5.5, 2.5, 5.0, 0.8, "shared/schema.ts (Drizzle ORM, общие типы TypeScript)", **DEV)

    # Data layer
    ax.text(0.3, 1.7, "Уровень данных", fontsize=10, weight="bold")
    box(ax, 0.3, 0.3, 3.0, 1.1, "PostgreSQL:\nusers, news, categories", **EXT)
    box(ax, 3.5, 0.3, 3.0, 1.1, "comments, bookmarks,\nnews_views", **EXT)
    box(ax, 6.7, 0.3, 3.0, 1.1, "session\n(connect-pg-simple)", **EXT)
    box(ax, 9.9, 0.3, 5.8, 1.1, "Файловое хранилище загруженных изображений", **EXT)

    # Arrows client -> API
    for cx in [1.5, 4.1, 6.7, 9.3, 11.9, 14.5]:
        arrow(ax, cx, 7.4, 8.0, 6.7, lw=0.7)

    # API -> server modules
    for sx in [1.5, 4.1, 6.7, 9.3, 11.9, 14.5]:
        arrow(ax, 8.0, 5.8, sx, 4.7, lw=0.7)

    # Server -> shared schema
    for sx in [1.5, 4.1, 6.7, 9.3, 11.9]:
        arrow(ax, sx, 3.8, 8.0, 3.3, lw=0.7)

    # Shared -> DB
    arrow(ax, 8.0, 2.5, 1.8, 1.4, lw=0.7)
    arrow(ax, 8.0, 2.5, 5.0, 1.4, lw=0.7)
    arrow(ax, 8.0, 2.5, 8.2, 1.4, lw=0.7)

    # Multer -> file storage
    arrow(ax, 11.9, 3.8, 12.8, 1.4, lw=0.7)

    # Browser -> client
    arrow(ax, 14.5, 8.6, 14.5, 8.2)

    # Legend
    legend_dev = mpatches.Patch(facecolor="#E6EEF8", edgecolor="#0B5394", linewidth=2.2,
                                label="Разработанные модули")
    legend_ext = mpatches.Patch(facecolor="#F5F5F5", edgecolor="#666666", linewidth=1.0,
                                label="Существующие / стандартные компоненты")
    ax.legend(handles=[legend_dev, legend_ext], loc="upper right",
              bbox_to_anchor=(1.0, 0.99), fontsize=8, framealpha=0.9)

    plt.tight_layout()
    plt.savefig("dist/figures/fig_2_9a_developed_system.png", dpi=180, bbox_inches="tight")
    plt.close(fig)


if __name__ == "__main__":
    fig_belta_org()
    fig_existing_system()
    fig_developed_system()
    print("Figures saved to dist/figures/")
