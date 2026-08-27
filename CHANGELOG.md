## [0.38.0] - 2026-08-27

### Added
- Athlete store теперь синхронизирует bodyweight при загрузке состояния.
- Серверные точки объединяются с локальными через server-preferred merge.
- При недоступности dedicated endpoint сохраняются bodyweight данные из state.
- Исправлен отсутствующий импорт  в AthleteApp.
- Добавлены store-level regression tests для remote merge и fallback.

### Verification
- Frontend tests: 40 passed.
- Frontend production build: passed.
- Backend tests: 22 passed, 2 skipped.
- Preview API health: 200.
- Bodyweight endpoint without auth: 401.
- Preview HTTPS/PWA smoke: passed.
- git diff --check: passed.

## [0.37.0] - 2026-08-27

### Added
- Проверен полноценный DB-backed preview через Compose profile .
- Startup migration автоматически создаёт  при включённом feature flag.
- Выполнен authenticated smoke .
- Подтверждены запись в PostgreSQL, upsert и Actor isolation.
- Временный DB-backed preview запускается отдельно от публичного preview и production.

### Verification
- PostgreSQL container healthcheck: passed.
- Authenticated bodyweight GET: 200.
- Authenticated bodyweight POST: 201.
- Database row persistence: passed.
- Backend tests: 22 passed, 2 skipped.
- Frontend tests: 38 passed.
- Frontend production build: passed.
- Public preview HTTPS smoke: passed.
- git diff --check: passed.

## [0.36.0] - 2026-08-27

### Added
- Добавлен opt-in Compose profile  с PostgreSQL 14 Alpine.
- Добавлен PostgreSQL healthcheck и отдельный named volume.
- API подключается к profile database только через явные  и .
- Обновлена документация обычного preview и database profile запуска.

### Safety
- Базовый compose запуск не требует database credentials и не стартует PostgreSQL profile.
- Production database, secrets и  не затрагивались.

### Verification
- Compose base config: passed.
- Compose profile config: passed.
- Backend tests: 22 passed, 2 skipped.
- Frontend tests: 38 passed.
- Frontend production build: passed.
- Preview API health: 200.
- Bodyweight endpoint without auth: 401.
- Preview HTTPS and PWA smoke: passed.
- git diff --check: passed.

## [0.35.0] - 2026-08-27

### Added
- Добавлен explicit feature flag  для включения PostgreSQL persistence.
- Добавлен startup migration hook, выполняющий миграцию только при явном включении флага.
- Compose получил безопасные переменные  и .
- Значение флага по умолчанию , поэтому существующий preview fallback не изменён.

### Verification
- Backend container tests: 22 passed, 2 skipped without TEST_DATABASE_URL.
- Frontend tests: 38 passed.
- Frontend production build: passed.
- Preview API health: 200.
- Bodyweight endpoint without auth: 401.
- Preview HTTPS and PWA smoke: passed.
- git diff --check: passed.

## [0.34.0] - 2026-08-27

### Added
- Добавлен explicit bodyweight migration runner.
- Добавлен реальный PostgreSQL integration test для migration, upsert и athlete isolation.
- Проверено ограничение веса на уровне PostgreSQL CHECK constraint.
- Исправлена нормализация PostgreSQL DATE в API repository.

### Verification
- Backend container tests: 22 passed, 2 skipped without TEST_DATABASE_URL.
- Real PostgreSQL bodyweight integration: 1 passed.
- Frontend tests: 38 passed.
- Frontend production build: passed.
- Bodyweight endpoint without auth: 401.
- Preview API health, HTTPS and PWA smoke: passed.
- git diff --check: passed.

## [0.33.0] - 2026-08-27

### Added
- Добавлен server-preferred merge для bodyweight измерений.
- Локальные offline-точки сохраняются, если их даты отсутствуют на сервере.
- При конфликте даты серверное значение считается authoritative.
- Добавлены тесты merge, remote load и offline save.
- Синхронизация не создаёт дубликаты по дате.

