'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy,
  RotateCcw,
  ArrowRight,
  Zap,
  Target,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

const topics = [
  { name: 'Sports', icon: '⚽', questions: [
    {
      id: '1',
      question: 'Which sport is played with a round ball and two goals?',
      options: ['Basketball', 'Soccer', 'Tennis', 'Baseball'],
      correct: 1,
      explanation: 'Soccer (football) is played with a round ball and the objective is to score goals.',
      difficulty: 'Easy',
      topic: 'Sports'
    },
    {
      id: '2',
      question: 'In which sport do players use a bat to hit a ball?',
      options: ['Swimming', 'Running', 'Baseball', 'Soccer'],
      correct: 2,
      explanation: 'Baseball players use a bat to hit the ball.',
      difficulty: 'Easy',
      topic: 'Sports'
    }
  ]},
  { name: 'Food', icon: '🍕', questions: [
    {
      id: '3',
      question: 'Which of these is a fruit?',
      options: ['Carrot', 'Apple', 'Potato', 'Onion'],
      correct: 1,
      explanation: 'An apple is a fruit that grows on trees.',
      difficulty: 'Easy',
      topic: 'Food'
    },
    {
      id: '4',
      question: 'What do you typically eat for breakfast?',
      options: ['Dinner', 'Cereal', 'Dessert', 'Lunch'],
      correct: 1,
      explanation: 'Cereal is a common breakfast food.',
      difficulty: 'Easy',
      topic: 'Food'
    }
  ]},
  { name: 'Colors', icon: '🎨', questions: [
    {
      id: '5',
      question: 'What color do you get when you mix red and yellow?',
      options: ['Purple', 'Orange', 'Green', 'Blue'],
      correct: 1,
      explanation: 'Red and yellow mixed together create orange.',
      difficulty: 'Medium',
      topic: 'Colors'
    },
    {
      id: '6',
      question: 'Which color is associated with the sun?',
      options: ['Blue', 'Yellow', 'Purple', 'Black'],
      correct: 1,
      explanation: 'The sun appears yellow when we look at it.',
      difficulty: 'Easy',
      topic: 'Colors'
    }
  ]}
];

