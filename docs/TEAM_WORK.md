# Правила параллельной разработки

## Владельцы модулей

- Gym/Admin: `api/src/domains/gym`, `frontend/src/domains/gym`;
- Trainer: `api/src/domains/trainer`, `frontend/src/domains/trainer`;
- Athlete: `api/src/domains/athlete`, `frontend/src/domains/athlete`;
- Platform: `auth`, `events`, `notifications`, `outbox`;
- Analytics: `api/src/domains/analytics`.

## Правила PR

1. Один PR — один домен или один публичный контракт.
2. Не редактировать центральный `main.js` для каждой feature-задачи.
3. Не импортировать внутренний repository другого домена.
4. Изменение контракта требует обновить `contracts/` и tests.
5. Общие компоненты менять отдельным PR.
6. Не коммитить `.env`, `data/`, VAPID/private keys и production dumps.

## Ветки

```text
feat/gym-branches
feat/trainer-availability
feat/athlete-custom-exercises
feat/booking-state-machine
feat/notifications-outbox
```
