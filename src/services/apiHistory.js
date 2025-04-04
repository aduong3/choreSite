import ErrorHandler from "./ErrorHandler";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://choresite-n71r.onrender.com/api"
    : import.meta.env.VITE_API_BASE_URL;

export async function addToHistory(item) {
  try {
    const dataItem = {
      title: item.title,
      price: item.price,
      reward: item._id,
    };
    const res = await fetch(`${BASE_URL}/v1/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataItem),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(
        data.message || "Cannot create item into purchase history.",
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
}

export async function getAllHistory() {
  try {
    const res = await fetch(`${BASE_URL}/v1/history`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Cannot get purchase history.");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
}
