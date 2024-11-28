# Этап сборки
FROM node:18 AS builder
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект и строим его
COPY . ./
RUN npm run build

# Финальный образ для обслуживания приложения без Nginx
FROM node:18
WORKDIR /app

# Копируем собранные файлы из этапа сборки
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Устанавливаем зависимости для работы приложения
RUN npm install --production

# Открываем порт
EXPOSE 3000

# Запуск сервера для обслуживания статических файлов
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