### Verification
- Frontend tests: 38 passed.
- Frontend production build: passed.
- Backend container tests: 22 passed, 1 skipped without TEST_DATABASE_URL.
- Bodyweight endpoint without auth: 401.
- Preview HTTPS and PWA smoke: passed.
- git diff --check: passed.

## [0.32.0] - 2026-08-27

### Added
- Добавлен frontend bodyweight sync adapter.
- Измерения загружаются через .
- Новые измерения отправляются через .
- При offline/API failure сохраняется локальный Athlete state без потери данных.
- Добавлены тесты server-success, offline fallback и Actor-scoped API boundary.

### Verification
- Backend container tests: 22 passed, 1 skipped without TEST_DATABASE_URL.
- Frontend tests: 37 passed.
- Frontend production build: passed.
- API bodyweight without auth: 401.
- Preview API health and HTTPS smoke: passed.
- git diff --check: passed.

## [0.31.0] - 2026-08-27

### Added
- Добавлена отдельная PostgreSQL schema .
- Добавлен Actor-scoped bodyweight repository с upsert по спортсмену и дате.
- Добавлены API routes .
- При отключённом feature flag сохраняется безопасный fallback через Athlete state.
- Добавлены проверки валидации и изоляции athlete parameters.

### Verification
- Backend container tests: 22 passed, 1 skipped without TEST_DATABASE_URL.
- Frontend tests: 35 passed.
- Frontend production build: passed.
- API health: 200.
- Bodyweight endpoint without auth: 401.
- Preview HTTPS and PWA resources: passed.
- git diff --check: passed.

## [0.30.0] - 2026-08-27

### Added
- Добавлена bodyweight analytics model с периодной фильтрацией.
- Добавлена SVG polyline-визуализация динамики веса без новых зависимостей.
- Stats показывает последний вес, изменение, среднее и диапазон дат.
- Сохранён lazy каталог упражнений и единый PWA стиль.

### Verification
- Frontend tests: 35 passed.
- Frontend production build: passed.
- Backend container tests: 20 passed, 1 skipped without TEST_DATABASE_URL.
- Preview API health: 200.
- Preview HTTPS and PWA manifest: passed.
- git diff --check: passed.

## [0.29.0] - 2026-08-27

### Added
- Добавлена Athlete bodyweight model с нормализацией и безопасной валидацией.
- Добавлен журнал измерений веса тела в настройках спортсмена.
- Повторная запись за ту же дату обновляет измерение без дублей.
- Список измерений сортируется по дате и показывает последние значения.
- Сохранение использует существующий Actor-scoped Athlete state API.
- Статистика веса тела продолжает использовать общий нормализованный формат.

### Verification
- Frontend tests: 33 passed.
- Frontend production build: passed.
- Backend container tests: 20 passed, 1 skipped without TEST_DATABASE_URL.
- Preview API health: 200.
- Preview HTTPS and PWA resources: passed.
- git diff --check: passed.

## [0.28.0] - 2026-08-27

### Added
- Завершён перенос Athlete Exercise Detail в отдельный компонент.
- Добавлен lazy loader инструкций с отменой обновления после размонтирования.
- Добавлены безопасные media URL, lazy GIF loading и accessibility подписи.
- Пользовательские упражнения изолированы от каталога GIF и инструкций.

### Verification
- Frontend tests: 30 passed.
- Frontend production build: passed.
- Backend container tests: 20 passed, 1 skipped без TEST_DATABASE_URL.
- Preview API health: 200.
- Preview HTTPS, manifest и favicon: 200.
- git diff --check: passed.

## [0.27.0] - 2026-08-27

### Added
- Вынесен Athlete Exercise Detail в отдельный модуль.
- Инструкции упражнений загружаются лениво только при открытии detail.
- GIF/media URL нормализуются и безопасно кодируются.
- Добавлены accessibility labels, lazy loading и понятные loading/error states.
- Пользовательские упражнения не получают GIF и не используют каталог инструкций.

### Verification
- Frontend tests: 30 passed.
- Frontend production build: passed.
- Backend container tests: 20 passed, 1 skipped without TEST_DATABASE_URL.
- Preview container smoke: API 200, frontend HTTPS 200.
- PWA manifest and favicon: 200.
- git diff --check: passed.

## [0.26.0] - 2026-08-27

### Added
- Подготовлен отдельный preview deployment для `/opt/opengym-next`.
- Добавлены PWA-ресурсы `manifest.webmanifest` и `favicon.svg`.
- Preview опубликован на `https://gym4me.trfnv.ru` через отдельный loopback frontend port `3381`.
- API preview работает на loopback port `3311` и не использует production `/opt/opengym`.

### Operations and security
- Используется отдельный Compose project `gym4me-preview` и отдельный named volume.
- Production ports, production database и production secrets не подключались.
- HTTP перенаправляется на HTTPS; сертификат Let's Encrypt выпущен для `gym4me.trfnv.ru`.

### Verification
- Backend container tests: 20 passed, 1 skipped without `TEST_DATABASE_URL`.
- Frontend tests: 27 passed.
- Frontend production build: passed.
- API health: 200.
- Public frontend, manifest and favicon over HTTPS: 200.
- `git diff --check`: passed.

# Changelog

Все заметные изменения проекта фиксируются здесь. Версии используют [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

## [0.25.0] - 2026-08-27

### Added
- Добавлен Athlete history write-through adapter.
- Завершённая тренировка отправляется через `POST /api/v1/athlete/history`.
- Workout id используется как idempotency key на PostgreSQL repository.
- При offline/API ошибке локальная история сохраняется в Athlete state.
- Добавлен merge helper для локальной и серверной истории.
- Добавлены contract tests success/failure/merge сценариев.

### Compatibility and security
- Сохранены `gymsid`, passkey, Actor policy и единый PWA shell.
- Workout history не отправляется от имени другого athlete.
- Credentials и auth secrets не попадают в history payload.
- Production `/opt/opengym` и production database не изменялись.

### Verification
- Backend tests: 21 total, 20 passed, 1 skipped without TEST_DATABASE_URL.
- Frontend tests: 27 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.24.0] - 2026-08-27

### Added
- Добавлены Athlete History API routes: `GET/POST /api/v1/athlete/history`.
- History routes используют Actor-scoped service и optional PostgreSQL repository.
- При недоступной БД frontend показывает локальную Athlete history без падения интерфейса.
- Добавлены HTTP auth tests для history endpoints.
- Новый API composition остаётся Node-only и testable через `createServer()`.

### Security and compatibility
- Все history операции привязаны к текущему `gymsid` Actor.
- Неавторизованные запросы получают `401`.
- Production database и `/opt/opengym` не затрагивались.
- Passkey, legacy cookies и PWA shell сохранены.

### Verification
- Backend tests: 20 passed, 1 skipped without TEST_DATABASE_URL.
- Frontend tests: 24 passed, 0 failed.
- Frontend production build: passed.
- Container API image build: passed.
- Container API tests: passed.
- Container smoke: API 200, frontend 200.
- `git diff --check`: passed.

## [0.23.0] - 2026-08-27

### Added
- Добавлен реальный PostgreSQL integration test для `athlete_workout_history`.
- Проверены migration, INSERT, SELECT, `ON CONFLICT` upsert и изоляция двух спортсменов.
- Добавлены API history service tests для Actor scoping и database-unavailable fallback.
- Docker API image исправлен для запуска всех contract tests внутри собранного образа.
- Compose/API smoke проверены на loopback-портах без production deployment.

### Security and safety
- Integration test использует временный PostgreSQL container и удаляет тестовую таблицу после выполнения.
- Production PostgreSQL, secrets и `/opt/opengym` не затрагиваются.
- Новый history adapter не подключается автоматически к production.

### Verification
- Real PostgreSQL integration test: 1 passed, 0 failed.
- Backend tests: 19 passed, 1 skipped without TEST_DATABASE_URL.
- Frontend tests: 24 passed, 0 failed.
- Frontend production build: passed.
- API image build: passed.
- Container API tests: 20 tests, 19 passed, 1 skipped.
- `git diff --check`: passed.

## [0.22.0] - 2026-08-27

### Added
- Добавлена PostgreSQL schema `athlete_workout_history`.
- Добавлены индексы по athlete и workout date.
- Добавлен Node `pg` pool factory через `DATABASE_URL`.
- Добавлена idempotent history repository с `ON CONFLICT`.
- Добавлен migration helper для новой таблицы.
- Добавлен Athlete History service с безопасным file-state fallback.
- Добавлены backend contract tests для athlete scoping и database unavailable behavior.

### Safety
- PostgreSQL adapter пока не подключён к production database автоматически.
- При отсутствии `DATABASE_URL` repository не пытается писать в БД.
- Fallback read ограничен текущим Actor и не смешивает пользователей.
- Passkey/gymsid authentication не изменялись.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 19 passed, 0 failed.
- Frontend tests: 24 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

### Limitation
- Полное подключение history API к runtime будет отдельным этапом после настройки миграции и проверки PostgreSQL-контейнера.

## [0.21.0] - 2026-08-27

### Added
- Добавлены отдельные Dockerfiles для Node API и React/Vite frontend.
- Добавлен `docker-compose.next.yml` для параллельного запуска `gym4me`.
- По умолчанию используются только loopback-порты `3310` и `3380`.
- Athlete runtime data хранится в отдельном named volume.
- Production data, secrets и PostgreSQL не монтируются в новый compose.
- Добавлен `.dockerignore` и документация `docs/DOCKER.md`.

### Fixes
- Исправлен API Docker layout: тесты и исходники теперь доступны по одинаковым путям внутри образа.
- API listener запускается явным `GYM4ME_START_SERVER=1`.

### Security
- Production `/opt/opengym` не затрагивается.
- Runtime `SESSION_SECRET` передаётся только environment variable.
- Compose не публикует сервисы наружу по умолчанию.

### Verification
- API image build: passed.
- Frontend image build: passed.
- Container backend tests: 15 passed, 0 failed.
- Container API smoke: `/api/health` 200.
- Container frontend smoke: HTTP 200.
- Frontend tests: 24 passed, 0 failed.
- `git diff --check`: passed.

### Limitation
- NPM сообщает 2 зависимости frontend с audit warnings; автоматический `npm audit fix` не выполнялся, чтобы не менять lockfile без отдельного dependency-review.

## [0.20.0] - 2026-08-27

### Added
- Добавлен HTTP smoke-test нового Athlete API.
- `/api/health` проверяется как публичный endpoint.
- Athlete endpoints проверяются на обязательную авторизацию и корректный `401`.
- API получил `createServer()` factory, чтобы тесты не связывали production-порт при импорте.
- Запуск listener теперь выполняется только через явный `GYM4ME_START_SERVER=1`.

### Compatibility and security
- Legacy `gymsid`, Actor resolver и passkey contract сохранены.
- HTTP smoke flow не использует production secrets и production database.
- Production `/opt/opengym` не запускался и не изменялся.

### Verification
- HTTP/API backend tests: 15 passed, 0 failed.
- Frontend tests: 24 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.19.0] - 2026-08-27

### Added
- Добавлен Athlete activity DTO/adapter на Node API.
- Добавлен endpoint `POST /api/v1/athlete/activity`.
- Добавлено bounded presence repository с изоляцией по athlete id.
- Добавлен frontend heartbeat при активной тренировке.
- Добавлена очистка presence при завершении или уходе со страницы.
- В heartbeat передаются только имя тренировки и агрегированный прогресс.

### Security and compatibility
- Credentials, passkey, полный Athlete state и секреты не входят в activity payload.
- Endpoint использует legacy `gymsid` Actor authentication.
- Trainer/Gym domains не получают доступ к Athlete internals.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 14 passed, 0 failed.
- Frontend tests: 24 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.18.0] - 2026-08-27

### Added
- Добавлен Athlete RestTimer UI поверх Workout active state.
- Добавлен countdown с форматированием `mm:ss`.
- Добавлен skip rest action.
- Rest deadline сохраняется в active workout при переходах UI.
- Workout UI показывает прогресс и таймер тренировки.
- Добавлены deterministic timer helpers и regression tests.

### Compatibility and security
- Сохранён исходный Node.js/React/Vite/Zustand стек.
- Passkey, `gymsid`, Athlete API и PWA shell не изменялись.
- Timer state не содержит credentials или cross-user data.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 24 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.17.0] - 2026-08-27

### Added
- Stats расширен фильтрацией по периодам 7/30/90 дней и «всё время».
- Добавлены bodyweight analytics: first/latest/delta/average.
- Добавлен volume series по тренировкам.
- Добавлены периодические exercise metrics и streak days.
- Stats UI получил карточки веса тела, объёма, подходов и активных дней.
- Сохранён единый Athlete PWA style и ownership границы.

### Compatibility and security
- Метрики строятся только из Athlete-owned state.
- Trainer/Gym данные и auth/passkey не подключаются к Stats store.
- Сохранены Node.js/React/Vite/Zustand, `gymsid` и PWA shell.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 23 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.16.0] - 2026-08-27

### Added
- Перенесён полный legacy exercise catalog в отдельный Athlete asset.
- Перенесено 1324 упражнения и русский dictionary из legacy.
- Каталог загружается отдельным динамическим import и не входит в initial module.
- Сохранён перевод `0027` как «Тяга штанги в наклоне».
- Русские названия нормализуются с корректной заглавной буквы.
- Сохранена изоляция custom exercises конкретного спортсмена.
- Добавлены тесты размера полного каталога, перевода и customEx isolation.

### Performance
- Initial Athlete bundle не загружает полный ~937 KB catalog.
- GIF и инструкции по-прежнему загружаются только в detail flow.

### Compatibility and security
- Сохранены Node.js/React/Vite/Zustand, passkey, `gymsid` и PWA shell.
- Данные каталога read-only; пользовательский контент не смешивается с глобальным catalog.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 22 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.15.0] - 2026-08-27

### Added
- Перенесён Athlete Notifications module.
- Добавлена нормализация legacy notification DTO.
- Добавлен unread/read state и счётчик непрочитанных уведомлений.
- Добавлена автоматическая отметка уведомлений прочитанными при открытии раздела.
- Добавлена безопасная внутренняя навигация из notification payload.
- Добавлены уведомления о push, баллах, наградах и записях в едином списке.
- Notifications подключены к Athlete PWA navigation.

### Security and compatibility
- Внешние URL из payload блокируются; разрешены только внутренние пути приложения.
- Passkey, `gymsid`, Athlete API, Web Push и PWA shell не изменялись.
- Trainer/Gym notification data не смешиваются с Athlete state.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 20 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.14.0] - 2026-08-27

### Added
- Перенесён Athlete Stats module на основе завершённых workout history entries.
- Добавлены агрегаты тренировок, подходов, объёма и активных дней.
- Добавлена статистика по каждому упражнению и максимальному весу.
- Добавлен расчёт последовательных дней тренировок.
- Stats подключён к единому Athlete PWA navigation.

### Architecture
- Stats model отделён от UI и не зависит от Trainer/Gym domains.
- History и Stats используют только Athlete-owned state.
- UI не получает passkey, session data или внутренние auth-поля.

### Compatibility
- Сохранены Node.js/React/Vite/Zustand стек, `gymsid`, passkey и PWA shell.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 18 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

### Limitations
- Расширенные legacy-графики, muscle balance, RIR/RPE и bodyweight charts будут переноситься отдельными Stats-срезами.

## [0.13.0] - 2026-08-27

### Added
- Перенесён Athlete History module в новую модульную структуру.
- Добавлена нормализация legacy workout entries.
- Добавлена обратная хронологическая выдача тренировок.
- Добавлена фильтрация истории по названию и дате.
- Добавлен detail view с выполненными подходами.
- История подключена к Athlete state/API через единый PWA shell.

### Architecture
- History model отделён от UI.
- Незавершённые подходы не отображаются как завершённые.
- Модуль не зависит от Trainer/Gym domains.

