import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { SCALES, getFretboardNote, isNoteInScale, NOTE_FREQUENCIES } from '../utils/musicData';

const Fretboard: React.FC = () => {
  const { darkMode } = useTheme();
  const { playNote } = useAudio();
  const [selectedScale, setSelectedScale] = useState<string>('C Major');
  const [hoveredFret, setHoveredFret] = useState<{string: number, fret: number} | null>(null);

  const handleFretClick = (stringIndex: number, fret: number) => {
    const note = getFretboardNote(stringIndex, fret);
    const frequency = NOTE_FREQUENCIES[note];
    if (frequency) {
      // Adjust frequency for octave based on string
      const octaveMultiplier = Math.pow(2, Math.floor(stringIndex / 2));
      playNote(frequency * octaveMultiplier, 1);
    }
  };

  const stringNames = ['E', 'B', 'G', 'D', 'A', 'E'];
  const fretNumbers = Array.from({ length: 13 }, (_, i) => i); // 0-12 frets

  const getScaleColor = (scaleName: string) => {
    const scale = SCALES[scaleName as keyof typeof SCALES];
    return scale?.type === 'major' ? 'blue' : 'red';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Interactive Guitar Fretboard
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Explore notes across the fretboard and see how different scales map to the guitar neck. 
          Click any fret to hear the note.
        </p>
      </div>

      {/* Scale Selection */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <label className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Select Scale:
        </label>
        <select
          value={selectedScale}
          onChange={(e) => setSelectedScale(e.target.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            darkMode 
              ? 'bg-gray-700 text-white border border-gray-600 focus:border-blue-500' 
              : 'bg-white text-gray-900 border border-gray-300 focus:border-blue-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        >
          {Object.keys(SCALES).map(scaleName => (
            <option key={scaleName} value={scaleName}>
              {scaleName}
            </option>
          ))}
        </select>
        
        <div className={`px-4 py-2 rounded-lg ${
          getScaleColor(selectedScale) === 'blue' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          <span className="text-sm font-medium">
            {SCALES[selectedScale as keyof typeof SCALES]?.type.toUpperCase()} SCALE
          </span>
        </div>
      </div>

      {/* Fretboard */}
      <div className={`overflow-x-auto p-6 rounded-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-amber-50 to-orange-100'
      } shadow-2xl mb-8`}>
        <div className="min-w-max">
          {/* Fret Numbers */}
          <div className="flex mb-4">
            <div className="w-16"></div> {/* Space for string names */}
            {fretNumbers.map(fret => (
              <div key={fret} className="w-16 text-center">
                <span className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {fret}
                </span>
              </div>
            ))}
          </div>

          {/* Fretboard Grid */}
          {stringNames.map((stringName, stringIndex) => (
            <div key={stringIndex} className="flex items-center mb-2">
              {/* String Name */}
              <div className={`w-16 text-center font-bold text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stringName}
              </div>
              
              {/* Frets */}
              {fretNumbers.map(fret => {
                const note = getFretboardNote(stringIndex, fret);
                const inScale = isNoteInScale(note, selectedScale);
                const isHovered = hoveredFret?.string === stringIndex && hoveredFret?.fret === fret;
                const scaleColor = getScaleColor(selectedScale);
                
                return (
                  <button
                    key={fret}
                    onClick={() => handleFretClick(stringIndex, fret)}
                    onMouseEnter={() => setHoveredFret({string: stringIndex, fret})}
                    onMouseLeave={() => setHoveredFret(null)}
                    className={`relative w-16 h-16 m-0.5 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 ${
                      inScale
                        ? scaleColor === 'blue'
                          ? darkMode
                            ? 'bg-blue-600 text-white hover:bg-blue-500'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                          : darkMode
                            ? 'bg-red-600 text-white hover:bg-red-500'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    } shadow-md hover:shadow-lg ${isHovered ? 'ring-2 ring-yellow-400' : ''}`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-sm font-bold">{note}</span>
                      {inScale && (
                        <Volume2 className="w-3 h-3 opacity-70 mt-0.5" />
                      )}
                    </div>
                    
                    {/* Fret position markers */}
                    {(fret === 3 || fret === 5 || fret === 7 || fret === 9) && stringIndex === 2 && (
                      <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                        darkMode ? 'bg-gray-400' : 'bg-gray-600'
                      }`}></div>
                    )}
                    {fret === 12 && stringIndex === 2 && (
                      <>
                        <div className={`absolute -bottom-6 left-1/4 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                          darkMode ? 'bg-gray-400' : 'bg-gray-600'
                        }`}></div>
                        <div className={`absolute -bottom-6 right-1/4 transform translate-x-1/2 w-2 h-2 rounded-full ${
                          darkMode ? 'bg-gray-400' : 'bg-gray-600'
                        }`}></div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Scale Information */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className={`p-6 rounded-xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Scale Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Scale: 
              </span>
              <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                getScaleColor(selectedScale) === 'blue'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {selectedScale}
              </span>
            </div>
            <div>
              <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Notes: 
              </span>
              <span className={`ml-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {SCALES[selectedScale as keyof typeof SCALES]?.notes.join(' - ')}
              </span>
            </div>
            <div>
              <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Root Note: 
              </span>
              <span className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {SCALES[selectedScale as keyof typeof SCALES]?.root}
              </span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            How to Use This Fretboard
          </h3>
          <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Highlighted notes belong to the selected scale
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Click any fret to hear the note sound
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Blue highlights indicate major scales
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Red highlights indicate minor scales
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Position markers show common reference points
            </li>
          </ul>
        </div>
      </div>

      {/* Practice Tips */}
      <div className={`rounded-2xl p-8 ${
        darkMode ? 'bg-gradient-to-r from-purple-900 to-blue-900' : 'bg-gradient-to-r from-purple-50 to-blue-50'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Fretboard Practice Tips
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Start Simple',
              description: 'Begin with one scale pattern at a time. Master C Major before moving to other keys.'
            },
            {
              title: 'Practice Daily',
              description: 'Spend 5-10 minutes daily exploring different areas of the fretboard.'
            },
            {
              title: 'Memorize Patterns',
              description: 'Learn the visual patterns of scales. Your fingers will remember the shapes.'
            }
          ].map((tip, index) => (
            <div key={index} className={`p-4 rounded-xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-sm`}>
              <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {tip.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fretboard;