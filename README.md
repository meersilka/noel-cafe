# Café НОЭЛЬ — демо-лендинг

Одностраничный сайт-визитка для кофейни в парижском стиле. Сделан как демонстрация уровня лендингов под заказ.

**Живой деплой:** https://noel-cafe.vercel.app — задеплоено через Vercel + GitHub.

## Что внутри

- Тёплая кремовая палитра в духе парижского бистро (cream + brass + espresso)
- Винтажная бумажная фактура
- Орнаментальные разделители между секциями (`bonjour`, `à votre santé`)
- Меню классики французского кафе: Café crème, Croissant au beurre, Macaron framboise
- Двуязычные подзаголовки разделов (`notre histoire · о нас`, `la carte · меню`, `l'ambiance · атмосфера`)
- GSAP-анимации: посимвольное появление заголовка, ScrollTrigger-ревилы, параллакс фона и картинок, 3D-наклон карточек на ховер
- Lenis-инерционный смуз-скролл
- Адаптивная вёрстка

## Стек

- HTML / CSS / vanilla JavaScript
- GSAP 3 + ScrollTrigger (через CDN)
- Lenis (через CDN)
- Google Fonts: Playfair Display, Cormorant Garamond, Inter
- Фото — Unsplash

## Структура

```
.
├── index.html
├── style.css
├── script.js
└── images/
    ├── hero.jpg
    ├── beans.jpg
    ├── croissant.jpg
    ├── macaron.jpg
    ├── latte.jpg
    ├── cup.jpg
    └── interior.jpg
```

## Локально посмотреть

Открыть `index.html` в браузере — никаких сборок не нужно.

## Деплой

Подключён к Vercel — любой `git push` на `main` пересобирает сайт автоматически.
