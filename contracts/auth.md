# Authentication contract v1

## Existing production compatibility

The legacy application uses:

- `gymsid` for athlete sessions;
- `adminsid` for staff/admin sessions;
- signed HMAC-SHA256 cookies;
- WebAuthn passkeys;
- RP ID `gym.trfnv.ru` and origin `https://gym.trfnv.ru`.

The new project must not copy production secrets. It receives a secret through environment/secret storage and uses a legacy adapter only during migration.

## Rules

1. Passkey credentials remain server-side; the browser stores only the authenticator credential.
2. Private keys, raw session secrets and production database dumps never enter Git.
3. Every session resolves to an explicit `Actor`.
4. Athlete state is accessible only to the same athlete actor or a policy-approved trainer DTO.
5. Session version/revocation remains supported through `logout all`.
6. RP ID and origin are configuration, never hardcoded in domain code.
7. Migration must preserve old cookies until the cutover is explicitly completed.

## Actor shape

```json
{
  "type": "athlete",
  "id": "athlete_01"
}
```

Staff actor:

```json
{
  "type": "staff",
  "id": "trainer_01",
  "role": "trainer",
  "organizationId": "gym_01",
  "branchIds": ["branch_01"]
}
```
