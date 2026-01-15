#!/bin/bash

# Автоматический скрипт деплоя проекта на GitHub
# Использование: ./deploy.sh <GITHUB_REPO_URL>

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=== НАЧИНАЕМ ДЕПЛОЙ НА GITHUB ===${NC}"
echo ""

# Проверка аргумента
if [ -z "$1" ]; then
    echo -e "${RED}Укажите URL репозитория${NC}"
    echo "Использование: ./deploy.sh <GITHUB_REPO_URL>"
    exit 1
fi

GITHUB_REPO_URL="$1"

# Инициализация Git (если нужно)
if [ ! -d ".git" ]; then
    echo "Инициализация Git..."
    git init
    git branch -M main
fi

# Добавление remote
if git remote get-url origin &>/dev/null; then
    git remote set-url origin "$GITHUB_REPO_URL"
else
    git remote add origin "$GITHUB_REPO_URL"
fi

echo "URL репозитория: $GITHUB_REPO_URL"

# Добавление файлов
echo "Добавление файлов..."
git add .

# Создание коммита
if git diff --cached --quiet; then
    echo "Нет изменений для коммита"
else
    git commit -m "Initial commit - Numerology Calculator with AI"
    echo "Коммит создан"
fi

# Пуш на GitHub
echo "Отправка на GitHub..."
git push -u origin main

echo ""
echo -
chmod +x deploy.sh
./deploy.sh https://github.com/zareka14-ui/matrix.git

.[200~cat > deploy.sh << 'EOF'
#!/bin/bash
set -e
GITHUB_REPO_URL="${1}"
if [ -z "$GITHUB_REPO_URL" ]; then
    echo "Укажите URL репозитория"
    exit 1
fi
if [ ! -d ".git" ]; then
    git init && git branch -M main
fi
if git remote get-url origin &>/dev/null; then
    git remote set-url origin "$GITHUB_REPO_URL"
else
    git remote add origin "$GITHUB_REPO_URL"
fi
git add .
git diff --cached --quiet || git commit -m "Initial commit - Numerology Calculator with AI"
git push -u origin main
echo "Готово! Ваш проект: ${GITHUB_REPO_URL%.git}"
