import Playback from './Playback';
import {PlaybackOptions} from "./Interfaces"


class HLSPlayback extends Playback {
  private options: PlaybackOptions;

  constructor(core: any, options: PlaybackOptions) {
    super(core);
    this.options = options;
    this.setup();
  }

  private setup(): void {
    console.log("Configurações específicas para HLSPlayback");
  }

  load(src: string): void {
    console.log("Carrega a mídia HLS:", src);
  }

  play(): void {
    console.log("Inicia a reprodução da mídia HLS");
  }

  static canPlay(src: string): boolean {
    console.log("Verificando se pode reproduzir:", src);
    return src.endsWith('.m3u8');
  }
}

export default HLSPlayback;
