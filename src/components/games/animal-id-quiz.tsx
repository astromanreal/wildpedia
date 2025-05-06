'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { animalIdQuizData, type QuizQuestion } from '@/data/animal-id-quiz-data';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { updateUserStats, grantAchievement } from '@/lib/user-stats'; // Import stats utilities

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


export default function AnimalIdQuiz() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0); // Local score for this quiz session
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Initialize and shuffle questions on mount
  useEffect(() => {
    startQuiz();
  }, []);

  // Shuffle options when the question changes
  useEffect(() => {
    if (quizQuestions.length > 0 && currentQuestionIndex < quizQuestions.length) {
      setShuffledOptions(shuffleArray(quizQuestions[currentQuestionIndex].options));
    }
  }, [currentQuestionIndex, quizQuestions]);

  const startQuiz = () => {
     setQuizQuestions(shuffleArray(animalIdQuizData));
     setCurrentQuestionIndex(0);
     setSelectedAnswer(null);
     setScore(0); // Reset local score
     setShowFeedback(false);
     setIsCorrect(null);
     setQuizFinished(false);
  };

  const handleAnswerSelect = (value: string) => {
    if (!showFeedback) {
      setSelectedAnswer(value);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return; // Require an answer

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    const scoreChange = correct ? 10 : 0; // Points for correct answer

    setIsCorrect(correct);
    if (correct) {
      setScore((prevScore) => prevScore + 1); // Update local score counter
    }
    setShowFeedback(true);
    // Note: We update global stats only when the quiz finishes
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setIsCorrect(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      finishQuiz(); // Call function to finalize quiz
    }
  };

  const finishQuiz = () => {
    const finalScore = score; // Use the local score counter
    const totalQuestions = quizQuestions.length;
    const pointsEarned = finalScore * 10; // Calculate total points (e.g., 10 per correct answer)

    updateUserStats({ scoreChange: pointsEarned, incrementGamesPlayed: true });
    // Grant achievement if criteria met (e.g., completing the quiz)
    grantAchievement('quiz_master_1');

    setQuizFinished(true);
  };


  if (quizQuestions.length === 0) {
    // Optional: Add a loading state
    return <p className="text-center text-muted-foreground">Loading Quiz...</p>;
  }

  if (quizFinished) {
    const accuracy = quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 100) : 0;
    let feedbackMessage = '';
    if (accuracy >= 80) feedbackMessage = "Excellent! You're a true wildlife expert!";
    else if (accuracy >= 50) feedbackMessage = "Good job! You know quite a bit about animals.";
    else feedbackMessage = "Keep learning! There's always more to discover about wildlife.";


    return (
      <Card className="bg-muted/50 text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl font-semibold">
            Your Score: {score} / {quizQuestions.length} ({accuracy}%)
          </p>
           <p className="text-lg">Points Earned: {score * 10}</p> {/* Show points earned */}
          <p className="text-muted-foreground">{feedbackMessage}</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={startQuiz}>
            <RotateCcw className="mr-2 h-4 w-4" /> Play Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;


  return (
    <div className="space-y-6">
      {/* Progress Bar and Question Count */}
      <div className="flex items-center justify-between gap-4">
         <Progress value={progressValue} className="flex-1 h-2" />
         <span className="text-sm font-medium text-muted-foreground">
           Question {currentQuestionIndex + 1} of {quizQuestions.length}
         </span>
      </div>


      {/* Question Display */}
      <Card className="overflow-hidden border-primary/20">
        <CardContent className="p-4 md:p-6 space-y-4">
          {currentQuestion.image && (
             <Image
              src={currentQuestion.image}
              alt={`Quiz question ${currentQuestionIndex + 1}`}
              width={400}
              height={300}
              className="w-full h-auto max-h-60 object-contain rounded-md mx-auto border bg-secondary/30"
              data-ai-hint={currentQuestion.dataAiHint || `animal wildlife question ${currentQuestionIndex + 1}`}
            />
          )}
          {currentQuestion.description && (
            <p className="text-center text-lg font-medium py-8 px-4 bg-secondary/30 rounded-md">
                {currentQuestion.description}
            </p>
          )}

          {/* Options */}
          <RadioGroup
            value={selectedAnswer ?? ''}
            onValueChange={handleAnswerSelect}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
            disabled={showFeedback} // Disable options after submitting
          >
            {shuffledOptions.map((option) => (
              <Label
                 key={option}
                 htmlFor={`option-${option}`}
                 className={`
                    flex items-center space-x-3 rounded-md border p-3 transition-colors cursor-pointer
                    ${ selectedAnswer === option ? 'border-primary ring-2 ring-primary/50 bg-primary/10' : 'border-border hover:bg-muted/50'}
                    ${showFeedback && option === currentQuestion.correctAnswer ? 'border-green-500 bg-green-500/10 ring-2 ring-green-500/50' : ''}
                    ${showFeedback && selectedAnswer === option && !isCorrect ? 'border-destructive bg-destructive/10 ring-2 ring-destructive/50' : ''}
                    ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                 `}
              >
                <RadioGroupItem value={option} id={`option-${option}`} className="shrink-0" />
                <span>{option}</span>
                 {showFeedback && selectedAnswer === option && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto"/>}
                 {showFeedback && selectedAnswer === option && !isCorrect && <XCircle className="h-5 w-5 text-destructive ml-auto"/>}
                 {showFeedback && option === currentQuestion.correctAnswer && selectedAnswer !== option && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto"/>}
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

        {/* Feedback Message */}
        {showFeedback && isCorrect !== null && (
            <div className={`mt-4 p-3 rounded-md text-center font-medium ${isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                {isCorrect ? 'Correct! (+10 Points)' : `Incorrect! The right answer was ${currentQuestion.correctAnswer}.`}
            </div>
        )}

      {/* Action Button */}
      <div className="text-center">
        {!showFeedback ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            size="lg"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} size="lg" variant="secondary">
            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </div>

       {/* Score Display (Optional during quiz - shows correct answers count) */}
       <div className="border-t pt-4 mt-6 text-center">
         <h3 className="text-lg font-semibold text-primary mb-2">Correct Answers</h3>
         <p className="text-2xl font-bold">{score}</p>
       </div>

    </div>
  );
}