### Compatibility and security
- Сохранены Node.js/React/Vite, `gymsid`, passkey и Athlete store.
- История не содержит credentials или служебных auth-полей.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 17 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.12.0] - 2026-08-27

### Added
- Подключён Athlete Workout UI к новому модульному frontend.
- Добавлен запуск тренировки из routine и freestyle режима.
- Добавлено отображение активной тренировки, прогресса и elapsed time.
- Добавлено переключение выполненных подходов.
- Добавлено завершение тренировки с записью в Athlete history.
- Добавлен безопасный discard активной тренировки.
- Plan, Library и Workout теперь доступны из единого Athlete PWA shell.

### Architecture
- UI использует Workout model, builder, logging и timer helpers.
- Workout остаётся изолированным Athlete domain и не импортирует Trainer/Gym state.
- History формируется через отдельный serializer.

### Compatibility and security
- Сохраняются Node.js/React/Vite стек, `gymsid`, passkey и Athlete API.
- Состояние изменяется только через текущий Athlete store/API.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 15 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

### Limitations
- Activity heartbeat, server-side history adapter, полноценный rest timer UI и progression UI будут подключены отдельными срезами.

## [0.11.0] - 2026-08-27

### Added
- Добавлен изолированный Workout timer module.
- Добавлены deterministic elapsed/rest deadline helpers.
- Добавлен timed set result helper.
- Добавлен activity heartbeat payload builder для будущего API adapter.
- Таймеры не зависят от Trainer/Gym domains и внешних библиотек.

### Compatibility and security
- Сохранены Node.js/React/Vite стек, passkey, `gymsid`, Athlete API и PWA shell.
- Activity payload не содержит credentials или приватные поля спортсмена.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 15 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

### Next
- Следующий срез подключит Workout UI к active state и Plan.

## [0.10.0] - 2026-08-27

### Added
- Добавлен Workout logging слой для режима `reps`.
- Добавлена валидация веса и повторений.
- Добавлена поддержка логирования timed sets.
- Добавлена поддержка cardio sets с длительностью и скоростью.
- Добавлены progress helpers: total, done и percent.
- Добавлена сериализация завершённых подходов в history entry.
- Незавершённые и служебные поля не попадают в history output.

### Architecture
- Logging helpers отделены от Workout UI и store.
- Все изменения выполняются внутри Athlete Workout domain.
- Trainer/Gym domains не получают прямой доступ к workout internals.

### Security and compatibility
- Неактивная тренировка не принимает новые записи.
- Невалидные значения веса, повторений, времени и cardio отклоняются.
- Passkey, `gymsid`, Athlete API и PWA shell не изменялись.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 13 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.9.0] - 2026-08-27

### Added
- Добавлен Athlete Workout builder для запуска тренировки из routine.
- Добавлен freestyle workout без обязательной программы.
- Добавлено построение sets для режимов reps, time и cardio.
- Добавлено безопасное добавление упражнения только в активную тренировку.
- Сохранён legacy-compatible формат `active` с `routineId`, `entries`, `cur` и `start`.

### Architecture
- Builder отделён от UI и state store.
- Workout creation не зависит от Trainer/Gym domains.
- Все проверки активного статуса выполняются внутри Workout module.

### Compatibility and security
- Passkey, `gymsid`, Athlete API и PWA shell не изменялись.
- Неактивная или завершённая тренировка не принимает новые упражнения.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 11 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.8.0] - 2026-08-27

### Added
- Добавлен изолированный Athlete Workout model/state machine.
- Поддержаны режимы `reps`, `time` и `cardio`.
- Добавлены статусы `idle`, `active`, `completed`, `discarded`.
- Добавлены нормализация workout entries, подсчёт подходов и completed sets.
- Добавлены безопасные переходы finish/discard и запрет изменения завершённой тренировки.
- Добавлено переключение done для подходов только активной тренировки.

### Architecture
- Workout module находится в `frontend/src/domains/athlete/workout`.
- Модель не импортирует Trainer/Gym state и не зависит от legacy store.
- Публичные функции отделены от UI и пригодны для последующего backend adapter.

### Compatibility and security
- Existing passkey, `gymsid`, Athlete API и PWA shell не изменялись.
- Данные workout остаются внутри текущего Athlete state.
- Нельзя завершить пустую тренировку или изменить неактивную.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 9 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

### Next
- Следующий срез подключит создание Workout из Plan и реальный logging подходов.

## [0.7.0] - 2026-08-27

### Added
- Перенесён изолированный Athlete Exercise Library module.
- Добавлен поиск по названию, группе мышц и оборудованию.
- Добавлены русские названия упражнений, включая «Тяга штанги в наклоне».
- Добавлена поддержка пользовательских `customEx` только в состоянии текущего спортсмена.
- Добавлен detail view упражнения.
- GIF-инструкция загружается только после открытия карточки и использует `loading=lazy`.
- Текстовые инструкции загружаются через отдельный lazy loader.

### Compatibility and security
- Library не импортирует Trainer/Gym domains.
- Passkey, `gymsid`, Zustand Athlete store и API boundary сохранены.
- Custom exercises не попадают в глобальный каталог.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 6 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

### Limitations
- Каталог в новом проекте пока содержит минимальный переносимый набор упражнений; полный legacy dataset переносится отдельным data-slice, чтобы не увеличивать initial bundle.

## [0.6.0] - 2026-08-27

### Added
- Перенесён первый рабочий Athlete Plan module в `frontend/src/domains/athlete/plan`.
- Добавлено недельное расписание с семью днями и состояниями тренировка/отдых.
- Добавлено отображение пользовательских routines и количества упражнений.
- Добавлены создание routine и starter Push/Pull/Legs plan через Athlete state API.
- Plan работает через Zustand Athlete store, не импортирует Trainer/Gym state или legacy store.
- Добавлены модель Plan, view-model helpers и contract tests.

### UI
- Сохранён единый PWA shell и мобильный tabbar.
- Сохранены safe-area, dark surface, accent и reduced-motion правила.
- UI остаётся в русском языке текущего Athlete-контра.

### Compatibility and security
- Passkey, `gymsid`, legacy adapter и backend auth не изменялись.
- Plan изменяет только состояние текущего спортсмена через `/api/v1/athlete/state`.
- Чужие routines и state недоступны через Athlete policy.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend tests: 6 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

### Limitations
- Редактор отдельных упражнений, GIF-инструкции, переводы названий, Workout, Stats, History, Library и Notifications переносятся следующими Ralph-срезами.

## [0.5.0] - 2026-08-27

### Added
- Athlete frontend подключён к `/api/v1/athlete/state` через общий fetch API client.
- Добавлен Zustand store спортсмена с безопасными defaults, загрузкой, сохранением и состоянием ошибок.
- Настройки единиц веса, темы, языка, звуков и удержания экрана теперь сохраняются через Athlete API.
- Сохранены единый `PwaShell`, общие PWA-токены и athlete-only границы состояния.
- Добавлены contract tests для загрузки, сохранения и offline/error-сценария.

### Security and compatibility
- API requests используют `credentials: include`, поэтому legacy `gymsid` и passkey flow не заменяются.
- Frontend не хранит passkey, session secret или чужой athlete state.
- Trainer/Gym domains не получают доступа к Athlete store.
- Production `/opt/opengym` не изменялся.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend Vitest: 4 passed, 0 failed.
- Frontend production build: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

### Limitations
- Реальные legacy-экраны Plan, Workout, Stats, History, Library и Notifications ещё переносятся отдельными срезами; пока они показывают migration placeholder.

## [0.4.2] - 2026-08-27

### Maintenance
- Синхронизирована версия frontend `package-lock.json` с канонической версией проекта.
- Устранены остаточные незакоммиченные изменения после установки зависимостей quality-gate.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend build: passed.
- Frontend Vitest: 1 passed, 0 failed.
- Release verification: passed.
- Node syntax check: passed.
- `git diff --check`: passed.

