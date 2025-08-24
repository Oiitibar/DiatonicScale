import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { DIATONIC_NOTES, GUITAR_TUNING, SCALES, getFretboardNote, NOTE_FREQUENCIES } from '../utils/musicData';

interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'fretboard-identify';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  audioNote?: string;
}

const Quiz: React.FC = () => {
  const { darkMode } = useTheme();
  const { playNote } = useAudio();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [timerActive, setTimerActive] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'How many notes are in the diatonic scale system?',
      options: ['5', '7', '8', '12'],
      correctAnswer: '7',
      explanation: 'The diatonic scale system consists of seven notes: Do, Re, Mi, Fa, Sol, La, Ti (or A, B, C, D, E, F, G).'
    },
    {
      id: 2,
      type: 'true-false',
      question: 'Standard guitar tuning from thickest to thinnest string is E-A-D-G-B-E.',
      correctAnswer: 'True',
      explanation: 'Yes! Standard guitar tuning is E (6th/thickest) - A (5th) - D (4th) - G (3rd) - B (2nd) - E (1st/thinnest).'
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: 'Which scale contains no sharps or flats?',
      options: ['G Major', 'C Major', 'D Major', 'F Major'],
      correctAnswer: 'C Major',
      explanation: 'C Major scale (C-D-E-F-G-A-B) contains only natural notes with no sharps or flats.'
    },
    {
      id: 4,
      type: 'fretboard-identify',
      question: 'What note is on the 3rd fret of the A string (5th string)?',
      correctAnswer: 'C',
      explanation: 'The A string open is A. Count up 3 semitones: A# (1st fret), B (2nd fret), C (3rd fret).'
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: 'What is the solfege name for the 5th degree of a major scale?',
      options: ['Fa', 'Sol', 'La', 'Ti'],
      correctAnswer: 'Sol',
      explanation: 'The 5th degree of the major scale is "Sol" in solfege (or "G" in C major scale).'
    },
    {
      id: 6,
      type: 'true-false',
      question: 'Minor scales sound generally brighter and happier than major scales.',
      correctAnswer: 'False',
      explanation: 'False. Minor scales typically sound darker and more melancholic, while major scales sound brighter and happier.'
    },
    {
      id: 7,
      type: 'multiple-choice',
      question: 'How many frets are typically on a standard acoustic guitar?',
      options: ['12', '15', '20', '24'],
      correctAnswer: '20',
      explanation: 'Most standard acoustic guitars have 20 frets, though some may have 19 or 21.'
    },
    {
      id: 8,
      type: 'fretboard-identify',
      question: 'What note is on the 5th fret of the low E string (6th string)?',
      correctAnswer: 'A',
      explanation: 'The low E string open is E. The 5th fret of the E string produces an A note.'
    }
  ];

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, timerActive]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimerActive(true);
    setCurrentQuestion(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setTimeLeft(300);
  };

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setTimerActive(false);
    setShowResults(true);
    
    // Include current answer if quiz finished normally
    if (selectedAnswer !== null) {
      const finalAnswers = [...userAnswers];
      finalAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(finalAnswers);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
    setTimerActive(false);
    setTimeLeft(300);
  };

  const playQuestionAudio = () => {
    const currentQ = questions[currentQuestion];
    if (currentQ.audioNote) {
      const frequency = NOTE_FREQUENCIES[currentQ.audioNote];
      if (frequency) {
        playNote(frequency, 1);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className={`p-12 rounded-3xl ${
          darkMode ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-purple-100 via-blue-100 to-gray-100'
        } shadow-2xl`}>
          <div className="flex items-center justify-center mb-8">
            <Brain className={`w-16 h-16 mr-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Guitar Theory Quiz
            </h1>
          </div>
          
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Test your knowledge of diatonic scales, guitar tuning, and fretboard theory. 
            You have 5 minutes to complete {questions.length} questions.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Target, title: 'Questions', value: questions.length, color: 'blue' },
              { icon: Brain, title: 'Time Limit', value: '5 min', color: 'green' },
              { icon: Trophy, title: 'Passing Score', value: '70%', color: 'yellow' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`p-4 rounded-xl ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-sm`}>
                  <Icon className={`w-8 h-8 mx-auto mb-2 text-${item.color}-500`} />
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={startQuiz}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const isPass = score.percentage >= 70;
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className={`p-8 rounded-3xl text-center mb-8 ${
          isPass 
            ? darkMode 
              ? 'bg-gradient-to-br from-green-900 to-teal-900' 
              : 'bg-gradient-to-br from-green-100 to-teal-100'
            : darkMode
              ? 'bg-gradient-to-br from-red-900 to-pink-900'
              : 'bg-gradient-to-br from-red-100 to-pink-100'
        } shadow-2xl`}>
          <div className="flex items-center justify-center mb-6">
            {isPass ? (
              <Trophy className={`w-16 h-16 mr-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            ) : (
              <Brain className={`w-16 h-16 mr-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
            )}
            <h1 className={`text-4xl font-bold ${
              darkMode ? 'text-white' : isPass ? 'text-green-800' : 'text-red-800'
            }`}>
              {isPass ? 'Congratulations!' : 'Keep Practicing!'}
            </h1>
          </div>

          <div className="mb-8">
            <div className={`text-6xl font-bold mb-2 ${
              darkMode ? 'text-white' : isPass ? 'text-green-700' : 'text-red-700'
            }`}>
              {score.percentage}%
            </div>
            <p className={`text-xl ${
              darkMode ? 'text-gray-300' : isPass ? 'text-green-600' : 'text-red-600'
            }`}>
              {score.correct} out of {score.total} questions correct
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className={`p-4 rounded-xl ${
              darkMode ? 'bg-black/20' : 'bg-white/50'
            }`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Your Score
              </h3>
              <div className={`text-3xl font-bold ${
                isPass ? 'text-green-500' : 'text-red-500'
              }`}>
                {score.correct}/{score.total}
              </div>
            </div>
            <div className={`p-4 rounded-xl ${
              darkMode ? 'bg-black/20' : 'bg-white/50'
            }`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Grade
              </h3>
              <div className={`text-3xl font-bold ${
                score.percentage >= 90 ? 'text-green-500' :
                score.percentage >= 80 ? 'text-blue-500' :
                score.percentage >= 70 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {score.percentage >= 90 ? 'A' :
                 score.percentage >= 80 ? 'B' :
                 score.percentage >= 70 ? 'C' : 'F'}
              </div>
            </div>
          </div>

          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {isPass 
              ? "Excellent! You have a solid understanding of guitar theory basics. Keep practicing and exploring more advanced concepts!"
              : "Don't worry! Music theory takes time to master. Review the lessons and try again when you're ready."
            }
          </p>

          <button
            onClick={resetQuiz}
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-800'
            } shadow-lg hover:shadow-xl`}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>

        {/* Detailed Results */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Question Review
          </h2>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className={`p-4 rounded-lg border-l-4 ${
                  isCorrect 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : userAnswer === null
                      ? 'border-gray-400 bg-gray-50 dark:bg-gray-800'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Question {index + 1}:
                        </span>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : userAnswer === null ? (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {question.question}
                      </p>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-medium">Your answer: </span>
                          <span className={`${
                            isCorrect ? 'text-green-600' : userAnswer === null ? 'text-gray-500' : 'text-red-600'
                          }`}>
                            {userAnswer || 'No answer'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Correct answer: </span>
                          <span className="text-green-600">{question.correctAnswer}</span>
                        </div>
                        <p className={`mt-2 italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Brain className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className={`flex items-center space-x-4 ${
            timeLeft < 60 ? 'text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <Target className="w-5 h-5" />
            <span className="font-mono text-lg font-bold">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : ''}`}>
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className={`p-8 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {currentQ.question}
        </h2>

        {/* Answer Options */}
        <div className="space-y-4">
          {currentQ.type === 'multiple-choice' && currentQ.options && (
            <>
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 rounded-lg text-left font-medium transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <span className="mr-3 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </>
          )}

          {currentQ.type === 'true-false' && (
            <div className="grid grid-cols-2 gap-4">
              {['True', 'False'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'fretboard-identify' && (
            <div className="grid grid-cols-4 gap-3">
              {DIATONIC_NOTES.map((note) => (
                <button
                  key={note}
                  onClick={() => handleAnswerSelect(note)}
                  className={`p-3 rounded-lg font-bold text-lg transition-all duration-200 ${
                    selectedAnswer === note
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {note}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;