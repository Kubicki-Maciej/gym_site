import { API_URL } from "../config";

async function request(method, path, body) {
  const token = localStorage.getItem("token"); // jeśli masz auth
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "API request failed");
  }
  // dla DELETE and 204 - nie zawsze zwraca JSON
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export default {
  get: path => request("GET", path),
  post: (path, data) => request("POST", path, data),
  put: (path, data) => request("PUT", path, data),
  del: path => request("DELETE", path),
};
