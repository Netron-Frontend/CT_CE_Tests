import { TestResult } from "@/types/test";

const STORAGE_KEY = "test-results";

export function saveTestResult(result: TestResult): void {
  if (typeof window === "undefined") return;

  const results = getTestResults();
  results.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function getTestResults(): TestResult[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const results = JSON.parse(stored);
    return results.map((r: any) => ({
      ...r,
      completedAt: new Date(r.completedAt),
    }));
  } catch {
    return [];
  }
}

export function clearTestResults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getTestResultsByTestId(testId: string): TestResult[] {
  return getTestResults().filter((r) => r.testId === testId);
}

