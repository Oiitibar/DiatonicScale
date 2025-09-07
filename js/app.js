// Main application logic and state management
class GuitarTheoryApp {
    constructor() {
        this.currentSection = 'home';
        this.darkMode = false;
        this.activeNote = null;
        this.activeString = null;
        this.selectedScale = 'C Major';
        this.quizState = 'start'; // 'start', 'question', 'results'
        this.selectedAnswer = null;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupEventListeners();
        this.renderCurrentSection();
    }

    setupNavigation() {
        const navigation = [
            { id: 'home', label: 'Home', icon: this.getHomeIcon() },
            { id: 'notes', label: 'Notes', icon: this.getMusicIcon() },
            { id: 'tuning', label: 'Tuning', icon: this.getVolumeIcon() },
            { id: 'fretboard', label: 'Fretboard', icon: this.getGuitarIcon() },
            { id: 'scales', label: 'Scales', icon: this.getBookIcon() },
            { id: 'practice', label: 'Practice', icon: this.getMusicIcon() },
            { id: 'quiz', label: 'Quiz', icon: this.getBrainIcon() },
        ];

        // Desktop navigation
        const desktopNav = document.getElementById('desktop-nav');
        desktopNav.innerHTML = navigation.map(item => `
            <button
                class="nav-button ${this.currentSection === item.id ? 'active' : ''}"
                onclick="app.setActiveSection('${item.id}')"
                data-section="${item.id}"
            >
                ${item.icon}
                <span>${item.label}</span>
            </button>
        `).join('');

        // Mobile navigation
        const mobileNav = document.getElementById('mobile-nav');
        mobileNav.innerHTML = navigation.map(item => `
            <button
                class="nav-button ${this.currentSection === item.id ? 'active' : ''}"
                onclick="app.setActiveSection('${item.id}')"
                data-section="${item.id}"
            >
                ${item.icon}
                <span>${item.label}</span>
            </button>
        `).join('');
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Quiz settings modal
        document.getElementById('cancel-quiz').addEventListener('click', () => {
            this.hideQuizSettings();
        });

        document.getElementById('start-quiz-btn').addEventListener('click', () => {
            this.startQuizFromSettings();
        });

        // Scale selector (if present)
        const scaleSelector = document.getElementById('scale-selector');
        if (scaleSelector) {
            scaleSelector.addEventListener('change', (e) => {
                this.updateSelectedScale(e.target.value);
            });
        }
    }

    setActiveSection(sectionId) {
        this.currentSection = sectionId;
        
        // Reset quiz state when leaving quiz section
        if (sectionId !== 'quiz') {
            this.quizState = 'start';
            quizManager.stopTimer();
        }
        
        this.updateNavigation();
        this.renderCurrentSection();
    }

    updateNavigation() {
        // Update desktop navigation
        document.querySelectorAll('#desktop-nav .nav-button').forEach(btn => {
            const section = btn.getAttribute('data-section');
            btn.classList.toggle('active', section === this.currentSection);
        });

        // Update mobile navigation
        document.querySelectorAll('#mobile-nav .nav-button').forEach(btn => {
            const section = btn.getAttribute('data-section');
            btn.classList.toggle('active', section === this.currentSection);
        });
    }

    renderCurrentSection() {
        const mainContent = document.getElementById('main-content');
        
        switch (this.currentSection) {
            case 'home':
                mainContent.innerHTML = renderHero();
                break;
            case 'notes':
                mainContent.innerHTML = renderFamilyNotes();
                break;
            case 'tuning':
                mainContent.innerHTML = renderGuitarTuning();
                break;
            case 'fretboard':
                mainContent.innerHTML = renderFretboard();
                this.setupFretboardListeners();
                break;
            case 'scales':
                mainContent.innerHTML = renderScalePatterns();
                break;
            case 'practice':
                mainContent.innerHTML = renderPracticalApplication();
                break;
            case 'quiz':
                this.renderQuizSection();
                break;
            default:
                mainContent.innerHTML = renderHero();
        }
    }

