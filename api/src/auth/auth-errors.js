export const AUTH_ERRORS = Object.freeze({
  UNAUTHENTICATED: 'unauthenticated',
  FORBIDDEN: 'forbidden',
  SESSION_EXPIRED: 'session_expired',
  PASSKEY_UNKNOWN: 'passkey_unknown',
  WEBAUTHN_FAILED: 'webauthn_failed'
});

export function authError(code, message = code) {
  return Object.assign(new Error(message), { code, status: code === AUTH_ERRORS.FORBIDDEN ? 403 : 401 });
}
