const API_BASE_URL = "http://localhost:8080/api/stocks";

const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  // ✅ Handle empty responses (DELETE & PUT might return 204 No Content)
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return {}; // Prevent JSON parsing error
  }

  return response.json();
};

export const getAllStocks = () => fetchWithErrorHandling(`${API_BASE_URL}`);

export const getPortfolioValue = () =>
  fetchWithErrorHandling(`${API_BASE_URL}/portfolio-value`);

export const createStock = (stock) =>
  fetchWithErrorHandling(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });

export const updateStock = (id, stock) =>
  fetchWithErrorHandling(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });

export const deleteStock = (id) =>
  fetchWithErrorHandling(`${API_BASE_URL}/${id}`, { method: "DELETE" })
    .then(() => ({})) // ✅ Ensure empty response doesn't break UI
    .catch((error) => {
      console.error("Delete error:", error);
      throw error;
    });
