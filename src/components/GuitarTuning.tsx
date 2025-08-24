import React, { useState } from 'react';
import { Volume2, Guitar, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { GUITAR_TUNING } from '../utils/musicData';

const GuitarTuning: React.FC = () => {
  const { darkMode } = useTheme();
  const { playNote } = useAudio();
  const [activeString, setActiveString] = useState<number | null>(null);

  const handleStringClick = (stringIndex: number, frequency: number) => {
    playNote(frequency, 2);
    setActiveString(stringIndex);
    setTimeout(() => setActiveString(null), 2000);
  };

  const stringColors = [
    'from-red-400 to-red-500',
    'from-orange-400 to-orange-500',
    'from-yellow-400 to-yellow-500',
    'from-green-400 to-green-500',
    'from-blue-400 to-blue-500',
    'from-purple-400 to-purple-500',
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Guitar Strings & Standard Tuning
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Learn the standard guitar tuning and hear how each string should sound. 
          Click on any string to play its open note.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Interactive Guitar Diagram */}
        <div className="flex flex-col items-center">
          <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Interactive Guitar Tuner
          </h2>
          
          <div className={`relative p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-amber-50 to-orange-100'
          } shadow-2xl`}>
            {/* Guitar Body Outline */}
            <div className="relative">
              <div className={`w-80 h-96 rounded-t-full rounded-b-3xl border-4 ${
                darkMode ? 'border-amber-600 bg-gradient-to-b from-amber-800 to-amber-900' : 'border-amber-600 bg-gradient-to-b from-amber-200 to-amber-300'
              } shadow-inner`}>
                {/* Sound Hole */}
                <div className={`absolute top-32 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full ${
                  darkMode ? 'bg-gray-900' : 'bg-gray-800'
                } shadow-2xl`}></div>
                
                {/* Strings */}
                <div className="absolute top-8 bottom-8 left-1/2 transform -translate-x-1/2">
                  {GUITAR_TUNING.strings.map((string, index) => {
                    const isActive = activeString === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleStringClick(index, string.frequency)}
                        className={`block w-80 h-8 mb-2 relative group transition-all duration-200 ${
                          isActive ? 'animate-pulse' : ''
                        }`}
                        style={{ marginTop: index === 0 ? '0' : '8px' }}
                      >
                        {/* String line */}
                        <div
                          className={`absolute top-1/2 left-0 right-0 transform -translate-y-1/2 transition-all duration-200 ${
                            isActive 
                              ? 'h-2 animate-pulse' 
                              : 'h-1 group-hover:h-1.5'
                          } bg-gradient-to-r ${stringColors[index]} rounded-full shadow-lg`}
                        ></div>
                        
                        {/* String label */}
                        <div className={`absolute -left-24 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg ${
                          isActive 
                            ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                            : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'
                        } shadow-md transition-all duration-200 text-sm font-medium`}>
                          {string.name}
                        </div>
                        
                        {/* Note indicator */}
                        <div className={`absolute -right-16 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg transition-all duration-200 ${
                          isActive ? 'scale-125' : 'group-hover:scale-110'
                        } bg-gradient-to-br ${stringColors[index]}`}>
                          {string.note}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <p className={`mt-6 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Click on any string to hear its open note
          </p>
        </div>

        {/* Tuning Information */}
        <div className="space-y-6">
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Standard Tuning Reference
          </h2>
          
          {GUITAR_TUNING.strings.map((string, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl transition-all duration-200 cursor-pointer hover:scale-105 ${
                activeString === index
                  ? darkMode
                    ? 'bg-gray-700 border-2 border-blue-500'
                    : 'bg-blue-50 border-2 border-blue-500 shadow-lg'
                  : darkMode
                    ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-md'
              }`}
              onClick={() => handleStringClick(index, string.frequency)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${stringColors[index]}`}>
                    {string.note}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {string.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStringClick(index, string.frequency);
                        }}
                        className={`p-1 rounded-full transition-colors ${
                          darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                        }`}
                      >
                        <Volume2 className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Open string note: {string.note}
                    </p>
                  </div>
                </div>
                <div className={`text-right text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {string.frequency}Hz
                </div>
              </div>
            </div>
          ))}
          
          {/* Tuning Tips */}
          <div className={`p-6 rounded-xl ${
            darkMode ? 'bg-yellow-900/30 border border-yellow-600/50' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex items-start space-x-3">
              <AlertCircle className={`w-5 h-5 mt-0.5 ${
                darkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`} />
              <div>
                <h3 className={`font-semibold mb-2 ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-800'
                }`}>
                  Tuning Tips
                </h3>
                <ul className={`space-y-1 text-sm ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>
                  <li>• Always tune up to the note (tune flat, then tighten)</li>
                  <li>• Check your tuning frequently, especially when learning</li>
                  <li>• Use a metronome when practicing to develop timing</li>
                  <li>• New strings take time to settle - retune often at first</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className={`rounded-2xl p-8 ${
        darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-green-50 to-blue-50'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Why Standard Tuning Matters
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Guitar className={`w-8 h-8 mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Universal Standard
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Standard tuning (E-A-D-G-B-E) is used by virtually all guitarists worldwide. 
              Learning this tuning allows you to play with others and follow standard tabs and chord charts.
            </p>
          </div>
          
          <div>
            <Volume2 className={`w-8 h-8 mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Optimal Intervals
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The intervals between strings are carefully chosen to make chord shapes and scales 
              comfortable to play, while providing good range across the fretboard.
            </p>
          </div>
          
          <div>
            <AlertCircle className={`w-8 h-8 mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Foundation for Learning
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Once you master standard tuning, you can explore alternate tunings with confidence. 
              But start here - it's the foundation that all other guitar knowledge builds upon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuitarTuning;