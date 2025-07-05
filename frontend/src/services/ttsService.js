class BrowserTtsService {
    constructor() {
        this.isSupported = 'speechSynthesis' in window;
        this.voices = [];
        this.voicesLoaded = false;
        this.isInitialized = false;
    }

    async initialize() {
        if (!this.isSupported || this.isInitialized) return;

        return new Promise((resolve) => {
            const loadVoices = () => {
                this.voices = window.speechSynthesis.getVoices();
                this.voicesLoaded = this.voices.length > 0;
                
                if (this.voicesLoaded) {
                    this.isInitialized = true;
                    console.log(`Loaded ${this.voices.length} voices`);
                    resolve();
                } else {
                    setTimeout(loadVoices, 100);
                }
            };

            window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
            loadVoices();
        });
    }

    getBestVoice() {
        if (!this.voicesLoaded) return null;

        // Simple priority: English voices, prefer local/native ones
        const englishVoices = this.voices.filter(v => v.lang.startsWith('en'));
        
        // Look for high-quality voices first
        const qualityVoices = englishVoices.filter(v => 
            v.name.includes('Samantha') || 
            v.name.includes('Alex') || 
            v.name.includes('Karen') ||
            v.name.includes('Microsoft') ||
            v.localService
        );

        return qualityVoices[0] || englishVoices[0] || this.voices[0];
    }

    async speak(text, options = {}) {
        if (!this.isSupported) {
            throw new Error('Speech synthesis not supported');
        }

        // Initialize if needed
        if (!this.isInitialized) {
            await this.initialize();
        }

        return new Promise((resolve, reject) => {
            // Stop any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            
            // Configure speech settings
            utterance.rate = options.rate || 0.7;
            utterance.pitch = options.pitch || 1.0;
            utterance.volume = options.volume || 1.0;

            // Set the best available voice
            const voice = this.getBestVoice();
            if (voice) {
                utterance.voice = voice;
                console.log(`Speaking with: ${voice.name}`);
            }

            // Event handlers
            utterance.onstart = () => {
                if (options.onStart) options.onStart();
            };

            utterance.onend = () => {
                if (options.onEnd) options.onEnd();
                resolve();
            };

            utterance.onerror = (event) => {
                console.error('Speech error:', event.error);
                if (options.onError) options.onError(event.error);
                reject(new Error(`Speech failed: ${event.error}`));
            };

            // Start speaking
            window.speechSynthesis.speak(utterance);
        });
    }

    stop() {
        if (this.isSupported) {
            window.speechSynthesis.cancel();
        }
    }
}

export const ttsService = new BrowserTtsService();
