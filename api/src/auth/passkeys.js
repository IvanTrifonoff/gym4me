export function passkeyCredentialDto(credential) {
  return {
    id: credential.id,
    publicKey: credential.publicKey,
    counter: Number(credential.counter || 0),
    transports: Array.isArray(credential.transports) ? [...credential.transports] : []
  };
}

export function authenticationPolicy({ rpId, origin }) {
  if (!rpId || !origin) throw new Error('WebAuthn RP_ID and ORIGIN are required');
  return {
    rpID: rpId,
    expectedOrigin: origin,
    userVerification: 'preferred',
    requireUserVerification: false
  };
}

export function nextCounter(current, incoming) {
  const oldValue = Number(current || 0);
  const nextValue = Number(incoming);
  if (!Number.isInteger(nextValue) || nextValue < 0) throw new Error('invalid authenticator counter');
  if (oldValue > 0 && nextValue <= oldValue) throw new Error('possible authenticator clone');
  return nextValue;
}
