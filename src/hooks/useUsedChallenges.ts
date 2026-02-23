import { useCallback } from "react";

const STORAGE_KEY = "language-game-used-challenges";

function getUsed(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setUsed(ids: string[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useUsedChallenges() {
  const markUsed = useCallback((challengeId: string) => {
    const used = getUsed();
    if (!used.includes(challengeId)) {
      setUsed([...used, challengeId]);
    }
  }, []);

  const getExcludedIds = useCallback(() => getUsed(), []);

  const pickExcluding = useCallback(
    <T extends { id: string }>(items: T[]): T => {
      const used = getUsed();
      const available = items.filter((item) => !used.includes(item.id));
      const pool = available.length > 0 ? available : items;
      if (available.length === 0) {
        setUsed([]);
      }
      const picked = pool[Math.floor(Math.random() * pool.length)];
      markUsed(picked.id);
      return picked;
    },
    [markUsed]
  );

  return { markUsed, getExcludedIds, pickExcluding };
}
