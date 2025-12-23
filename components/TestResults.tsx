"use client";

import { useEffect } from "react";
import { Test } from "@/types/test";
import { TestResult } from "@/types/test";
import Link from "next/link";
import { saveTestResult } from "@/lib/storage";

interface TestResultsProps {
  test: Test;
  answers: number[];
  timeSpent: number;
  onRestart: () => void;
}

// Извлекаем номер билета из ID
const getBilletNumber = (id: string): number | null => {
  const match = id.match(/billet-(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

export default function TestResults({
  test,
  answers,
  timeSpent,
  onRestart,
}: TestResultsProps) {
  const correctAnswers = answers.filter(
    (answer, index) => answer === test.questions[index].correctAnswer
  ).length;
  const totalQuestions = test.questions.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  useEffect(() => {
    const result: TestResult = {
      testId: test.id,
      answers,
      score,
      totalQuestions,
      timeSpent,
      completedAt: new Date(),
    };
    saveTestResult(result);
  }, [test.id, answers, score, totalQuestions, timeSpent]);

  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBgColor = () => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Вынікі тэсту
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {test.subject} - {test.type} {test.year}
            {getBilletNumber(test.id) && ` - Білет №${getBilletNumber(test.id)}`}
          </p>

          {/* Score Card */}
          <div
            className={`${getScoreBgColor()} rounded-2xl p-8 mb-8 text-center`}
          >
            <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
              {score}%
            </div>
            <div className="text-xl text-gray-700 dark:text-gray-300">
              Правільных адказаў: {correctAnswers} з {totalQuestions}
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {correctAnswers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Правільна
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalQuestions - correctAnswers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Няправільна
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Час
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Дэтальныя вынікі
            </h2>
            <div className="space-y-4">
              {test.questions.map((question, index) => {
                const isCorrect = answers[index] === question.correctAnswer;
                return (
                  <div
                    key={question.id}
                    className={`border-2 rounded-lg p-4 ${
                      isCorrect
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Пытанне {index + 1}: {question.text}
                      </span>
                      {isCorrect ? (
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          ✓ Правільна
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 font-bold">
                          ✗ Няправільна
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ваш адказ:{" "}
                        </span>
                        <span
                          className={
                            isCorrect
                              ? "text-green-700 dark:text-green-300"
                              : "text-red-700 dark:text-red-300"
                          }
                        >
                          {answers[index] !== -1
                            ? question.options[answers[index]]
                            : "Не отвечено"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Правільны адказ:{" "}
                          </span>
                          <span className="text-green-700 dark:text-green-300">
                            {question.options[question.correctAnswer]}
                          </span>
                        </div>
                      )}
                      {question.explanation && (
                        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            Тлумачэнне:{" "}
                          </span>
                          <span className="text-sm text-blue-700 dark:text-blue-300">
                            {question.explanation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onRestart}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Прайсці нанова
            </button>
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
            >
              На галоўную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

