"use client"

import { useState } from "react"

const dummyQuestions = [
  {
    id: 1,
    question: "What is the time complexity of enqueue operation in a queue?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which of the following is not a type of queue?",
    options: ["Circular Queue", "Priority Queue", "Deque", "Stack"],
    correctAnswer: 3,
  },
  // Add more questions...
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === dummyQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < dummyQuestions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl">
            You scored {score} out of {dummyQuestions.length}
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestion + 1}/{dummyQuestions.length}
          </h2>
          <p className="mb-4">{dummyQuestions[currentQuestion].question}</p>
          <div className="space-y-2">
            {dummyQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className="w-full p-2 text-left bg-blue-100 hover:bg-blue-200 rounded"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

