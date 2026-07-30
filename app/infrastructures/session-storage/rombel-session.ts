const KEY = "rombel";

export function saveSessionRombel(user: any) {
  window.localStorage.setItem(KEY, JSON.stringify(user));
}

export function getSessionRombel() {
  const data = window.localStorage?.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function clearSessionRombel() {
  window.localStorage.removeItem(KEY);
}