export default function AIPage() {
  const { user, updateProfile, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isQuizActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
    return () => clearInterval(interval);
  }, [isQuizActive, timeLeft, showResult]);

  const startQuiz = () => {
    const topicQuestions = topics.find(t => t.name === selectedTopic)?.questions || [];
    setAvailableQuestions(topicQuestions);
    setCurrentQuestion(topicQuestions[0] || null);
    setIsQuizActive(true);
    setQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
    setStartTime(Date.now());
  };

  const handleAnswer = (answerIndex: number | null) => {
    if (!currentQuestion || showResult) return;

    const correct = answerIndex === currentQuestion.correct;
    const timeTaken = 30 - timeLeft;
    let points = 0;

    if (correct) {
      points = 10;
      if (timeTaken < 10) {
        points += 5; // Speed bonus
      }
    }

    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowResult(true);
    setScore(prev => prev + points);

    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: `You earned ${points} points!`,
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Don't worry, keep practicing!",
        variant: "destructive",
      });
    }
  };

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < availableQuestions.length) {
      setQuestionIndex(nextIndex);
      setCurrentQuestion(availableQuestions[nextIndex]);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setIsQuizActive(false);
    setQuizComplete(true);
    
    if (user) {
      updateProfile({
        totalScore: user.totalScore + score,
        streakDays: user.streakDays + 1
      });
    }

    toast({
      title: "Quiz Complete! 🏆",
      description: `You scored ${score} points!`,
    });
  };

  const resetQuiz = () => {
    setSelectedTopic('');
    setSelectedLevel('');
    setIsQuizActive(false);
    setCurrentQuestion(null);
    setQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
    setAvailableQuestions([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Quiz</h1>
          <p className="text-gray-600">Test your English knowledge with adaptive questions</p>
        </div>

        {!isQuizActive && !quizComplete && (
          <div className="space-y-6">
            {/* Topic Selection */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-red-600" />
                  <span>Choose Your Topic</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topics.map((topic) => (
                    <Button
                      key={topic.name}
                      variant={selectedTopic === topic.name ? "default" : "outline"}
                      className={`h-20 ${
                        selectedTopic === topic.name 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'hover:bg-red-50 hover:border-red-200'
                      }`}
                      onClick={() => setSelectedTopic(topic.name)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{topic.icon}</div>
                        <div className="font-medium">{topic.name}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Level Selection */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-red-600" />
                  <span>Select Difficulty</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Easy', color: 'bg-green-500', description: 'Perfect for beginners' },
                    { name: 'Medium', color: 'bg-yellow-500', description: 'Challenge yourself' },
                    { name: 'Hard', color: 'bg-red-500', description: 'Expert level' }
                  ].map((level) => (
                    <Button
                      key={level.name}
                      variant={selectedLevel === level.name ? "default" : "outline"}
                      className={`h-20 ${
                        selectedLevel === level.name 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'hover:bg-red-50 hover:border-red-200'
                      }`}
                      onClick={() => setSelectedLevel(level.name)}
                    >
                      <div className="text-center">
                        <div className={`w-4 h-4 rounded-full ${level.color} mx-auto mb-2`}></div>
                        <div className="font-medium">{level.name}</div>
                        <div className="text-xs text-gray-600">{level.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Start Quiz Button */}
            <div className="text-center">
              <Button
                onClick={startQuiz}
                disabled={!selectedTopic || !selectedLevel}
                className="gradient-red text-white hover:opacity-90 text-lg px-8 py-3 h-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </Button>
            </div>
          </div>
        )}

        {isQuizActive && currentQuestion && (
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-red-100 text-red-800">{currentQuestion.topic}</Badge>
                  <Badge variant="outline">{currentQuestion.difficulty}</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className={`font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-600'}`}>
                      {timeLeft}s
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="font-bold text-yellow-600">{score} pts</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Question {questionIndex + 1} of {availableQuestions.length}</span>
                  <span>{Math.round(((questionIndex + 1) / availableQuestions.length) * 100)}% Complete</span>
                </div>
                <Progress value={((questionIndex + 1) / availableQuestions.length) * 100} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
                
                {!showResult && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start h-auto p-4 hover:bg-red-50 hover:border-red-200"
                        onClick={() => handleAnswer(index)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}

                {showResult && (
                  <div className="space-y-4">
                    <Alert className={isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
                      <div className="flex items-center space-x-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <AlertDescription className={isCorrect ? "text-green-800" : "text-red-800"}>
                          {isCorrect ? "Correct!" : "Incorrect"}
                        </AlertDescription>
                      </div>
                    </Alert>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                      <p className="text-blue-800">{currentQuestion.explanation}</p>
                    </div>

                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-3 rounded-lg ${
                            index === currentQuestion.correct
                              ? 'bg-green-100 border border-green-300'
                              : selectedAnswer === index
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                            index === currentQuestion.correct
                              ? 'bg-green-500 text-white'
                              : selectedAnswer === index
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className={
                            index === currentQuestion.correct
                              ? 'text-green-800 font-medium'
                              : selectedAnswer === index
                              ? 'text-red-800'
                              : 'text-gray-700'
                          }>
                            {option}
                          </span>
                          {index === currentQuestion.correct && (
                            <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={nextQuestion}
                      className="w-full gradient-red text-white hover:opacity-90"
                    >
                      {questionIndex + 1 < availableQuestions.length ? (
                        <>
                          Next Question
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Complete Quiz
                          <Star className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {quizComplete && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <span>Quiz Complete!</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-red-600">{score}</div>
                  <div className="text-gray-600">Total Points Earned</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round((score / (availableQuestions.length * 10)) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{availableQuestions.length}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedTopic}</div>
                    <div className="text-sm text-gray-600">Topic</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={resetQuiz}
                    className="w-full gradient-red text-white hover:opacity-90"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Take Another Quiz
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/statistics')}
                    className="w-full"
                  >
                    View Statistics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}