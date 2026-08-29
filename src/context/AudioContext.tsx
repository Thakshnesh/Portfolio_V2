import React, { createContext, useContext, useState, useEffect } from 'react';
import { sound } from '../utils/sound';

interface AudioContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playSelect: () => void;
  playPowerUp: () => void;
  playAlarm: () => void;
  playServoPulse: () => void;
}

const AudioContext = createContext<AudioContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playSelect: () => {},
  playPowerUp: () => {},
  playAlarm: () => {},
  playServoPulse: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('thakshnesh_sound_enabled') === 'true';
    }
    return false;
  });

  useEffect(() => {
    sound.setEnabled(soundEnabled);
    localStorage.setItem('thakshnesh_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <AudioContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick: () => sound.playClick(),
        playSelect: () => sound.playSelect(),
        playPowerUp: () => sound.playPowerUp(),
        playAlarm: () => sound.playAlarm(),
        playServoPulse: () => sound.playServoPulse(),
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
