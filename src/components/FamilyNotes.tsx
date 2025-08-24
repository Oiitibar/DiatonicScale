import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { DIATONIC_NOTES, SOLFEGE, NOTE_FREQUENCIES } from '../utils/musicData';

const FamilyNotes: React.FC = () => {
  const { darkMode } = useTheme();
  const { playNote } = useAudio();
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const handleNoteClick = (note: string) => {
    const frequency = NOTE_FREQUENCIES[note];
    if (frequency) {
      playNote(frequency, 1);
      setActiveNote(note);
      setTimeout(() => setActiveNote(null), 1000);
    }
  };

  const noteColors = [
    'from-red-500 to-red-600',
    'from-orange-500 to-orange-600',
    'from-yellow-500 to-yellow-600',
    'from-green-500 to-green-600',
    'from-blue-500 to-blue-600',
    'from-indigo-500 to-indigo-600',
    'from-purple-500 to-purple-600',
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          The Seven Diatonic Notes
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          These seven notes form the foundation of Western music. Click on each note to hear its sound 
          and learn both the letter name and solfege system.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Interactive Note Wheel */}
        <div className="flex flex-col items-center">
          <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Interactive Note Wheel
          </h2>
          
          <div className="relative w-80 h-80">
            <div className={`absolute inset-4 rounded-full border-4 ${
              darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'
            } shadow-2xl`}></div>
            
            {DIATONIC_NOTES.map((note, index) => {
              const angle = (index * 360) / 7 - 90; // Start from top
              const radius = 120;
              const x = Math.cos((angle * Math.PI) / 180) * radius + 160;
              const y = Math.sin((angle * Math.PI) / 180) * radius + 160;
              const isActive = activeNote === note;
              
              return (
                <button
                  key={note}
                  onClick={() => handleNoteClick(note)}
                  className={`absolute w-16 h-16 rounded-full font-bold text-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
                    isActive ? 'scale-125 animate-pulse' : 'hover:shadow-xl'
                  } bg-gradient-to-br ${noteColors[index]}`}
                  style={{ left: x, top: y }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">{note}</span>
                    <Volume2 className="w-3 h-3 opacity-70" />
                  </div>
                </button>
              );
            })}
            
            {/* Center circle with current active note */}
            <div className={`absolute inset-0 flex items-center justify-center`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              } shadow-inner`}>
                <span className="text-2xl font-bold">
                  {activeNote || '♪'}
                </span>
              </div>
            </div>
          </div>
          
          <p className={`mt-6 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Click any note to hear its sound
          </p>
        </div>

        {/* Note Information */}
        <div className="space-y-6">
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Note System Explanation
          </h2>
          
          {DIATONIC_NOTES.map((note, index) => (
            <div
              key={note}
              className={`p-4 rounded-xl transition-all duration-200 cursor-pointer hover:scale-105 ${
                activeNote === note
                  ? darkMode
                    ? 'bg-gray-700 border-2 border-blue-500'
                    : 'bg-blue-50 border-2 border-blue-500 shadow-lg'
                  : darkMode
                    ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-md'
              }`}
              onClick={() => handleNoteClick(note)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${noteColors[index]}`}>
                    {note}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {note} - {SOLFEGE[index]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNoteClick(note);
                        }}
                        className={`p-1 rounded-full transition-colors ${
                          darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                        }`}
                      >
                        <Volume2 className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Position {index + 1} in the diatonic scale
                    </p>
                  </div>
                </div>
                <div className={`text-right text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {NOTE_FREQUENCIES[note]}Hz
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className={`rounded-2xl p-8 ${
        darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Understanding the Diatonic System
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Letter Names (A-G)
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The seven letter names represent the natural notes in music. These letters repeat 
              in cycles: A, B, C, D, E, F, G, then back to A. This system has been used for 
              centuries and forms the basis of musical notation.
            </p>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <p className={`font-mono text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                C - D - E - F - G - A - B - C
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                The C Major Scale (no sharps or flats)
              </p>
            </div>
          </div>
          
          <div>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Solfege System (Do-Ti)
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Solfege is a method of teaching pitch and sight-singing using syllables. Each note 
              has a specific syllable that helps you remember its sound and function within the scale. 
              This system is incredibly useful for ear training.
            </p>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <p className={`font-mono text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Do - Re - Mi - Fa - Sol - La - Ti - Do
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Movable Do system (Do = tonic of any key)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyNotes;