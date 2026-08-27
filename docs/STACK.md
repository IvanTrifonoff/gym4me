# openGym Next: исходный стек

Новая структура сохраняет стек работающего openGym, чтобы разработчикам не приходилось осваивать другой runtime.

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

## Правило

Не добавлять Python, другой backend runtime, новый frontend framework или новую state-management библиотеку без отдельного архитектурного решения. Служебные скрипты миграции могут быть написаны на любом удобном языке, но не являются частью приложения.

## Совместимость

На время миграции сохраняются:

- cookies `gymsid` и `adminsid`;
- production RP ID и origin из окружения;
- формат WebAuthn credential DTO;
- push VAPID/Web Push;
- Capacitor mobile build;
- общая PWA design system.
