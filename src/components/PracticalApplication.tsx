import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Clock, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';

const PracticalApplication: React.FC = () => {
  const { darkMode } = useTheme();
  const { playNote, playChord } = useAudio();
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [metronomeActive, setMetronomeActive] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(80);

  const exercises = [
    {
      title: "C Major Scale Warm-up",
      description: "Simple ascending and descending C major scale",
      tempo: "Slow (60-80 BPM)",
      pattern: "C-D-E-F-G-A-B-C-B-A-G-F-E-D-C",
      tips: "Focus on clean finger transitions and even timing",
      difficulty: "Beginner"
    },
    {
      title: "Scale in Thirds",
      description: "Play scale notes in intervals of thirds",
      tempo: "Medium (80-100 BPM)", 
      pattern: "C-E-D-F-E-G-F-A-G-B-A-C-B-D-C",
      tips: "Skip one note each time to create harmonic intervals",
      difficulty: "Intermediate"
    },
    {
      title: "Pentatonic Riff Pattern",
      description: "Blues-style riff using pentatonic scale",
      tempo: "Medium (90-120 BPM)",
      pattern: "A-C-D-E-G-E-D-C-A",
      tips: "Add bends and slides for authentic blues sound",
      difficulty: "Intermediate"
    },
    {
      title: "Chord Progression Practice",
      description: "Common I-vi-IV-V progression in C major",
      tempo: "Slow (70-90 BPM)",
      pattern: "C-Am-F-G-C",
      tips: "Practice smooth chord transitions",
      difficulty: "Beginner"
    }
  ];

  const handlePlayExercise = async (exercise: any, index: number) => {
    setCurrentExercise(index);
    setIsPlaying(true);
    
    // Simple demo - play a few notes
    const frequencies = [261.63, 293.66, 329.63, 349.23]; // C, D, E, F
    for (let i = 0; i < frequencies.length; i++) {
      setTimeout(() => {
        playNote(frequencies[i], 0.5);
      }, i * 500);
    }
    
    setTimeout(() => setIsPlaying(false), frequencies.length * 500);
  };

  const toggleMetronome = () => {
    setMetronomeActive(!metronomeActive);
    if (!metronomeActive) {
      // Start metronome simulation
      const interval = setInterval(() => {
        playNote(800, 0.1); // High frequency click
      }, 60000 / bpm);
      
      // Store interval for cleanup
      setTimeout(() => {
        clearInterval(interval);
        setMetronomeActive(false);
      }, 10000); // Stop after 10 seconds for demo
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Practical Application
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Apply your scale knowledge with practical exercises, riffs, and practice routines. 
          Build real musical skills through structured practice.
        </p>
      </div>

      {/* Practice Tools */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Metronome */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Clock className="w-6 h-6 mr-2" />
            Practice Metronome
          </h2>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tempo (BPM)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="60"
                  max="200"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="flex-1"
                />
                <span className={`w-12 text-center font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {bpm}
                </span>
              </div>
            </div>
            <button
              onClick={toggleMetronome}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                metronomeActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {metronomeActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{metronomeActive ? 'Stop' : 'Start'} Metronome</span>
            </button>
          </div>
        </div>

        {/* Practice Timer */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Target className="w-6 h-6 mr-2" />
            Practice Goals
          </h2>
          <div className="space-y-3">
            {[
              'Practice scales for 10 minutes daily',
              'Master one new pattern per week',
              'Play with metronome at different tempos',
              'Record yourself to track progress'
            ].map((goal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded border-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'}`}></div>
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {goal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Library */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Practice Exercises
        </h2>
        
        <div className="grid gap-6">
          {exercises.map((exercise, index) => (
            <div key={index} className={`p-6 rounded-xl transition-all duration-200 ${
              currentExercise === index
                ? darkMode
                  ? 'bg-blue-900/50 border-2 border-blue-500'
                  : 'bg-blue-50 border-2 border-blue-500'
                : darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
            } shadow-lg`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {exercise.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      exercise.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {exercise.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Tempo: 
                      </span>
                      <span className={`ml-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {exercise.tempo}
                      </span>
                    </div>
                    <div>
                      <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Pattern: 
                      </span>
                      <span className={`ml-2 font-mono text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {exercise.pattern}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-yellow-900/30 border border-yellow-600/50' : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <span className={`text-sm font-medium ${
                      darkMode ? 'text-yellow-400' : 'text-yellow-800'
                    }`}>
                      💡 Tip: {exercise.tips}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-6">
                  <button
                    onClick={() => handlePlayExercise(exercise, index)}
                    disabled={isPlaying}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isPlaying && currentExercise === index
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isPlaying && currentExercise === index ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span>Play</span>
                  </button>
                  
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Schedule */}
      <div className={`rounded-2xl p-8 ${
        darkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-50 to-purple-50'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Weekly Practice Schedule
        </h2>
        <div className="grid md:grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className={`text-center p-4 rounded-xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-sm`}>
              <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {day}
              </h3>
              <div className={`text-xs space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div>Scales: 15min</div>
                <div>Chords: 10min</div>
                <div>Practice: 20min</div>
              </div>
            </div>
          ))}
        </div>
        <p className={`text-center mt-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Consistency is key! Even 15 minutes of daily practice will yield better results than lengthy, infrequent sessions.
        </p>
      </div>
    </div>
  );
};

export default PracticalApplication;