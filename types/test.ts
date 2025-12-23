export type TestType = "CT" | "CE";

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // индекс правильного ответа (0-based)
  explanation?: string;
}

export interface Test {
  id: string;
  type: TestType;
  subject: string;
  year: number;
  questions: Question[];
  duration?: number; // в минутах
}

export interface TestResult {
  testId: string;
  answers: number[]; // массив индексов выбранных ответов
  score: number;
  totalQuestions: number;
  timeSpent: number; // в секундах
  completedAt: Date;
}

