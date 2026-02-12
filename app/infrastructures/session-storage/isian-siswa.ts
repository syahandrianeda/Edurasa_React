const KEY = "isiansiswa";

export function saveIsianSiswa(user: any) {
  window.localStorage.setItem(KEY, JSON.stringify(user));
}

export function getIsianSiswa() {
  const data = window.localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function clearIsianSiswa() {
  window.localStorage.removeItem(KEY);
}
