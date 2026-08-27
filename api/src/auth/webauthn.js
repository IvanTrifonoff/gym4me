// WebAuthn boundary. Domain modules depend on this interface, not on browser payload details.
// The implementation uses @simplewebauthn/server, the same library as legacy openGym.
export function registrationPolicy({ rpName, rpId }) {
  if (!rpName || !rpId) throw new Error('WebAuthn RP_NAME and RP_ID are required');
  return {
    rpName,
    rpID: rpId,
    attestationType: 'none',
    authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' }
  };
}

export function authenticationPolicy({ rpId, origin }) {
  if (!rpId || !origin) throw new Error('WebAuthn RP_ID and ORIGIN are required');
  return { rpID: rpId, expectedOrigin: origin, userVerification: 'preferred', requireUserVerification: false };
}

export function credentialDto(credential) {
  return {
    id: credential.id,
    publicKey: credential.publicKey,
    counter: Number(credential.counter || 0),
    transports: Array.isArray(credential.transports) ? [...credential.transports] : []
  };
}

export function nextCounter(current, incoming) {
  const oldValue = Number(current || 0);
  const nextValue = Number(incoming);
  if (!Number.isInteger(nextValue) || nextValue < 0) throw new Error('invalid authenticator counter');
  if (oldValue > 0 && nextValue <= oldValue) throw new Error('possible authenticator clone');
  return nextValue;
}
