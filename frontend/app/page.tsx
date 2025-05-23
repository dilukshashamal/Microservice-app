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
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        // 1. Load runtime config
        const cfgRes = await fetch("/config.json");
        if (!cfgRes.ok) {
          throw new Error(`Failed to load config.json: ${cfgRes.status}`);
        }
        const cfg = (await cfgRes.json()) as { API_URL: string };
        setApiUrl(cfg.API_URL);

        // 2. Fetch root message
        setLoading(true);
        setError(null);

        const rootRes = await fetch(`${cfg.API_URL}/`);
        if (!rootRes.ok) {
          throw new Error(`HTTP error ${rootRes.status} fetching root message`);
        }
        const rootData = (await rootRes.json()) as RootMessage;
        setMessage(rootData.message);

        // 3. Fetch items list
        const itemsRes = await fetch(`${cfg.API_URL}/api/items`);
        if (!itemsRes.ok) {
          throw new Error(`HTTP error ${itemsRes.status} fetching items API`);
        }
        const itemsData = (await itemsRes.json()) as Item[];
        setItems(itemsData);
      } catch (e: unknown) {
        console.error("Initialization error:", e);
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

    init();
  }, []);

  return (
    <main className={styles.main}>
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
              {item.name} — {item.description ?? "No description"}
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && items.length === 0 && message && (
        <p>No items found, but backend is responding.</p>
      )}

      {apiUrl && (
        <p>
          API URL Used: <code>{apiUrl}</code>
        </p>
      )}
    </main>
  );
}
