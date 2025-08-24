import React from 'react';
import { Guitar, Music, BookOpen, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className={`relative overflow-hidden rounded-3xl mb-12 ${
        darkMode ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800'
      }`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🎸</div>
          <div className="absolute bottom-10 right-10 text-6xl rotate-12">🎵</div>
          <div className="absolute top-1/2 left-1/4 text-4xl opacity-50">♪</div>
          <div className="absolute top-1/4 right-1/3 text-5xl opacity-30">♫</div>
        </div>
        
        <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <Guitar className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold">Diatonic Scales</h1>
          </div>
          <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
            Master Guitar Theory Basics
          </p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            Discover the foundation of music theory through interactive learning. 
            Explore the seven diatonic notes, understand guitar tuning, and master 
            scale patterns that will unlock your musical potential.
          </p>
        </div>
      </div>

      {/* Introduction Content */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            What Are Diatonic Scales?
          </h2>
          <div className={`space-y-4 text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              Diatonic scales are the foundation of Western music theory. They consist of seven notes 
              arranged in a specific pattern of whole and half steps, creating the familiar sounds 
              we hear in countless songs.
            </p>
            <p>
              On the guitar, understanding diatonic scales opens up a world of possibilities for 
              improvisation, songwriting, and understanding how music works. Each scale has its 
              own unique character and emotional quality.
            </p>
            <p>
              Whether you're playing major scales that sound bright and happy, or minor scales 
              that evoke more serious emotions, diatonic scales are your roadmap to musical expression.
            </p>
          </div>
        </div>

        <div className={`rounded-2xl p-8 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Learn Diatonic Scales?
          </h3>
          <div className="space-y-4">
            {[
              {
                icon: Music,
                title: 'Musical Foundation',
                description: 'Build a solid understanding of how music works'
              },
              {
                icon: Guitar,
                title: 'Fretboard Mastery',
                description: 'Navigate the guitar neck with confidence'
              },
              {
                icon: BookOpen,
                title: 'Theory Knowledge',
                description: 'Understand songs and communicate with other musicians'
              },
              {
                icon: Brain,
                title: 'Creative Expression',
                description: 'Unlock your ability to improvise and compose'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-blue-600' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      darkMode ? 'text-white' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h4>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className={`rounded-2xl p-8 ${
        darkMode ? 'bg-gradient-to-r from-purple-900 to-blue-900' : 'bg-gradient-to-r from-purple-50 to-blue-50'
      }`}>
        <h3 className={`text-2xl font-bold mb-6 text-center ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Your Learning Journey
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Learn the Notes', description: 'Start with the seven diatonic notes' },
            { step: 2, title: 'Guitar Tuning', description: 'Understand standard guitar tuning' },
            { step: 3, title: 'Fretboard Map', description: 'Explore notes across the fretboard' },
            { step: 4, title: 'Practice Scales', description: 'Master scale patterns and shapes' }
          ].map((item, index) => (
            <div key={index} className={`text-center p-4 rounded-xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-sm`}>
              <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-bold ${
                darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                {item.step}
              </div>
              <h4 className={`font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {item.title}
              </h4>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;