import Link from "next/link";
import { getTestsByType } from "@/data/tests";

export default function Home() {
  const ctTests = getTestsByType("CT");
  const ceTests = getTestsByType("CE");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Падрыхтоўка да ЦТ і ЦЭ 2025
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Праверце свае веды і падрыхтуйцеся да экзаменаў
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* ЦТ секция */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500 text-white rounded-full p-3 mr-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ЦТ - Цэнтралізаванае тэсціраванне
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Тэсты па беларускай мове для падрыхтоўкі да цэнтралізаванага тэсціравання
            </p>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {ctTests.map((test, index) => {
                const billetNumber = index + 1;
                return (
                  <Link
                    key={test.id}
                    href={`/test/${test.id}`}
                    className="block bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Білет №{billetNumber}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {test.questions.length} пытанняў
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ЦЭ секция */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-green-500 text-white rounded-full p-3 mr-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ЦЭ - Цэнтралізаваны экзамен
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Тэсты па беларускай мове для падрыхтоўкі да цэнтралізаванага экзамену
            </p>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {ceTests.map((test, index) => {
                const billetNumber = index + 1;
                return (
                  <Link
                    key={test.id}
                    href={`/test/${test.id}`}
                    className="block bg-green-50 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-gray-600 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Білет №{billetNumber}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {test.questions.length} пытанняў
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