## [0.4.1] - 2026-08-27

### Process and stack
- Уточнено, что Python, pip и pytest не входят в исходный код, runtime, сборку, тесты или миграции `gym4me`.
- Quality-gate усилен проверкой отсутствия Python-проектных файлов в Git.
- Сохранён исходный стек Node.js 22 + React 19 + Vite 8 + PostgreSQL + WebAuthn/Web Push + Capacitor.
- Служебные Python-команды, использованные только для передачи файлов на сервер, не являются частью репозитория и не требуются разработчикам проекта.

### Verification
- Backend tests: 12 passed, 0 failed.
- Frontend build: passed.
- Frontend Vitest: 1 passed, 0 failed.
- Node syntax check: passed.
- Release verification: passed.
- `git diff --check`: passed.

### Compatibility
- Production `/opt/opengym` не изменялся.
- Passkey, `gymsid`, legacy adapter и PWA-контракты не изменялись.

## [0.4.0] - 2026-08-27

### Added
- Первый Athlete frontend vertical slice на React/Vite.
- Единый `PwaShell` для мобильного PWA-интерфейса.
- Athlete-разделы: Главная, План, Тренировка, Статистика, История, Библиотека, Настройки и Уведомления.
- Athlete-only настройки единиц веса, звука, удержания экрана, темы и языка.
- Единые safe-area, цвета, surface, tabbar и reduced-motion правила.
- Frontend smoke test навигационного контракта.

### Compatibility
- Backend, passkey и legacy authentication не изменялись.
- Trainer/Gym UI не подключается к Athlete frontend state.
- Production `/opt/opengym` не изменялся.

### Verification
- Frontend production build: passed.
- Frontend Vitest: 1 passed, 0 failed.
- Backend regression suite до изменений: 12 passed, 0 failed.
- Release/version verification: passed.
- `git diff --check`: passed.

### Limitations
- Разделы кроме Главной и Настроек пока отображают migration placeholder; перенос их legacy-логики выполняется отдельными Ralph-срезами.

## [0.3.1] - 2026-08-27

### Added
- Исполняемый quality-gate для последовательности release-проверок.
- Корневые `npm test`, `npm run build` и `npm run verify`.
- Backend `npm test` и syntax check на Node.js.
- Проверка совпадения версий `VERSION` и package metadata.
- Проверка наличия текущей версии в changelog.
- Проверка, что runtime secrets/data не отслеживаются Git.

### Verification
- Backend contract tests: 12 passed, 0 failed.
- Release verification: passed.
- `node --check api/src/main.js`: passed.
- Frontend build не запускался: зависимости нового frontend пока не установлены в `/opt/opengym-next`; это отдельный следующий этап.

### Process
- Commit запрещён при падении build, tests, diff check или version verification.

## [0.3.0] - 2026-08-27

### Added
- Изолированный repository состояния спортсмена с атомарной записью и безопасными именами файлов.
- Athlete API boundary: `/api/v1/athlete/me`, `/api/v1/athlete/state`.
- Legacy adapter профиля спортсмена без передачи passkey и секретных полей.
- Runtime-конфигурация и единый health endpoint нового API.
- Контрактные и security-тесты Athlete domain.

### Security
- Состояние спортсменов разделено по `athleteId`.
- Неизвестные поля состояния отбрасываются.
- Секреты и credentials не входят в DTO.
- Сессия `gymsid` преобразуется в Actor через legacy adapter.

### Compatibility
- Production `/opt/opengym` не изменялся.
- Существующая passkey/WebAuthn авторизация не заменяется.

## [0.2.0] - 2026-08-27

### Added
- Athlete domain foundation и общая PWA design system.
- Контракты Actor, passkey, сессий и legacy authentication adapter.
- Node.js + React + Vite + PostgreSQL стек зафиксирован как обязательный.

## [0.1.0] - 2026-08-27

### Added
- Модульный монолитный каркас Gym, Trainer, Athlete, Bookings, Loyalty, Notifications, Analytics и Integrations.
- API/frontend boundary contracts и правила изоляции сбоев.
