import React, { createContext, useContext, ReactNode } from 'react';

interface AudioContextType {
  playNote: (frequency: number, duration?: number) => void;
  playChord: (frequencies: number[], duration?: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioContext = React.useRef<AudioContext | null>(null);

  const initAudioContext = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext.current;
  };

  const playNote = (frequency: number, duration: number = 0.5) => {
    const context = initAudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
  };

  const playChord = (frequencies: number[], duration: number = 0.5) => {
    frequencies.forEach(freq => playNote(freq, duration));
  };

  return (
    <AudioContext.Provider value={{ playNote, playChord }}>
      {children}
    </AudioContext.Provider>
  );
};