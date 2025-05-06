'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { conservationChallengeData, type ConservationQuestion } from '@/data/conservation-challenge-data';
import { CheckCircle2, XCircle, RotateCcw, Info } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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


export default function ConservationChallenge() {
  const [quizQuestions, setQuizQuestions] = useState<ConservationQuestion[]>([]);
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
     setQuizQuestions(shuffleArray(conservationChallengeData));
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
    const scoreChange = correct ? 15 : 0; // Points for correct answer (e.g., 15 for challenge)

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
      finishChallenge(); // Call function to finalize challenge
    }
  };

   const finishChallenge = () => {
    const finalScore = score; // Use the local score counter
    const totalQuestions = quizQuestions.length;
    const pointsEarned = finalScore * 15; // Calculate total points (e.g., 15 per correct answer)

    updateUserStats({ scoreChange: pointsEarned, incrementGamesPlayed: true });
    // Grant achievement if criteria met
    grantAchievement('conservation_champ_1');

    setQuizFinished(true);
  };


  if (quizQuestions.length === 0) {
    return <p className="text-center text-muted-foreground">Loading Challenge...</p>;
  }

  if (quizFinished) {
    const accuracy = quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 100) : 0;
    let feedbackMessage = '';
    if (accuracy >= 80) feedbackMessage = "Amazing! You're a true conservation champion!";
    else if (accuracy >= 50) feedbackMessage = "Well done! Your conservation knowledge is solid.";
    else feedbackMessage = "Keep learning! Every bit of knowledge helps protect our planet.";


    return (
      <Card className="bg-muted/50 text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Challenge Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl font-semibold">
            Your Score: {score} / {quizQuestions.length} ({accuracy}%)
          </p>
           <p className="text-lg">Points Earned: {score * 15}</p> {/* Show points earned */}
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
         <Progress value={progressValue} className="flex-1 h-2 bg-yellow-200 dark:bg-yellow-800 [&>div]:bg-yellow-500" />
         <span className="text-sm font-medium text-muted-foreground">
           Question {currentQuestionIndex + 1} of {quizQuestions.length}
         </span>
      </div>


      {/* Question Display */}
      <Card className="overflow-hidden border-yellow-300 dark:border-yellow-700">
        <CardContent className="p-4 md:p-6 space-y-4">
            <p className="text-center text-lg font-medium py-4">
                {currentQuestion.question}
            </p>

          {/* Options */}
          <RadioGroup
            value={selectedAnswer ?? ''}
            onValueChange={handleAnswerSelect}
            className="grid grid-cols-1 gap-3 pt-4" // Single column layout
            disabled={showFeedback} // Disable options after submitting
          >
            {shuffledOptions.map((option) => (
              <Label
                 key={option}
                 htmlFor={`option-${option}`}
                 className={`
                    flex items-center space-x-3 rounded-md border p-3 transition-colors
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

        {/* Feedback Message & Explanation */}
        {showFeedback && isCorrect !== null && (
            <div className={`mt-4 p-3 rounded-md text-center font-medium flex flex-col items-center gap-2 ${isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                <span>{isCorrect ? 'Correct! (+15 Points)' : `Incorrect! The right answer was "${currentQuestion.correctAnswer}".`}</span>
                 {currentQuestion.explanation && (
                   <AlertDialog>
                     <AlertDialogTrigger asChild>
                       <Button variant="link" size="sm" className="text-current h-auto p-0 underline hover:no-underline">
                         <Info className="mr-1 h-4 w-4" /> Learn More
                       </Button>
                     </AlertDialogTrigger>
                     <AlertDialogContent>
                       <AlertDialogHeader>
                         <AlertDialogTitle>Explanation</AlertDialogTitle>
                         <AlertDialogDescription className="text-left">
                            {currentQuestion.explanation}
                         </AlertDialogDescription>
                       </AlertDialogHeader>
                       <AlertDialogFooter>
                         <AlertDialogAction>Got it!</AlertDialogAction>
                       </AlertDialogFooter>
                     </AlertDialogContent>
                   </AlertDialog>
                 )}
            </div>
        )}

      {/* Action Button */}
      <div className="text-center">
        {!showFeedback ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-yellow-950"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} size="lg" variant="secondary">
            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Challenge'}
          </Button>
        )}
      </div>

       {/* Score Display (Optional during quiz - shows correct answers count) */}
       <div className="border-t border-yellow-300 dark:border-yellow-700 pt-4 mt-6 text-center">
         <h3 className="text-lg font-semibold text-primary mb-2">Correct Answers</h3>
         <p className="text-2xl font-bold">{score}</p>
       </div>

    </div>
  );
}
