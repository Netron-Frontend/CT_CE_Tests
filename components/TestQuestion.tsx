import { Question } from "@/types/test";

interface TestQuestionProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number;
  onAnswerSelect: (answerIndex: number) => void;
}

export default function TestQuestion({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
}: TestQuestionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="mb-6">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          Пытанне {questionNumber}
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {question.text}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedAnswer === index
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedAnswer === index
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-400 dark:border-gray-500"
                }`}
              >
                {selectedAnswer === index && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

