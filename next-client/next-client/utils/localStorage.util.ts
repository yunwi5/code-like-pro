import { IJwtData, IUser } from '../models/interfaces';

export function saveToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const jsonValue = localStorage.getItem(key);
    if (!jsonValue) return null;

    // JS can raise an error if the jsonValue is invalid to be parsed.
    return JSON.parse(jsonValue || '');
  } catch (err) {
    return null;
  }
}

// JWT specific local storage
const JWT_KEY = 'jwt-key';

export function saveJwtUserLocally(jwtToken: string, user: IUser) {
  saveToLocalStorage<IJwtData>(JWT_KEY, { access_token: jwtToken, user });
}

export function getJwtUserLocally(): IJwtData | null {
  return getFromLocalStorage<IJwtData>(JWT_KEY);
}

export function clearJwtUserLocally() {
  localStorage.removeItem(JWT_KEY);
}
