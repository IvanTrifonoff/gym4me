# Authentication contract v1

## Production compatibility

The legacy application uses:

- `gymsid` for athlete sessions;
- `adminsid` for staff/admin sessions;
- HMAC-SHA256 signed cookies;
- WebAuthn passkeys through `@simplewebauthn/server`;
- RP ID and origin from environment (`RP_ID`, `ORIGIN`).

The legacy athlete payload is `<userId>:<expiry>:<sessionVersion>.<hmac>`. The new auth boundary parses this format through `legacy-adapter.js` while the new Actor format is introduced separately.

## Rules

1. Passkey credentials remain server-side.
2. Private keys, session secrets and production dumps never enter Git.
3. Every request resolves to an explicit Actor.
4. Athlete state is accessible only to the same athlete actor or a policy-approved trainer DTO.
5. `logout all` and session versions remain supported.
6. RP ID/origin are configuration, never hardcoded in domain code.
7. Legacy cookies remain valid until the cutover is explicitly completed.
