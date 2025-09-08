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
  const [timeLeft, setTimeLeft] = useState(450); // 7.5 minutes for 15 questions
  const [timerActive, setTimerActive] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const allQuestions: Question[] = [
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
    },
    {
      id: 9,
      type: 'multiple-choice',
      question: 'What is the interval between the root and the fifth in a major scale?',
      options: ['Perfect 4th', 'Perfect 5th', 'Major 6th', 'Minor 7th'],
      correctAnswer: 'Perfect 5th',
      explanation: 'The interval from the root to the fifth degree of a major scale is a Perfect 5th (7 semitones).'
    },
    {
      id: 10,
      type: 'true-false',
      question: 'The G string is the 3rd string on a guitar.',
      correctAnswer: 'True',
      explanation: 'True. Counting from the thinnest string: 1st-E, 2nd-B, 3rd-G, 4th-D, 5th-A, 6th-E.'
    },
    {
      id: 11,
      type: 'multiple-choice',
      question: 'How many sharps does the key of D Major have?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '2',
      explanation: 'D Major has 2 sharps: F# and C#. The notes are D-E-F#-G-A-B-C#.'
    },
    {
      id: 12,
      type: 'fretboard-identify',
      question: 'What note is on the 2nd fret of the D string (4th string)?',
      correctAnswer: 'E',
      explanation: 'The D string open is D. The 2nd fret produces an E note (D# on 1st fret, E on 2nd fret).'
    },
    {
      id: 13,
      type: 'multiple-choice',
      question: 'What is the relative minor of C Major?',
      options: ['A Minor', 'E Minor', 'D Minor', 'G Minor'],
      correctAnswer: 'A Minor',
      explanation: 'A Minor is the relative minor of C Major. They share the same notes but start from different roots.'
    },
    {
      id: 14,
      type: 'true-false',
      question: 'A whole step equals two frets on the guitar.',
      correctAnswer: 'True',
      explanation: 'True. A whole step (whole tone) equals 2 semitones, which is 2 frets on the guitar.'
    },
    {
      id: 15,
      type: 'multiple-choice',
      question: 'Which note is NOT in the C Major scale?',
      options: ['D', 'F#', 'G', 'A'],
      correctAnswer: 'F#',
      explanation: 'F# is not in C Major. C Major contains only natural notes: C-D-E-F-G-A-B.'
    },
    {
      id: 16,
      type: 'fretboard-identify',
      question: 'What note is on the 7th fret of the A string (5th string)?',
      correctAnswer: 'E',
      explanation: 'Starting from A (open), count up 7 frets: A#-B-C-C#-D-D#-E.'
    },
    {
      id: 17,
      type: 'multiple-choice',
      question: 'What does "Do" represent in the solfege system?',
      options: ['The 2nd degree', 'The root note', 'The 5th degree', 'The 7th degree'],
      correctAnswer: 'The root note',
      explanation: '"Do" represents the root note (1st degree) of the scale in the solfege system.'
    },
    {
      id: 18,
      type: 'true-false',
      question: 'The B string is tuned to the same note as the 2nd fret of the G string.',
      correctAnswer: 'False',
      explanation: 'False. The B string (open) is the same as the 4th fret of the G string, not the 2nd fret.'
    },
    {
      id: 19,
      type: 'multiple-choice',
      question: 'How many flats does the key of F Major have?',
      options: ['0', '1', '2', '3'],
      correctAnswer: '1',
      explanation: 'F Major has 1 flat: Bb. The notes are F-G-A-Bb-C-D-E.'
    },
    {
      id: 20,
      type: 'fretboard-identify',
      question: 'What note is on the 12th fret of any string?',
      correctAnswer: 'Same as open string',
      explanation: 'The 12th fret produces the same note as the open string, but one octave higher.'
    },
    {
      id: 21,
      type: 'multiple-choice',
      question: 'What is the pattern of whole and half steps in a major scale?',
      options: ['W-W-H-W-W-W-H', 'W-H-W-W-H-W-W', 'H-W-W-H-W-W-W', 'W-W-W-H-W-W-H'],
      correctAnswer: 'W-W-H-W-W-W-H',
      explanation: 'The major scale pattern is: Whole-Whole-Half-Whole-Whole-Whole-Half.'
    },
    {
      id: 22,
      type: 'true-false',
      question: 'E Minor has the same notes as G Major.',
      correctAnswer: 'True',
      explanation: 'True. E Minor is the relative minor of G Major, so they share the same notes.'
    },
    {
      id: 23,
      type: 'multiple-choice',
      question: 'What is the 4th degree of the C Major scale?',
      options: ['E', 'F', 'G', 'A'],
      correctAnswer: 'F',
      explanation: 'In C Major (C-D-E-F-G-A-B), F is the 4th degree.'
    },
    {
      id: 24,
      type: 'fretboard-identify',
      question: 'What note is on the 1st fret of the B string (2nd string)?',
      correctAnswer: 'C',
      explanation: 'The B string open is B. The 1st fret produces a C note.'
    },
    {
      id: 25,
      type: 'multiple-choice',
      question: 'Which solfege syllable represents the 3rd degree of a major scale?',
      options: ['Re', 'Mi', 'Fa', 'Sol'],
      correctAnswer: 'Mi',
      explanation: '"Mi" represents the 3rd degree of the major scale in solfege.'
    },
    {
      id: 26,
      type: 'true-false',
      question: 'A half step equals one fret on the guitar.',
      correctAnswer: 'True',
      explanation: 'True. A half step (semitone) equals exactly one fret on the guitar.'
    },
    {
      id: 27,
      type: 'multiple-choice',
      question: 'How many sharps does the key of A Major have?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
      explanation: 'A Major has 3 sharps: F#, C#, and G#.'
    },
    {
      id: 28,
      type: 'fretboard-identify',
      question: 'What note is on the 3rd fret of the high E string (1st string)?',
      correctAnswer: 'G',
      explanation: 'Starting from E (open): F (1st fret), F# (2nd fret), G (3rd fret).'
    },
    {
      id: 29,
      type: 'multiple-choice',
      question: 'What is the relative major of A Minor?',
      options: ['C Major', 'F Major', 'G Major', 'D Major'],
      correctAnswer: 'C Major',
      explanation: 'C Major is the relative major of A Minor. They share the same notes.'
    },
    {
      id: 30,
      type: 'true-false',
      question: 'The 5th fret of the low E string produces the same note as the open A string.',
      correctAnswer: 'True',
      explanation: 'True. The 5th fret of the low E string produces an A note, same as the open A string.'
    },
    {
      id: 31,
      type: 'multiple-choice',
      question: 'Which degree of the scale is called the "leading tone"?',
      options: ['6th', '7th', '1st', '5th'],
      correctAnswer: '7th',
      explanation: 'The 7th degree is called the leading tone because it leads back to the root (octave).'
    },
    {
      id: 32,
      type: 'fretboard-identify',
      question: 'What note is on the 5th fret of the G string (3rd string)?',
      correctAnswer: 'C',
      explanation: 'Starting from G (open), count up 5 frets: G#-A-A#-B-C.'
    },
    {
      id: 33,
      type: 'multiple-choice',
      question: 'What is the pattern of whole and half steps in a natural minor scale?',
      options: ['W-H-W-W-H-W-W', 'W-W-H-W-W-W-H', 'H-W-W-H-W-W-W', 'W-W-W-H-W-W-H'],
      correctAnswer: 'W-H-W-W-H-W-W',
      explanation: 'The natural minor scale pattern is: Whole-Half-Whole-Whole-Half-Whole-Whole.'
    },
    {
      id: 34,
      type: 'true-false',
      question: 'G Major and E Minor are relative keys.',
      correctAnswer: 'True',
      explanation: 'True. G Major and E Minor share the same key signature (one sharp: F#).'
    },
    {
      id: 35,
      type: 'multiple-choice',
      question: 'Which note is the 6th degree of the C Major scale?',
      options: ['F', 'G', 'A', 'B'],
      correctAnswer: 'A',
      explanation: 'In C Major (C-D-E-F-G-A-B), A is the 6th degree.'
    },
    {
      id: 36,
      type: 'fretboard-identify',
      question: 'What note is on the 2nd fret of the G string (3rd string)?',
      correctAnswer: 'A',
      explanation: 'Starting from G (open): G# (1st fret), A (2nd fret).'
    },
    {
      id: 37,
      type: 'multiple-choice',
      question: 'What solfege syllable represents the 6th degree?',
      options: ['Sol', 'La', 'Ti', 'Do'],
      correctAnswer: 'La',
      explanation: '"La" represents the 6th degree of the scale in solfege.'
    },
    {
      id: 38,
      type: 'true-false',
      question: 'The distance from C to G is a perfect 5th.',
      correctAnswer: 'True',
      explanation: 'True. C to G spans 7 semitones, which is a perfect 5th interval.'
    },
    {
      id: 39,
      type: 'multiple-choice',
      question: 'How many notes are in a chromatic scale?',
      options: ['7', '8', '12', '24'],
      correctAnswer: '12',
      explanation: 'A chromatic scale contains all 12 semitones within an octave.'
    },
    {
      id: 40,
      type: 'fretboard-identify',
      question: 'What note is on the 4th fret of the D string (4th string)?',
      correctAnswer: 'F#',
      explanation: 'Starting from D (open): D# (1st), E (2nd), F (3rd), F# (4th fret).'
    },
    {
      id: 41,
      type: 'multiple-choice',
      question: 'Which key has 4 sharps?',
      options: ['D Major', 'A Major', 'E Major', 'B Major'],
      correctAnswer: 'E Major',
      explanation: 'E Major has 4 sharps: F#, C#, G#, and D#.'
    },
    {
      id: 42,
      type: 'true-false',
      question: 'The 7th fret of any string produces the same note as the 12th fret of the string below it.',
      correctAnswer: 'False',
      explanation: 'False. The 7th fret produces the same note as the open string below it, not the 12th fret.'
    },
    {
      id: 43,
      type: 'multiple-choice',
      question: 'What is the 2nd degree of the G Major scale?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      explanation: 'In G Major (G-A-B-C-D-E-F#), A is the 2nd degree.'
    },
    {
      id: 44,
      type: 'fretboard-identify',
      question: 'What note is on the 9th fret of the low E string (6th string)?',
      correctAnswer: 'C#',
      explanation: 'Starting from E, count up 9 frets: F-F#-G-G#-A-A#-B-C-C#.'
    },
    {
      id: 45,
      type: 'multiple-choice',
      question: 'Which solfege syllable represents the 7th degree?',
      options: ['La', 'Ti', 'Do', 'Re'],
      correctAnswer: 'Ti',
      explanation: '"Ti" represents the 7th degree (leading tone) of the scale in solfege.'
    },
    {
      id: 46,
      type: 'true-false',
      question: 'D Minor has one flat in its key signature.',
      correctAnswer: 'True',
      explanation: 'True. D Minor has one flat: Bb. The notes are D-E-F-G-A-Bb-C.'
    },
    {
      id: 47,
      type: 'multiple-choice',
      question: 'What interval is from C to F?',
      options: ['Major 3rd', 'Perfect 4th', 'Perfect 5th', 'Major 6th'],
      correctAnswer: 'Perfect 4th',
      explanation: 'C to F spans 5 semitones, which is a perfect 4th interval.'
    },
    {
      id: 48,
      type: 'fretboard-identify',
      question: 'What note is on the 8th fret of the A string (5th string)?',
      correctAnswer: 'F',
      explanation: 'Starting from A, count up 8 frets: A#-B-C-C#-D-D#-E-F.'
    },
    {
      id: 49,
      type: 'multiple-choice',
      question: 'Which scale degree is called the "subdominant"?',
      options: ['3rd', '4th', '5th', '6th'],
      correctAnswer: '4th',
      explanation: 'The 4th degree is called the subdominant. In C Major, F is the subdominant.'
    },
    {
      id: 50,
      type: 'true-false',
      question: 'All major scales have the same pattern of intervals.',
      correctAnswer: 'True',
      explanation: 'True. All major scales follow the same interval pattern: W-W-H-W-W-W-H.'
    }
  ];

  // Function to randomly select 15 questions from the pool of 50
  const selectRandomQuestions = (questions: Question[], count: number): Question[] => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, timerActive]);

  const startQuiz = () => {
    const randomQuestions = selectRandomQuestions(allQuestions, 15);
    setSelectedQuestions(randomQuestions);
    setQuizStarted(true);
    setTimerActive(true);
    setCurrentQuestion(0);
    setUserAnswers(new Array(15).fill(null)); // Always 15 questions
    setShowResults(false);
    setTimeLeft(450); // 7.5 minutes for 15 questions
  };

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < selectedQuestions.length - 1) {
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
    selectedQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: selectedQuestions.length, percentage: Math.round((correct / selectedQuestions.length) * 100) };
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
    setTimerActive(false);
    setTimeLeft(450);
    setSelectedQuestions([]);
  };

  const playQuestionAudio = () => {
    const currentQ = selectedQuestions[currentQuestion];
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
            Test your knowledge of diatonic scales, guitar tuning, and fretboard theory from a pool of 50 questions. 
            You have 7.5 minutes to complete 15 randomly selected questions.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Target, title: 'Questions', value: '15', color: 'blue' },
              { icon: Brain, title: 'Time Limit', value: '7.5 min', color: 'green' },
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
            {selectedQuestions.map((question, index) => {
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

  const currentQ = selectedQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Brain className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Question {currentQuestion + 1} of {selectedQuestions.length}
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
            {currentQuestion === selectedQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;