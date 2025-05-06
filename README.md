# React + TypeScript + Vite

## Task Flow Builder

Веб-додаток для побудови бізнес-процесів у вигляді блок-схем. Реалізовано з використанням React, TypeScript, React Flow, Tailwind CSS і Redux Toolkit.

## Встановлення

1. Клонуйте репозиторій:

   git clone https://github.com/Andrey9019/task-flow-builder.git
   cd task-flow-builder

2. Встановіть залежності:

   npm install

3. Запустіть проєкт:

   npm run dev

4. Відкрийте в браузері:

   (http://localhost:5173)

## Структура проєкту

• components/ — усі UI-компоненти
• hooks/ — кастомні хуки (useFlowLocalHost, useFlowAction)
• store/ — Redux-слайси для nodes, edges, selectedNode
• utils/ — допоміжні функції для зберігання в localStorage

## Функціонал

• Додавання, переміщення та з’єднання блоків
• Збереження змін у localStorage
• Можливість редагування блоку через панель
• Підтримка масштабування та drag’n’drop
