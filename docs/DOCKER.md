# gym4me parallel containers

Новый проект запускается отдельно от production `/opt/opengym`. Compose-файл: `docker-compose.next.yml`.

## Порты

По умолчанию используются только loopback-порты:

- API: `127.0.0.1:3310`;
- frontend: `127.0.0.1:3380`.

Порты переопределяются `GYM4ME_API_PORT` и `GYM4ME_WEB_PORT`.

## Данные и секреты

- Athlete runtime data находится в Docker named volume `gym4me_data`;
- bodyweight PostgreSQL data — в отдельном volume `gym4me_bodyweight_db`;
- production `/opt/opengym/data` не монтируется;
- secrets передаются через окружение и не коммитятся.

## Обычный preview

```bash
GYM4ME_SESSION_SECRET='use-a-long-runtime-secret' docker compose -f docker-compose.next.yml up -d --build
```

PostgreSQL profile по умолчанию выключен.

## Preview с bodyweight PostgreSQL

```bash
export GYM4ME_SESSION_SECRET='use-a-long-runtime-secret'
export GYM4ME_DB_PASSWORD='use-a-separate-db-password'
export GYM4ME_DATABASE_URL='postgresql://gym4me:use-a-separate-db-password@bodyweight-db:5432/gym4me'
export ATHLETE_BODYWEIGHT_PG=1
docker compose -f docker-compose.next.yml --profile bodyweight-db up -d --build
```

Профиль запускается только явно через `--profile bodyweight-db`; production database не используется.
