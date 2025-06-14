import Playback from "./Playback.js";
import { PlaybackOptions } from "./Interfaces";


class HTML5Playback extends Playback {
  private options: PlaybackOptions;

  constructor(core: any, options: PlaybackOptions) {
    super(core);
    this.options = options;
    this.setup();
  }

  private setup(): void {
    console.log("Configurações específicas para HTML5Playback");
  }

  load(src: string): void {
    console.log("Carrega a mídia HTML5:", src);
  }

  play(): void {
    console.log("Inicia a reprodução da mídia HTML5");
  }

  static canPlay(src: string): boolean {
    console.log("Verificando se HTML5Playback pode reproduzir:", src);
    return [".mp4", ".webm", ".ogg"].some((ext) => src.endsWith(ext));
  }
}

export default HTML5Playback;
