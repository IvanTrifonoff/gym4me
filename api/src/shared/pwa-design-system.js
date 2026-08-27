export const PWA_DESIGN_TOKENS = Object.freeze({
  maxContentWidth: '560px',
  safeAreaTop: 'env(safe-area-inset-top, 0px)',
  safeAreaBottom: 'env(safe-area-inset-bottom, 0px)',
  radius: { sm: '8px', md: '12px', lg: '16px', card: '14px' },
  motion: { fast: '140ms', medium: '220ms', easing: 'cubic-bezier(.32,.72,0,1)' },
  surfaces: ['bg', 'bg-el', 'surface', 'surface-2', 'surface-3'],
  typography: ['large', 'title', 'title2', 'head', 'body', 'callout', 'sub', 'foot', 'cap'],
  requiredShellParts: ['safe-area', 'content', 'tabbar', 'modal-root', 'toast']
});

export function validatePwaShell(shell) {
  return PWA_DESIGN_TOKENS.requiredShellParts.every(part => shell?.includes(part));
}
