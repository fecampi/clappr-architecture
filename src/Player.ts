import Core from "./core/Core.js";
import BaseObject from "./base/BaseObject.js";
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

class Player extends BaseObject {
  private core: Core;
  private options: PlayerOptions;

  constructor(options: PlayerOptions = {}) {
    super();
    this.options = { ...options };
    this.core = new Core(this.options);
  }

  load(src: string): void {
    this.core.load(src);
    this.trigger('player:load', src);
  }

  registerPlugin(plugin: PluginConstructor): void {
    this.core.registerPlugin(plugin);
  }

  registerPlayback(playback: PlaybackConstructor): void {
    this.core.registerPlayback(playback);
  }

  // Métodos de controle de reprodução
  play(): void {
    const playback = this.core.getActivePlayback();
    if (playback && typeof playback.play === 'function') {
      playback.play();
      this.trigger('player:play');
    }
  }

  pause(): void {
    const playback = this.core.getActivePlayback();
    if (playback && typeof playback.pause === 'function') {
      playback.pause();
      this.trigger('player:pause');
    }
  }

  seek(time: number): void {
    const playback = this.core.getActivePlayback();
    if (playback && typeof playback.seek === 'function') {
      playback.seek(time);
      this.trigger('player:seek', time);
    }
  }

  stop(): void {
    const playback = this.core.getActivePlayback();
    if (playback && typeof playback.stop === 'function') {
      playback.stop();
      this.trigger('player:stop');
    }
  }

  // Métodos de informação
  getCurrentTime(): number {
    const playback = this.core.getActivePlayback();
    return playback?.currentTime || 0;
  }

  getDuration(): number {
    const playback = this.core.getActivePlayback();
    return playback?.duration || 0;
  }

  // Métodos de volume
  setVolume(volume: number): void {
    const playback = this.core.getActivePlayback();
    if (playback && typeof playback.setVolume === 'function') {
      playback.setVolume(volume);
      this.trigger('player:volume', volume);
    }
  }

  getVolume(): number {
    const playback = this.core.getActivePlayback();
    return playback?.volume || 1;
  }

  mute(): void {
    const playback = this.core.getActivePlayback();
    if (playback && typeof playback.mute === 'function') {
      playback.mute();
      this.trigger('player:mute');
    }
  }

  unmute(): void {
    const playback = this.core.getActivePlayback();
    if (playback && typeof playback.unmute === 'function') {
      playback.unmute();
      this.trigger('player:unmute');
    }
  }

  isMuted(): boolean {
    const playback = this.core.getActivePlayback();
    return playback?.muted || false;
  }

  // Métodos de tela cheia
  enterFullscreen(): void {
    if (this.core.activeContainer?.element?.requestFullscreen) {
      this.core.activeContainer.element.requestFullscreen();
      this.trigger('player:fullscreen', true);
    }
  }

  exitFullscreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      this.trigger('player:fullscreen', false);
    }
  }

  isFullscreen(): boolean {
    return !!(document.fullscreenElement);
  }

  // Métodos de estado
  isPlaying(): boolean {
    return this.core.isPlaying();
  }

  isPaused(): boolean {
    const playback = this.core.getActivePlayback();
    return playback?.paused || true;
  }

  // Métodos de configuração
  resize(width: number, height: number): void {
    if (this.core.activeContainer?.element) {
      this.core.activeContainer.element.style.width = `${width}px`;
      this.core.activeContainer.element.style.height = `${height}px`;
      this.trigger('player:resize', { width, height });
    }
  }

  destroy(): void {
    this.core.destroy();
    this.trigger('player:destroy');
  }

}

export { Player };
