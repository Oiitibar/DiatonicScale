import React, { useState } from 'react';
import { Play, Info, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { SCALES } from '../utils/musicData';

const ScalePatterns: React.FC = () => {
  const { darkMode } = useTheme();
  const { playChord } = useAudio();
  const [activePattern, setActivePattern] = useState<string>('C Major Position 1');
  const [showTabs, setShowTabs] = useState<boolean>(false);

  const scalePatterns = {
    'C Major Position 1': {
      scale: 'C Major',
      frets: [
        [8, 10, 12], // High E string
        [8, 10, 12], // B string  
        [7, 9, 10],  // G string
        [7, 9, 10],  // D string
        [8, 10, 12], // A string
        [8, 10, 12]  // Low E string
      ],
      startingFret: 8,
      description: 'Box pattern starting at 8th fret'
    },
    'G Major Position 1': {
      scale: 'G Major',
      frets: [
        [3, 5, 7],   // High E string
        [3, 5, 7],   // B string  
        [2, 4, 5],   // G string
        [2, 4, 5],   // D string
        [3, 5, 7],   // A string
        [3, 5, 7]    // Low E string
      ],
      startingFret: 3,
      description: 'Box pattern starting at 3rd fret'
    },
    'A Minor Position 1': {
      scale: 'A Minor',
      frets: [
        [5, 7, 8],   // High E string
        [5, 6, 8],   // B string  
        [5, 7, 9],   // G string
        [5, 7, 9],   // D string
        [5, 7, 8],   // A string
        [5, 7, 8]    // Low E string
      ],
      startingFret: 5,
      description: 'Box pattern starting at 5th fret'
    }
  };

  const handlePatternPlay = (patternName: string) => {
    setActivePattern(patternName);
    // Play a simple chord progression for the scale
    const frequencies = [261.63, 329.63, 392.00]; // C, E, G for example
    playChord(frequencies, 2);
  };

  const stringNames = ['E', 'B', 'G', 'D', 'A', 'E'];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Scale Shapes & Patterns
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Learn common diatonic scale patterns and shapes. These "box patterns" are essential 
          building blocks for guitar playing and improvisation.
        </p>
      </div>

      {/* Pattern Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.keys(scalePatterns).map(patternName => (
          <button
            key={patternName}
            onClick={() => handlePatternPlay(patternName)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              activePattern === patternName
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-500 text-white shadow-lg'
                : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{patternName}</span>
            <Play className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Pattern Diagram */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activePattern} Pattern
            </h2>
            <button
              onClick={() => setShowTabs(!showTabs)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{showTabs ? 'Hide' : 'Show'} Tabs</span>
            </button>
          </div>
          
          <div className={`p-6 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            {/* Fretboard Pattern */}
            <div className="space-y-3">
              <div className="text-center mb-4">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {scalePatterns[activePattern as keyof typeof scalePatterns].description}
                </span>
              </div>
              
              {stringNames.map((stringName, stringIndex) => {
                const frets = scalePatterns[activePattern as keyof typeof scalePatterns].frets[stringIndex];
                return (
                  <div key={stringIndex} className="flex items-center space-x-2">
                    <div className={`w-8 text-right font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stringName}
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: 12 }, (_, fretIndex) => {
                        const fretNumber = fretIndex + 1;
                        const isInPattern = frets.includes(fretNumber);
                        return (
                          <div
                            key={fretIndex}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                              isInPattern
                                ? activePattern.includes('Minor')
                                  ? 'bg-red-500 text-white'
                                  : 'bg-blue-500 text-white'
                                : darkMode
                                  ? 'bg-gray-700 text-gray-500'
                                  : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {isInPattern ? fretNumber : '·'}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tab notation */}
            {showTabs && (
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tab Notation:
                </h4>
                <div className="font-mono text-sm space-y-1">
                  {stringNames.map((stringName, stringIndex) => {
                    const frets = scalePatterns[activePattern as keyof typeof scalePatterns].frets[stringIndex];
                    return (
                      <div key={stringIndex} className={`flex ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="w-4">{stringName}</span>
                        <span className="w-4">|</span>
                        <span>{frets.join('---')}---|</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pattern Information */}
        <div className="space-y-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Pattern Details
          </h2>
          
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Scale Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Scale Type: 
                </span>
                <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                  activePattern.includes('Minor')
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {activePattern.includes('Minor') ? 'MINOR' : 'MAJOR'}
                </span>
              </div>
              <div>
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Starting Position: 
                </span>
                <span className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {scalePatterns[activePattern as keyof typeof scalePatterns].startingFret}th fret
                </span>
              </div>
              <div>
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Scale Notes: 
                </span>
                <span className={`ml-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {SCALES[scalePatterns[activePattern as keyof typeof scalePatterns].scale as keyof typeof SCALES]?.notes.join(' - ')}
                </span>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${
            darkMode ? 'bg-yellow-900/30 border border-yellow-600/50' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex items-start space-x-3">
              <Info className={`w-5 h-5 mt-0.5 ${
                darkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`} />
              <div>
                <h3 className={`font-semibold mb-2 ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-800'
                }`}>
                  Practice Tips
                </h3>
                <ul className={`space-y-1 text-sm ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>
                  <li>• Start slowly and focus on clean note execution</li>
                  <li>• Practice ascending and descending patterns</li>
                  <li>• Use a metronome to maintain steady timing</li>
                  <li>• Memorize the fingering pattern before adding speed</li>
                  <li>• Practice connecting different position patterns</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Fingering Suggestion
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Index Finger:
                </span>
                <span className={`block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  1st fret in pattern
                </span>
              </div>
              <div>
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Middle Finger:
                </span>
                <span className={`block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  2nd fret in pattern
                </span>
              </div>
              <div>
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Ring Finger:
                </span>
                <span className={`block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  3rd fret in pattern
                </span>
              </div>
              <div>
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Pinky Finger:
                </span>
                <span className={`block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  4th fret in pattern
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Progression */}
      <div className={`rounded-2xl p-8 ${
        darkMode ? 'bg-gradient-to-r from-green-900 to-teal-900' : 'bg-gradient-to-r from-green-50 to-teal-50'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Scale Learning Progression
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Learn Pattern 1', description: 'Master one box pattern completely' },
            { step: 2, title: 'Practice Daily', description: 'Build muscle memory with repetition' },
            { step: 3, title: 'Add Rhythm', description: 'Practice with different rhythmic patterns' },
            { step: 4, title: 'Connect Patterns', description: 'Link patterns across the fretboard' }
          ].map((item, index) => (
            <div key={index} className={`text-center p-4 rounded-xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-sm`}>
              <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-bold ${
                darkMode ? 'bg-teal-600 text-white' : 'bg-teal-600 text-white'
              }`}>
                {item.step}
              </div>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScalePatterns;