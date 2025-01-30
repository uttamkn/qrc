"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const quizData = {
  queues: [
    {
      question: "What is the time complexity of enqueue operation in a queue?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correctAnswer: 0,
    },
    {
      question: "Which of the following is not a type of queue?",
      options: ["Circular Queue", "Priority Queue", "Deque", "Stack"],
      correctAnswer: 3,
    },
    {
      question: "In a circular queue, what happens when the rear pointer reaches the end of the array?",
      options: [
        "The queue is considered full",
        "The rear pointer moves to the start of the array",
        "The queue is resized",
        "An error is thrown",
      ],
      correctAnswer: 1,
    },
  ],
  recursion: [
    {
      question: "What is the base case in a recursive function?",
      options: [
        "The case where the function calls itself",
        "The case where the function returns without calling itself",
        "The case where the function throws an error",
        "The case where the function runs indefinitely",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the time complexity of a recursive fibonacci function?",
      options: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"],
      correctAnswer: 2,
    },
    {
      question: "What is tail recursion?",
      options: [
        "A recursive call at the beginning of a function",
        "A recursive call at the end of a function",
        "A recursive call in the middle of a function",
        "A recursive call that never terminates",
      ],
      correctAnswer: 1,
    },
  ],
}

export default function PracticePage() {
  const [currentTopic, setCurrentTopic] = useState<"queues" | "recursion" | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleTopicSelect = (topic: "queues" | "recursion") => {
    setCurrentTopic(topic)
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer(null)
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null || currentTopic === null) return

    if (selectedAnswer === quizData[currentTopic][currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizData[currentTopic].length) {
      setCurrentQuestion(nextQuestion)
      setSelectedAnswer(null)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <motion.h1
        className="text-4xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Practice
      </motion.h1>
      <AnimatePresence mode="wait">
        {currentTopic === null ? (
          <motion.div
            key="topic-selection"
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4">Choose a topic to practice:</p>
            <Button
              onClick={() => handleTopicSelect("queues")}
              className="mr-4 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Queues
            </Button>
            <Button
              onClick={() => handleTopicSelect("recursion")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Recursion
            </Button>
          </motion.div>
        ) : showScore ? (
          <motion.div
            key="score"
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">Quiz Completed!</h2>
            <p className="text-xl mb-4">
              You scored {score} out of {quizData[currentTopic].length}
            </p>
            <Button
              onClick={() => setCurrentTopic(null)}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Back to Topics
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1)} Quiz
            </h2>
            <p className="mb-4">
              Question {currentQuestion + 1}/{quizData[currentTopic].length}
            </p>
            <p className="mb-4">{quizData[currentTopic][currentQuestion].question}</p>
            <div className="space-y-2 mb-4">
              {quizData[currentTopic][currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left ${
                      selectedAnswer === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    }`}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: selectedAnswer !== null ? 1 : 0, y: selectedAnswer !== null ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

