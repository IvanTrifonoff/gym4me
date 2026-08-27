# gym4me parallel containers

Новый проект запускается отдельно от production `/opt/opengym`. Compose-файл: `docker-compose.next.yml`.

## Порты

По умолчанию используются только loopback-порты:

- API: `127.0.0.1:3310`;
- frontend: `127.0.0.1:3380`.

Порты переопределяются `GYM4ME_API_PORT` и `GYM4ME_WEB_PORT`.

## Данные и секреты

- Athlete runtime data находится в Docker named volume `gym4me_data`;
- production `/opt/opengym/data` не монтируется;
- `SESSION_SECRET` передаётся только через окружение;
- пустой secret оставляет authenticated API закрытым;
- PostgreSQL пока намеренно не подключается, пока не завершён отдельный migration adapter.

## Запуск

```bash
GYM4ME_SESSION_SECRET='use-a-long-runtime-secret' docker compose -f docker-compose.next.yml up -d --build
```

Это не deploy и не переключает домен. Перед подключением reverse proxy обязательны smoke-тесты и отдельное согласование.
