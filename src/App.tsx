import React, { useState } from 'react';
import { Moon, Sun, Music, Guitar, Volume2, BookOpen, Brain, Home } from 'lucide-react';
import Hero from './components/Hero';
import FamilyNotes from './components/FamilyNotes';
import GuitarTuning from './components/GuitarTuning';
import Fretboard from './components/Fretboard';
import ScalePatterns from './components/ScalePatterns';
import PracticalApplication from './components/PracticalApplication';
import Quiz from './components/Quiz';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'notes', label: 'Notes', icon: Music },
    { id: 'tuning', label: 'Tuning', icon: Volume2 },
    { id: 'fretboard', label: 'Fretboard', icon: Guitar },
    { id: 'scales', label: 'Scales', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Music },
    { id: 'quiz', label: 'Quiz', icon: Brain },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <Hero />;
      case 'notes': return <FamilyNotes />;
      case 'tuning': return <GuitarTuning />;
      case 'fretboard': return <Fretboard />;
      case 'scales': return <ScalePatterns />;
      case 'practice': return <PracticalApplication />;
      case 'quiz': return <Quiz />;
      default: return <Hero />;
    }
  };

  return (
    <ThemeProvider darkMode={darkMode}>
      <AudioProvider>
        <div className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>
          {/* Navigation Header */}
          <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
            darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'
          }`}>
            <nav className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Guitar className="w-8 h-8 text-blue-600" />
                  <span className="text-xl font-bold">Guitar Theory</span>
                </div>
                
                <div className="hidden md:flex items-center space-x-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : darkMode
                              ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Mobile Navigation */}
              <div className="md:hidden flex overflow-x-auto space-x-1 mt-3 pb-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-blue-600 text-white'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {renderSection()}
          </main>

          {/* Footer */}
          <footer className={`border-t mt-16 py-8 transition-colors duration-300 ${
            darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Guitar className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-semibold">Diatonic Scales: Guitar Theory Basics</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Educational project for guitar theory and diatonic scale learning
              </p>
            </div>
          </footer>
        </div>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;