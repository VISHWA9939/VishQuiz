import React, { useState, useEffect } from "react";

const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "Which is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
  { question: "Who wrote Hamlet?", options: ["Shakespeare", "Hemingway", "Austen", "Tolkien"], answer: "Shakespeare" },
  { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], answer: "H2O" },
  { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
  { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
  { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
  { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
  { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" }
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [overallTimeLeft, setOverallTimeLeft] = useState(600);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleUnattempted();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (overallTimeLeft > 0) {
      const overallTimer = setTimeout(() => setOverallTimeLeft(overallTimeLeft - 1), 1000);
      return () => clearTimeout(overallTimer);
    } else {
      alert(`⏳ Time's up! Your final score: ${score}/${questions.length}`);
    }
  }, [overallTimeLeft]);

  const handleAnswerClick = (option) => {
    if (selectedAnswers[currentQuestion] === null) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentQuestion] = option;
      setSelectedAnswers(updatedAnswers);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers[currentQuestion] === questions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${questions[currentQuestion].answer}`);
    }
    setShowFeedback(true);
  };

  const handleUnattempted = () => {
    setFeedback(`⏳ Time's up! Correct answer: ${questions[currentQuestion].answer}`);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setTimeLeft(15);
    } else {
      alert(`🎉 Quiz Over! Your score: ${score}/${questions.length}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(false);
      setTimeLeft(15);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 p-6">
      <div className="bg-white/20 backdrop-blur-xl p-6 rounded-lg shadow-lg max-w-xl w-full border border-white/30 relative">
        
        {/* Circular Timer Progress Bar */}
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#4CAF50"
                strokeWidth="8"
                fill="none"
                strokeDasharray="282"
                strokeDashoffset={282 - (overallTimeLeft / 600) * 282}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              {Math.floor(overallTimeLeft / 60)}:{overallTimeLeft % 60}
            </div>
          </div>
        </div>

        {showFeedback ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">{feedback}</h2>
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">{questions[currentQuestion].question}</h2>
            <ul className="space-y-2">
              {questions[currentQuestion].options.map((option) => (
                <li key={option}>
                  <button
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswers[currentQuestion] !== null}
                    className="w-full py-2 px-4 rounded transition text-lg bg-purple-200 hover:bg-purple-300 text-black"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex space-x-2 justify-center">
              {selectedAnswers[currentQuestion] !== null && (
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-4 rounded transition"
                >
                  Submit
                </button>
              )}
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrevious}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                >
                  Previous
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;