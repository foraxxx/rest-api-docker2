FROM node:18 AS builder
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект и строим его
COPY . .
RUN npm run build

# Финальный образ для обслуживания собранного приложения
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Копируем скомпилированные файлы из этапа сборки
COPY --from=builder /app/dist .

# Удаляем дефолтную конфигурацию nginx и добавляем свою
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]