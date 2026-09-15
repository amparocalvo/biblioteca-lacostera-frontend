const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Error en la peticion");
  }

  return data;
};

export const loginRequest = (credentials) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });

export const getBooks = (token, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/books${query ? `?${query}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getMembers = (token) =>
  request("/members", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getLoans = (token) =>
  request("/loans", {
    headers: { Authorization: `Bearer ${token}` }
  });
