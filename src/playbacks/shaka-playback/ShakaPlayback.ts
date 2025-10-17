import Playback from "../Playback";
import { PlaybackOptions } from "../Interfaces";

// Função utilitária para carregar o script do Shaka Player dinamicamente
function loadShakaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).shaka) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.3.6/shaka-player.compiled.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar o script do Shaka Player'));
    document.head.appendChild(script);
  });
}

class ShakaPlayback extends Playback {
  private options: PlaybackOptions;
  private video: HTMLVideoElement | null = null;
  private player: any = null;

  constructor(core: any, options: PlaybackOptions) {
    super(core);
    this.options = options;
    this.setup();
  }

  private setup(): void {
    console.log("Configurações específicas para ShakaPlayback");
  }

  async load(src: string): Promise<void> {
    await loadShakaScript();
    // @ts-ignore
    const shaka = (window as any).shaka;
    // Verifica se o Shaka está disponível
    if (!shaka || !shaka.Player) {
      console.error('Shaka Player não está disponível. Verifique se o script foi incluído corretamente.');
      return;
    }
    // Instala polyfills
    if (shaka.polyfill) {
      shaka.polyfill.installAll();
    }
    // Verifica suporte do navegador
    if (!shaka.Player.isBrowserSupported()) {
      console.error('Shaka Player não é suportado neste navegador.');
      return;
    }
    if (this.video && this.video.parentNode) {
      this.video.parentNode.removeChild(this.video);
    }
    this.video = document.createElement('video');
    this.video.controls = true;
    this.video.width = 640;
    this.video.height = 360;
    document.body.appendChild(this.video);

    // Inicializa o Shaka Player
    this.player = new shaka.Player(this.video);

    // Mapeia eventos principais 
    this.player.addEventListener('error', (event: any) => {
      console.error('[Shaka] Erro:', event.detail);
    });
    this.player.addEventListener('adaptation', () => {
      console.log('[Shaka] Adaptation event (mudança de qualidade)');
    });
    this.player.addEventListener('buffering', (event: any) => {
      console.log('[Shaka] Buffering:', event.buffering);
    });
    this.player.addEventListener('trackschanged', () => {
      console.log('[Shaka] Tracks changed');
    });
    this.player.addEventListener('loading', () => {
      console.log('[Shaka] Loading manifest');
    });
    this.player.addEventListener('loaded', () => {
      console.log('[Shaka] Manifest loaded');
    });


    // Carrega o vídeo
    this.player.load(src).then(() => {
      console.log('[Shaka] Vídeo carregado:', src);
    }).catch((e: any) => {
      console.error('[Shaka] Falha ao carregar vídeo:', e);
    });
  }

  play(): void {
    if (this.video) {
      this.video.play();
    } else {
      console.log("Nenhum vídeo carregado para reproduzir.");
    }
  }

  static canPlay(src: string): boolean {
    // DASH (.mpd) e HLS (.m3u8) suportados pelo Shaka
    return src.endsWith('.mpd') || src.endsWith('.m3u8');
  }
}

export default ShakaPlayback;
