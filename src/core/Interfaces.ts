export interface CoreInterface {
  on(event: string, handler: (...args: any[]) => void): void;
  trigger(event: string, ...args: any[]): void;
  isPlaying(): boolean;
  play(): void;
  pause(): void;
  seek(time: number): void;
  stop(): void;
  getCurrentTime(): number;
  getDuration(): number;
  setVolume(volume: number): void;
  getVolume(): number;
  mute(): void;
  unmute(): void;
  isMuted(): boolean;
  enterFullscreen(): void;
  exitFullscreen(): void;
  isFullscreen(): boolean;
  isPaused(): boolean;
  resize(width: number, height: number): void;
  destroy(): void;
}


