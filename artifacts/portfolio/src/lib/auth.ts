const HASH_KEY = 'portfolio_admin_hash';
const SESSION_KEY = 'portfolio_admin_session';
const DEFAULT_PASSWORD = 'portfolio2026';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function initAdminPassword(): Promise<void> {
  if (!localStorage.getItem(HASH_KEY)) {
    const hash = await sha256(DEFAULT_PASSWORD);
    localStorage.setItem(HASH_KEY, hash);
  }
}

export async function verifyPassword(password: string): Promise<boolean> {
  const storedHash = localStorage.getItem(HASH_KEY);
  if (!storedHash) {
    await initAdminPassword();
    const defaultHash = await sha256(DEFAULT_PASSWORD);
    const inputHash = await sha256(password);
    return inputHash === defaultHash;
  }
  const inputHash = await sha256(password);
  return inputHash === storedHash;
}

export async function changePassword(newPassword: string): Promise<void> {
  const hash = await sha256(newPassword);
  localStorage.setItem(HASH_KEY, hash);
}

export function setAdminSession(): void {
  sessionStorage.setItem(SESSION_KEY, 'true');
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}
