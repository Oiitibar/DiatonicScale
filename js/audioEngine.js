// Audio engine for playing notes and chords
class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.isInitialized = false;
    }

    init() {
        if (!this.isInitialized) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isInitialized = true;
        }
        return this.audioContext;
    }

    playNote(frequency, duration = 0.5) {
        const context = this.init();
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
    }

    playChord(frequencies, duration = 0.5) {
        frequencies.forEach(freq => this.playNote(freq, duration));
    }

    playScale(notes, tempo = 500) {
        notes.forEach((note, index) => {
            const frequency = NOTE_FREQUENCIES[note];
            if (frequency) {
                setTimeout(() => {
                    this.playNote(frequency, 0.5);
                }, index * tempo);
            }
        });
    }
}

// Global audio engine instance
const audioEngine = new AudioEngine();