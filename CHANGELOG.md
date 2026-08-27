# Changelog

Все заметные изменения проекта фиксируются здесь. Версии используют [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

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
