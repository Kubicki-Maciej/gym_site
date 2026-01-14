import { API_URL } from "../config";

async function request(method, path, body) {
  const token = localStorage.getItem("token");

  // ("TOKEN z localStorage:", token); // DEBUG 1

  const requestHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // ("REQUEST Headers:", requestHeaders); // 👈 DEBUG 2

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: requestHeaders,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "API request failed");
  }

  try {
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
};

export default api;
