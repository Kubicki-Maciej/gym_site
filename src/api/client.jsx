import { API_URL } from "../config";

const ACCESS_TOKEN = "token";
const REFRESH_TOKEN = "refresh";

async function request(method, path, body, isRetry = false) {
  let token = localStorage.getItem(ACCESS_TOKEN);

  let requestHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let res = await fetch(`${API_URL}${path}`, {
    method,
    headers: requestHeaders,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && !isRetry) {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (!refreshToken) {
        // Brak refresh tokenu, trzeba się zalogować ponownie
        throw new Error("No refresh token available");
      }
      // 1. Próba odświeżenia tokenu w Django
      const refreshRes = await fetch(`${API_URL}api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshRes.ok) {
        throw new Error("Refresh token expired");
      }

      const data = await refreshRes.json();

      // 2. Zapisz nowy access token
      localStorage.setItem(ACCESS_TOKEN, data.access);

      // Opcjonalnie: SimpleJWT może rotować też refresh tokenem, wtedy zapisz też nowy refresh
      if (data.refresh) {
        localStorage.setItem(REFRESH_TOKEN, data.refresh);
      }

      // 3. Ponów PIERWOTNE zapytanie z nowym tokenem (rekurencja z flagą isRetry=true)
      return await request(method, path, body, true);
    } catch (error) {
      // Jeśli refresh się nie udał (np. token wygasł całkowicie), czyścimy wszystko
      console.error("Sesja wygasła:", error);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);

      // Opcjonalnie: Przekieruj do logowania
      window.location.href = "/login";
      throw error;
    }
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "API request failed");
  }

  try {
    // Obsługa przypadku, gdy API zwraca 204 No Content (brak JSONa)
    if (res.status === 204) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const api = {
  get: path => request("GET", path),
  post: (path, data) => request("POST", path, data),
  put: (path, data) => request("PUT", path, data),
  del: path => request("DELETE", path),
  // Helper do logowania, aby nie używać request() z auth headerem
  login: async (username, password) => {
    const res = await fetch(`${API_URL}/api/token/`, {
      // Endpoint SimpleJWT
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return await res.json();
  },
};

export default api;