    renderQuizSection() {
        const mainContent = document.getElementById('main-content');
        
        switch (this.quizState) {
            case 'start':
                mainContent.innerHTML = renderQuizStart();
                break;
            case 'question':
                mainContent.innerHTML = renderQuizQuestion();
                break;
            case 'results':
                const results = quizManager.calculateResults();
                mainContent.innerHTML = renderQuizResults(results);
                break;
        }
    }

    setupFretboardListeners() {
        const scaleSelector = document.getElementById('scale-selector');
        if (scaleSelector) {
            scaleSelector.addEventListener('change', (e) => {
                this.updateSelectedScale(e.target.value);
            });
        }
    }

    updateSelectedScale(scaleName) {
        this.selectedScale = scaleName;
        
        // Update scale type indicator
        const scaleType = document.getElementById('scale-type');
        if (scaleType) {
            const scale = SCALES[scaleName];
            scaleType.innerHTML = `
                <span class="text-sm font-medium">
                    ${scale.type.toUpperCase()} SCALE
                </span>
            `;
            scaleType.className = `px-4 py-2 rounded-lg ${
                scale.type === 'major' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
            }`;
        }

        // Update scale info
        const scaleInfo = document.getElementById('scale-info');
        if (scaleInfo) {
            scaleInfo.innerHTML = `
                <div>
                    <span class="font-semibold text-gray-700">Scale: </span>
                    <span class="ml-2 px-2 py-1 rounded text-sm font-medium ${
                        SCALES[scaleName].type === 'major' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }">
                        ${scaleName}
                    </span>
                </div>
                <div>
                    <span class="font-semibold text-gray-700">Notes: </span>
                    <span class="ml-2 text-gray-900">
                        ${SCALES[scaleName].notes.join(' - ')}
                    </span>
                </div>
                <div>
                    <span class="font-semibold text-gray-700">Root Note: </span>
                    <span class="ml-2 font-bold text-gray-900">
                        ${SCALES[scaleName].root}
                    </span>
                </div>
            `;
        }

        // Update fretboard highlighting
        this.updateFretboardHighlighting();
    }

    updateFretboardHighlighting() {
        const fretButtons = document.querySelectorAll('.fret-button');
        fretButtons.forEach(button => {
            const note = button.getAttribute('data-note');
            const inScale = isNoteInScale(note, this.selectedScale);
            const scaleType = SCALES[this.selectedScale].type;
            
            // Remove existing classes
            button.classList.remove('major-scale', 'minor-scale', 'in-scale', 'not-in-scale');
            
            // Add appropriate classes
            if (inScale) {
                button.classList.add('in-scale');
                button.classList.add(scaleType === 'major' ? 'major-scale' : 'minor-scale');
            } else {
                button.classList.add('not-in-scale');
            }
        });
    }

    toggleTheme() {
        this.darkMode = !this.darkMode;
        const app = document.getElementById('app');
        const themeToggle = document.getElementById('theme-toggle');
        
        if (this.darkMode) {
            app.classList.add('dark');
            app.classList.remove('bg-gray-50', 'text-gray-900');
            app.classList.add('bg-gray-900', 'text-white');
            
            themeToggle.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
            `;
            themeToggle.classList.remove('bg-gray-100', 'hover:bg-gray-200', 'text-gray-600');
            themeToggle.classList.add('bg-gray-700', 'hover:bg-gray-600', 'text-yellow-400');
        } else {
            app.classList.remove('dark');
            app.classList.remove('bg-gray-900', 'text-white');
            app.classList.add('bg-gray-50', 'text-gray-900');
            
            themeToggle.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
            `;
            themeToggle.classList.remove('bg-gray-700', 'hover:bg-gray-600', 'text-yellow-400');
            themeToggle.classList.add('bg-gray-100', 'hover:bg-gray-200', 'text-gray-600');
        }
    }

    // Quiz methods
    showQuizSettings() {
        document.getElementById('quiz-settings-modal').classList.remove('hidden');
    }

    hideQuizSettings() {
        document.getElementById('quiz-settings-modal').classList.add('hidden');
    }

