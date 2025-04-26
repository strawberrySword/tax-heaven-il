import { useState, useEffect } from "react";

export type City = {
  symbol: number;
  name: string;
  score: number;
  rate: number;
  ceiling: number;
  location: {
    lat: number;
    lng: number;
  };
};

const filePath = "/cities.json";

export const useCities = () => {
  const [cities, setCities] = useState<City[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJson() {
      try {
        setLoading(true);
        const response = await fetch(import.meta.env.BASE_URL + filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch JSON: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setCities(jsonData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchJson();
  }, []);

  return { cities, error, loading };
};
