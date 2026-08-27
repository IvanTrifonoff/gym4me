# Contributing

## Versioning and changelog

Проект использует Semantic Versioning:

- `PATCH` — исправления без изменения публичного контракта;
- `MINOR` — обратно совместимые новые возможности;
- `MAJOR` — несовместимые изменения API, данных или авторизации.

Перед каждым commit необходимо:

1. выбрать версию по SemVer;
2. обновить `VERSION`;
3. добавить запись в `CHANGELOG.md` с датой, причиной, файлами, контрактами, security, совместимостью и тестами;
4. выполнить `git diff --check` и релевантные тесты;
5. включить changelog в тот же commit.

`VERSION` — каноническая версия модульного монолита. Версии frontend и API должны совпадать.

## Ralph cycle

`plan → implement → test → review → update VERSION/CHANGELOG → commit → push → verify`.

Не коммитить runtime data, credentials, cookies, VAPID private keys или production secrets.
