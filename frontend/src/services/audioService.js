class AudioService {
    constructor() {
        this.audioContext = null;
        this.currentAudio = null;
    }

    async initAudioContext() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (error) {
                console.error('Failed to initialize audio context:', error);
                throw new Error('Audio not supported in this browser');
            }
        }

        // Resume audio context if it's suspended
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    async playAudio(audioData) {
        try {
            // Stop any currently playing audio
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
            }

            // Handle base64 audio data
            if (audioData.startsWith('data:audio/')) {
                return await this.playBase64Audio(audioData);
            }

            // Handle raw base64 audio data
            if (typeof audioData === 'string' && audioData.length > 100) {
                const audioUrl = `data:audio/wav;base64,${audioData}`;
                return await this.playBase64Audio(audioUrl);
            }

            throw new Error('Invalid audio data format');
        } catch (error) {
            console.error('Error playing audio:', error);
            throw error;
        }
    }

    async playBase64Audio(dataUrl) {
        return new Promise((resolve, reject) => {
            const audio = new Audio(dataUrl);
            this.currentAudio = audio;

            audio.onloadeddata = () => {
                console.log('Audio loaded successfully');
            };

            audio.onended = () => {
                this.currentAudio = null;
                resolve();
            };

            audio.onerror = (error) => {
                console.error('Audio playback error:', error);
                this.currentAudio = null;
                reject(new Error('Failed to play audio'));
            };

            audio.oncanplaythrough = () => {
                audio.play().catch(error => {
                    console.error('Audio play error:', error);
                    this.currentAudio = null;
                    reject(new Error('Failed to start audio playback'));
                });
            };

            // Start loading the audio
            audio.load();
        });
    }

    async playWebAudioApi(audioData) {
        try {
            await this.initAudioContext();

            // Convert base64 to ArrayBuffer
            const binaryString = atob(audioData);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Decode audio data
            const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer);

            // Create and play audio source
            const source = this.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.audioContext.destination);

            return new Promise((resolve, reject) => {
                source.onended = resolve;
                source.onerror = reject;
                source.start();
            });
        } catch (error) {
            console.error('Web Audio API error:', error);
            throw error;
        }
    }

    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
    }

    isPlaying() {
        return this.currentAudio && !this.currentAudio.paused;
    }
}

export const audioService = new AudioService();
