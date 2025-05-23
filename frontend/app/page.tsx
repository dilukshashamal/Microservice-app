// frontend/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface Item {
  id: number;
  name: string;
  description?: string;
}

interface RootMessage {
  message: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "http://localhost:8000";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null); // Reset error on new fetch

        // Fetch root message
        const rootRes = await fetch(`${apiUrl}/`);
        if (!rootRes.ok) {
          throw new Error(
            `HTTP error! status: ${rootRes.status} while fetching root message from ${apiUrl}/`
          );
        }
        const rootData: RootMessage = await rootRes.json();
        setMessage(rootData.message);

        // Fetch items
        const itemsRes = await fetch(`${apiUrl}/api/items`);
        if (!itemsRes.ok) {
          throw new Error(
            `HTTP error! status: ${itemsRes.status} while fetching items from ${apiUrl}/api/items`
          );
        }
        const itemsData: Item[] = await itemsRes.json();
        setItems(itemsData);
      } catch (e: unknown) {
        // Catch unknown error type
        console.error("Failed to fetch data:", e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
        setMessage("");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiUrl]);

  return (
    <main className={styles.main}>
      {" "}
      <h1>Next.js Frontend</h1>
      <p>
        Message from backend:{" "}
        <strong>{loading && !message ? "Loading..." : message}</strong>
      </p>
      <h2>Items from Backend API:</h2>
      {loading && <p>Loading items...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && items.length > 0 && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.description || "No description"}
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && items.length === 0 && message && (
        <p>No items found, but backend is responding.</p>
      )}
      {!loading && !error && items.length === 0 && !message && !error && (
        <p>No items found or backend not responding.</p>
      )}
      <p>
        API URL Used: <code>{apiUrl}</code>
      </p>
    </main>
  );
}
