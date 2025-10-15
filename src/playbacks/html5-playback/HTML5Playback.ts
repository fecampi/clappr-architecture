import Playback from "../Playback.js";
import { PlaybackOptions } from "../Interfaces";

class HTML5Playback extends Playback {
  private options: PlaybackOptions;
  private video: HTMLVideoElement | null = null;

  constructor(core: any, options: PlaybackOptions) {
    super(core);
    this.options = options;
    this.setup();
  }

  private setup(): void {
    console.log("Configurações específicas para HTML5Playback");
  }

  load(src: string): void {
    if (this.video && this.video.parentNode) {
      this.video.parentNode.removeChild(this.video);
    }
    this.video = document.createElement('video');
    this.video.controls = true;
    this.video.width = 640;
    this.video.height = 360;
    this.video.src = src;
    document.body.appendChild(this.video);
  }

  play(): void {
    if (this.video) {
      this.video.play();
    } else {
      console.log("Nenhum vídeo carregado para reproduzir.");
    }
  }

  static canPlay(src: string): boolean {
    console.log("Verificando se HTML5Playback pode reproduzir:", src);
    return [".mp4", ".webm", ".ogg", ".ts"].some((ext) => src.endsWith(ext));
  }
}

export default HTML5Playback;
