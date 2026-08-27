# openGym Next: исходный стек

Новая структура сохраняет стек работающего openGym. Приложение, сборка, тесты и миграции выполняются на исходном Node.js/React стеке.

## Backend

- Node.js 22;
- ECMAScript modules (`type: module`);
- обычный Node HTTP API без нового web-framework;
- PostgreSQL через `pg`;
- `@simplewebauthn/server` для passkey/WebAuthn;
- `web-push` для Web Push/VAPID;
- Node test runner для unit/contract tests.

## Frontend

- React 19;
- Vite 8;
- React Router 7;
- Zustand 5;
- Vitest 4;
- Capacitor 7 для iOS/Android;
- существующий PWA service worker.

## Жёсткое правило

Python, pip, pytest и Python runtime не являются частью приложения, сборки, тестов или миграций `gym4me`. Новые зависимости и инструменты добавляются только после архитектурного решения и должны сохранять исходный Node.js + React + Vite + PostgreSQL + WebAuthn/Web Push стек.

## Совместимость

На время миграции сохраняются cookies `gymsid` и `adminsid`, production RP ID/origin из окружения, WebAuthn credential DTO, push VAPID/Web Push, Capacitor mobile build и общая PWA design system.
