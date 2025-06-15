import Playback from "./Playback.js";
import { IPlayback, PlaybackOptions } from "./Interfaces";

const videoBackgroundCss: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: "-1",
  pointerEvents: "none",
};

class HTML5Playback extends Playback implements IPlayback {
  private options: PlaybackOptions;
  private videoElement: HTMLVideoElement;
  private hasLoadedSrc: boolean = false;

  constructor(core: any, options: PlaybackOptions) {
    super(core);
    this.options = options;
    this.videoElement = document.createElement("video");
    Object.assign(this.videoElement.style, videoBackgroundCss);
    this.videoElement.controls = false;
    this.videoElement.autoplay = false;
    this.videoElement.muted = options.muted ?? false;
    this.videoElement.loop = options.loop ?? false;
    this.videoElement.preload = options.preload ?? "auto";

    // Adiciona ao container ou ao body
    const target = options.parent ?? document.body;
    target.appendChild(this.videoElement);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.videoElement.addEventListener("play", () => {
      this.trigger("play");
    });
    this.videoElement.addEventListener("pause", () => {
      this.trigger("pause");
    });
    this.videoElement.addEventListener("ended", () => {
      this.trigger("ended");
    });
    this.videoElement.addEventListener("error", (e) => {
      console.error("Erro de vídeo:", this.videoElement.error);
      this.trigger("error", e);
    });
    this.videoElement.addEventListener("timeupdate", () => {
      this.trigger("timeupdate", this.videoElement.currentTime);
    });
  }

  load(src: string): void {
    this.hasLoadedSrc = true;
    this.videoElement.src = src;
    this.videoElement.load();
  }

  play(): void {
    if (!this.hasLoadedSrc) {
      console.warn("play() chamado antes de load(). Ignorando.");
      return;
    }

    this.videoElement.play().catch((err) => {
      console.error("Erro ao tentar dar play:", err);
    });
  }

  pause(): void {
    this.videoElement.pause();
  }

  stop(): void {
    this.pause();
    this.videoElement.currentTime = 0;
  }

  isPlaying(): boolean {
    return (
      !this.videoElement.paused &&
      !this.videoElement.ended &&
      this.videoElement.readyState >= 3
    );
  }

  setCurrentTime(time: number): void {
    this.videoElement.currentTime = time;
  }

  getCurrentTime(): number {
    return this.videoElement.currentTime;
  }

  setVolume(volume: number): void {
    this.videoElement.volume = volume;
  }

  getVolume(): number {
    return this.videoElement.volume;
  }

  static canPlay(src: string): boolean {
    return [".mp4", ".webm", ".ogg"].some((ext) => src.endsWith(ext));
  }

  destroy(): void {
    this.pause();
    this.videoElement.removeAttribute("src");
    this.videoElement.load();
    this.videoElement.remove();
    this.hasLoadedSrc = false;
  }
}

export default HTML5Playback;
