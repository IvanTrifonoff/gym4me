# Athlete migration Ralph cycle

## Loop contract

For every slice:

1. Read legacy behavior and list invariants.
2. Define a domain-owned interface and DTO.
3. Implement behind the interface using the existing Node/React/Vite/Zustand stack.
4. Add unit, contract, security, and regression tests.
5. Run syntax checks and relevant tests.
6. Review diff for secrets, cross-domain imports, and behavior changes.
7. Commit one focused change to  and push it.
8. Record result and begin the next slice.

## Athlete slices

### A1 Identity and sessions
- Preserve WebAuthn passkeys, , session expiry, version revocation.
- Done when legacy session adapter and tests pass.

### A2 Profile and state storage
- Preserve all athlete-only settings and state fields.
- Done when DTO filters unknown fields and state is isolated by athlete ID.

### A3 Athlete API
- Add ,  read/write.
- Legacy  and  remain untouched adapters.

### A4 Athlete PWA shell
- Migrate routes and shared shell without changing visual tokens or safe-area behavior.

### A5 Training modules
- Move plan, workout, history, stats, library, custom exercises.

### A6 Notifications and push
- Athlete notification center, subscription, badge, and service worker remain compatible.

### A7 Cutover verification
- Compare legacy and new behavior, test account isolation, passkeys, and offline/local state.

## Stop conditions

Never switch production traffic until all slices pass tests and a rollback path exists. Never copy production secrets or runtime data into the repository.
