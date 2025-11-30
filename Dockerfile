# Используем официальный образ Python 3.13
FROM python:3.13.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем pyproject.toml и setup.cfg (если есть)
COPY pyproject.toml ./

# Устанавливаем pip и зависимости проекта
RUN pip install --upgrade pip setuptools wheel \
    && pip install .

# Копируем весь проект в контейнер
COPY . .

# Открываем порт, на котором будет работать FastAPI
EXPOSE 8443

# Команда запуска приложения
CMD ["python", "main.py"]
