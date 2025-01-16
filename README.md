# Проект-заготовка Frontend

Стэк: html, ejs, js (es6), preact, scss, webpack

## Установка и запуск Frontend

Для установки и запуска frontend части выполните в терминале команды:

1. yarn - установка пакетов и зависимостей
2. yarn serve - для запуска dev сервера по адресу http://localhost:8084/:

http://localhost:8084/ru - русская версия

http://localhost:8084/kz - казахская версия

3. yarn compile для сборки production файлов в папку web:

### Общие файлы и папки для всех версий:

/web/fonts

/web/images

/web/bundle.js

/web/site.min.css

### Версии приложения (только html)

/web/kz - казахская версия html

/web/ru - русская версия html

## Структура приложения

/config - основной конфиг. Содержит адрес страницы, адреса assets, omni аттрибуты для всех версий приложения.

/data - переводы, json партнёров, моделей участвующих в акции и список победителей.

/src/components - приложение личного кабинета на preact

/src/css - стили для страницы

/src/html - основной html страниц доткома

/src/js - js не относящийся к личному кабинету, а только к самой странице

/loaders - загрузчики для webpack

/static - статические файлы (при компиляции копируются в /web без изменений)

/thirdparty - дополнительные файлы не используемые в странице (референсы)

/web - папка production сборки

##Стили и html

Структура html блоков в src/html/index.ejs:

```
<section id="example" class="section section-example"> // для инверсной версии добавить section-invert
    <div class="wrapper"> // для отцентровки колонок добавить wrapper-center
        <div class="col col-6"> // col-1 - col-12 - сколько колонок займет блок, col-break для форсированного переноса на новую строку
            <div class="text-wrap"> // для центровки текста добавить text-center
                <h2>Title</h2>
                <p>Text</p>
                <div class="buttons">
                    <a href="" class="btn-p6 btn-p6-encased">Кнопка пустая</a>
                    <a href="" class="btn-p6 btn-p6-black">Кнопка чёрная</a>
                    <a href="" class="btn-p6 btn-p6-white">Кнопка белая</a>
                    <a href="" class="btn-p6 btn-p6-text-underline">Кнопка-текст с подчеркиванием</a>
                </div>
            </div>
        </div>
        <div class="col col-12">
            <div class="video-frame bc-rounded"> //Вставка видео, bc-rounded делает закругленные углы
                <iframe src="https://www.youtube.com/embed/ypWqRzX4ias?controls=0&color=white&modestbranding=1&rel=0&showinfo=0&playsinline=1&loop=1"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
            </div>
        </div>
        <div class="col col-3">
        </div>
    </div> 
    <img src="" alt="" class="background desktop-only"> //Фон на весь блок для десктопа, его высота прописывается для .section-example
    <img src="" alt="" class="background mobile-only"> //Фон на весь блок для мобильной версии, его высота прописывается для .section-example в мобильной версии
</section>
```

Структура стилей в src/css/style.scss

Для каждого нового блока добавляется/дублируется часть &.section-example с нужными оверрайдами. Эта же часть добавляется в _main_mob.scss, где все свойства с {n}px нужно переписать в вид vw({n}, $unitPxVw); для включения масштабирования. Остальные стили дублировать туда не нужно, если нет какого-то особого дизайна для моб. версии, который отличается от десктоп версии.  

## Работа с формой

В шаблоне написан хелпер для создания своих простых форм. Поля формы прописываются в src/js/formFields.js, форма инициализируется в src/scripts.js, где прописывается ключ formKey из api, куда данные отправляются. Для рендера полей используется шаблон /src/html/_input.ejs. Его корректное использование подробно прописано в /src/html/index.ejs

## Админка

Админка промо находится по адресу https://api.sece.kz