import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Settings, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ReadAloud = ({ post, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [voice, setVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voices, setVoices] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  
  const utteranceRef = useRef(null);
  const contentRef = useRef(null);

  // Check if speech synthesis is supported
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      loadVoices();
    }
  }, []);

  // Load available voices
  const loadVoices = () => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);
    
    // Try to find a natural-sounding voice
    const preferredVoices = availableVoices.filter(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Natural'))
    );
    
    if (preferredVoices.length > 0) {
      setVoice(preferredVoices[0]);
    } else if (availableVoices.length > 0) {
      setVoice(availableVoices[0]);
    }
  };

  // Reload voices when they become available
  useEffect(() => {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Extract text content from HTML
  const extractTextContent = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Start reading
  const startReading = () => {
    if (!isSupported || !voice) return;

    const textContent = extractTextContent(post.content);
    setCurrentText(textContent);
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(0);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  // Pause reading
  const pauseReading = () => {
    if (isPlaying && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  // Stop reading
  const stopReading = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentWordIndex(0);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Read Aloud</h3>
              <p className="text-sm text-gray-600">{post.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              ×
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice
                </label>
                <select
                  value={voice ? voice.name : ''}
                  onChange={(e) => {
                    const selectedVoice = voices.find(v => v.name === e.target.value);
                    setVoice(selectedVoice);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {voices.map((v, index) => (
                    <option key={index} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speed: {rate.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Pitch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pitch: {pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Volume */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume: {Math.round(volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {!isSupported ? (
            <div className="text-center py-8">
              <VolumeX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Text-to-speech is not supported in your browser.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={startReading}
                  disabled={isPlaying && !isPaused}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isPlaying && !isPaused ? 'Reading...' : 'Start Reading'}
                </Button>
                
                <Button
                  onClick={pauseReading}
                  disabled={!isPlaying}
                  variant="outline"
                >
                  {isPaused ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={stopReading}
                  disabled={!isPlaying}
                  variant="outline"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </div>

              {/* Progress Indicator */}
              {isPlaying && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <span>Reading in progress...</span>
                  </div>
                </div>
              )}

              {/* Article Preview */}
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="text-sm text-gray-700 leading-relaxed">
                  {currentText.slice(0, 500)}
                  {currentText.length > 500 && '...'}
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center text-sm text-gray-500">
                <p>Click "Start Reading" to begin. Use the settings to adjust voice, speed, and volume.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadAloud;