    startQuizFromSettings() {
        const questionCount = parseInt(document.getElementById('question-count').value);
        const timeLimit = parseInt(document.getElementById('time-limit').value);
        
        const settings = {
            questionCount,
            timeLimit,
            shuffleQuestions: true
        };
        
        quizManager.startQuiz(settings);
        this.quizState = 'question';
        this.hideQuizSettings();
        this.renderQuizSection();
    }

    // Icon helper methods
    getHomeIcon() {
        return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>`;
    }

    getMusicIcon() {
        return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
        </svg>`;
    }

    getVolumeIcon() {
        return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 14.142"></path>
        </svg>`;
    }

    getGuitarIcon() {
        return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
        </svg>`;
    }

    getBookIcon() {
        return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>`;
    }

    getBrainIcon() {
        return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>`;
    }
}

// Global functions for event handlers
function playNoteAndHighlight(note, index) {
    const frequency = NOTE_FREQUENCIES[note];
    if (frequency) {
        audioEngine.playNote(frequency, 1);
        
        // Update center note display
        const centerNote = document.getElementById('center-note');
        if (centerNote) {
            centerNote.textContent = note;
        }
        
        // Highlight note button
        document.querySelectorAll('.note-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const noteButton = document.querySelector(`[data-note="${note}"]`);
        if (noteButton) {
            noteButton.classList.add('active');
            setTimeout(() => noteButton.classList.remove('active'), 1000);
        }
        
        // Highlight note card
        document.querySelectorAll('[data-note-card]').forEach(card => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        const noteCard = document.querySelector(`[data-note-card="${note}"]`);
        if (noteCard) {
            noteCard.style.transform = 'scale(1.02)';
            noteCard.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
            setTimeout(() => {
                noteCard.style.transform = '';
                noteCard.style.boxShadow = '';
            }, 1000);
        }
    }
}

function playStringAndHighlight(stringIndex, frequency) {
    audioEngine.playNote(frequency, 2);
    
    // Highlight string button
    document.querySelectorAll('[data-string]').forEach(btn => {
        btn.style.transform = '';
    });
    
    const stringButton = document.querySelector(`[data-string="${stringIndex}"]`);
    if (stringButton) {
        stringButton.style.transform = 'scale(1.05)';
        setTimeout(() => {
            stringButton.style.transform = '';
        }, 2000);
    }
    
    // Highlight string card
    document.querySelectorAll('[data-string-card]').forEach(card => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
    
    const stringCard = document.querySelector(`[data-string-card="${stringIndex}"]`);
    if (stringCard) {
        stringCard.style.transform = 'scale(1.02)';
        stringCard.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
        setTimeout(() => {
            stringCard.style.transform = '';
            stringCard.style.boxShadow = '';
        }, 2000);
    }
}

function playFretNote(stringIndex, fret) {
    const note = getFretboardNote(stringIndex, fret);
    const frequency = NOTE_FREQUENCIES[note];
    if (frequency) {
        // Adjust frequency for octave based on string
        const octaveMultiplier = Math.pow(2, Math.floor(stringIndex / 2));
        audioEngine.playNote(frequency * octaveMultiplier, 1);
    }
}

// Quiz functions
function selectAnswer(answer) {
    app.selectedAnswer = answer;
    
    // Update UI
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`[data-answer="${answer}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    // Enable next button
    const nextBtn = document.getElementById('next-question-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.className = 'px-6 py-3 rounded-lg font-bold transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105';
    }
}

function handleNextQuestion() {
    if (app.selectedAnswer === null) return;
    
    // Submit answer
    quizManager.submitAnswer(app.selectedAnswer);
    app.selectedAnswer = null;
    
    // Move to next question or finish quiz
    if (quizManager.nextQuestion()) {
        app.renderQuizSection();
    } else {
        app.quizState = 'results';
        quizManager.finishQuiz();
        app.renderQuizSection();
    }
}

function resetQuiz() {
    app.quizState = 'start';
    quizManager.stopTimer();
    app.renderQuizSection();
}

function showQuizSettings() {
    app.showQuizSettings();
}

// Initialize the application
const app = new GuitarTheoryApp();

// Make app globally available for debugging
window.app = app;