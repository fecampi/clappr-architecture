import Playback from '../Playback';
import {PlaybackOptions} from "../Interfaces"
import Hls from 'hls.js';


class HLSPlayback extends Playback {
  private options: PlaybackOptions;
  private video: HTMLVideoElement | null = null;
  private hls: Hls | null = null;
  private hlsConfig: any = {};

  constructor(core: any, options: PlaybackOptions) {
    super(core);
    this.options = options;
    this.setup();
  }

  private setup(): void {
    // Configurações específicas do HLS.js
    this.hlsConfig = {
      enableWorker: true,
      liveBackBufferLength: 90,
      lowLatencyMode: true,
      capLevelToPlayerSize: true,
      enableWebVTT: false,
      ...(this.options.hlsConfig || {}) // permite sobrescrever via PlaybackOptions
    };
    console.log("Configurações específicas para HLSPlayback:", this.hlsConfig);
  }

  load(src: string): void {
    if (this.video && this.video.parentNode) {
      this.video.parentNode.removeChild(this.video);
    }
    this.video = document.createElement('video');
    this.video.controls = true;
    this.video.width = 640;
    this.video.height = 360;
    document.body.appendChild(this.video);
    this.hls = new Hls(this.hlsConfig);

    // Eventos do HLS.js
    const events = [
      'MEDIA_ATTACHED',
      'MANIFEST_PARSED',
      'LEVEL_LOADED',
      'FRAG_LOADING',
      'FRAG_LOADED',
      'BUFFER_APPENDING',
      'BUFFER_APPENDED'
    ];
    events.forEach(eventName => {
      // @ts-ignore
      this.hls.on(Hls.Events[eventName], (event, data) => {
        console.log(`[HLS.js] Evento: ${eventName}`, data);
      });
    });

    this.hls.loadSource(src);
    this.hls.attachMedia(this.video);
  }

  play(): void {
    if (this.video) {
      this.video.play();
    } else {
      console.log("Nenhum vídeo carregado para reproduzir.");
    }
  }

  static canPlay(src: string): boolean {
    console.log("Verificando se pode reproduzir:", src);
    return src.endsWith('.m3u8');
  }
}

export default HLSPlayback;
