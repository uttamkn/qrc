"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getQuestions, QuizData } from "@/actions/questions";
import { setUserScore } from "@/actions/user";

export default function PracticePage() {
  const [currentTopic, setCurrentTopic] = useState<
    "queue" | "recursion" | null
  >(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizData, setQuizData] = useState<QuizData>({
    queue: [],
    recursion: [],
  });

  useEffect(() => {
    getQuestions()
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  const handleTopicSelect = (topic: "queue" | "recursion") => {
    setCurrentTopic(topic);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null || currentTopic === null) return;

    if (
      selectedAnswer === quizData[currentTopic][currentQuestion].correctAnswer
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData[currentTopic].length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
      try {
        await setUserScore(currentTopic, score);
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    }
  };

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
              onClick={() => handleTopicSelect("queue")}
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
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Quiz Completed!
            </h2>
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
              {currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1)}{" "}
              Quiz
            </h2>
            <p className="mb-4">
              Question {currentQuestion + 1}/{quizData[currentTopic].length}
            </p>
            <p className="mb-4">
              {quizData[currentTopic][currentQuestion]?.question}
            </p>
            <div className="space-y-2 mb-4">
              {quizData[currentTopic][currentQuestion]?.options?.map(
                (option, index) => (
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
                ),
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: selectedAnswer !== null ? 1 : 0,
                y: selectedAnswer !== null ? 0 : 20,
              }}
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
  );
}
