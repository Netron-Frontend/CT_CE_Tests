"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTestById } from "@/data/tests";
import { Test, Question } from "@/types/test";
import TestQuestion from "@/components/TestQuestion";
import TestResults from "@/components/TestResults";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const [test, setTest] = useState<Test | null>(null);
  
  // Извлекаем номер билета из ID
  const getBilletNumber = (id: string): number | null => {
    const match = id.match(/billet-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const foundTest = getTestById(testId);
    if (!foundTest) {
      router.push("/");
      return;
    }
    setTest(foundTest);
    setAnswers(new Array(foundTest.questions.length).fill(-1));
    setStartTime(Date.now());
  }, [testId, router]);

  useEffect(() => {
    if (!startTime || showResults) return;

    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < (test?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers(new Array(test?.questions.length || 0).fill(-1));
    setTimeSpent(0);
    setShowResults(false);
    setStartTime(Date.now());
  };

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (showResults) {
    return (
      <TestResults
        test={test}
        answers={answers}
        timeSpent={timeSpent}
        onRestart={handleRestart}
      />
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;
  const answeredCount = answers.filter((a) => a !== -1).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {test.subject} - {test.type} {test.year}
                {getBilletNumber(testId) && ` - Білет №${getBilletNumber(testId)}`}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Пытанне {currentQuestionIndex + 1} з {test.questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Адказана: {answeredCount} / {test.questions.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Час: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <TestQuestion
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-6">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Назад
            </button>

            <div className="flex gap-2">
              {test.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                    index === currentQuestionIndex
                      ? "bg-blue-500 text-white"
                      : answers[index] !== -1
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestionIndex < test.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Наперад →
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Скончыць тэст
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

