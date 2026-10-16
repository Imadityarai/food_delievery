export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");

export const imageUrl = (filename) => `${API_URL}/images/${encodeURIComponent(filename)}`;
