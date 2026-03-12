import { useCallback, useEffect, useState } from "react";
import type Student from "../types/students";

const API_URL: string = "http://localhost:5000/api/students";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const response: Response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setStudents(data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Could not load students");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const add = async (name: string) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    await refresh();
  };

  const update = async (id: number, name: string) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    await refresh();
  };

  const remove = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await refresh();
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { students, loading, error, add, update, remove, refresh };
};
