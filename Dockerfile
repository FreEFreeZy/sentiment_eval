# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем все остальные файлы проекта
COPY . .

# Открываем порт, который использует сервер
EXPOSE 3000

# Команда для запуска сервера
CMD ["npm", "start"]
