# Changelog

Все заметные изменения проекта фиксируются здесь. Версии используют [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

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
