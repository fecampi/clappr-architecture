import Core from "./core/Core.js";
import { PlaybackConstructor } from "./playbacks/Interfaces.js";
import { PluginConstructor } from "./plugins/Interfaces.js";

interface PlayerOptions {
  type?: string;
  width?: number;
  height?: number;
  volume?: number;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  [key: string]: any;
}

class Player {
  private core: Core;
  private options: PlayerOptions;

  constructor(options: PlayerOptions = {}) {
    this.options = { ...options };
    this.core = new Core(this.options);
  }

  load(src: string): void {
    this.core.load(src);
  }

  registerPlugin(plugin: PluginConstructor): void {
    this.core.registerPlugin(plugin);
  }

  registerPlayback(playback: PlaybackConstructor): void {
    this.core.registerPlayback(playback);
  }

  // Métodos de controle de reprodução
  play(): void {
    this.core.play();
  }

  pause(): void {
    this.core.pause();
  }

  seek(time: number): void {
    this.core.seek(time);
  }

  stop(): void {
    this.core.stop();
  }

  // Métodos de informação
  getCurrentTime(): number {
    return this.core.getCurrentTime();
  }

  getDuration(): number {
    return this.core.getDuration();
  }

  // Métodos de volume
  setVolume(volume: number): void {
    this.core.setVolume(volume);
  }

  getVolume(): number {
    return this.core.getVolume();
  }

  mute(): void {
    this.core.mute();
  }

  unmute(): void {
    this.core.unmute();
  }

  isMuted(): boolean {
    return this.core.isMuted();
  }

  // Métodos de tela cheia
  enterFullscreen(): void {
    this.core.enterFullscreen();
  }

  exitFullscreen(): void {
    this.core.exitFullscreen();
  }

  isFullscreen(): boolean {
    return this.core.isFullscreen();
  }

  // Métodos de estado
  isPlaying(): boolean {
    return this.core.isPlaying();
  }

  isPaused(): boolean {
    return this.core.isPaused();
  }

  // Métodos de configuração
  resize(width: number, height: number): void {
    this.core.resize(width, height);
  }

  destroy(): void {
    this.core.destroy();
  }

}

export { Player };
