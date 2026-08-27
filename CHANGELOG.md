# Changelog

Все заметные изменения проекта фиксируются здесь. Версии используют [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

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
