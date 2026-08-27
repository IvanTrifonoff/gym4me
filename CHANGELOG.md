# Changelog

Все заметные изменения проекта фиксируются здесь. Версии используют [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

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
