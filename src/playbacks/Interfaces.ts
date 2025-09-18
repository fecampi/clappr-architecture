import { CoreInterface } from "../core/Interfaces";
import { MediaType } from "../enums/MediaType";

// Opções de configuração para playbacks
export interface PlaybackOptions {
  src?: string;
  volume?: number;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  mediaType?: MediaType;
  [key: string]: any;
}

// Interface para construtores de classes de playback
export interface PlaybackConstructor {
  new (core: any, options: PlaybackOptions): PlaybackInstance;
  canPlay?(src: string): boolean;
  name: string;
}

// Interface que define a API de uma instância de playback
export interface PlaybackInstance {
  // Propriedades essenciais
  duration: number;
  currentTime: number;
  volume: number;
  muted: boolean;
  paused: boolean;
  buffered: TimeRanges | null;
  played: TimeRanges | null;
  seekable: TimeRanges | null;
  readyState: ReadyState;
  networkState: NetworkState;
  state: PlaybackState;
  mediaType: MediaType;

  // Métodos obrigatórios
  load?(src: string): void;
  play(): void;
  pause(): void;
  stop(): void;
  seek(time: number): void;
  setVolume(volume: number): void;
  mute(): void;
  unmute(): void;

  // Referência ao construtor para identificação
  constructor: { name: string };
}

// Tipos utilitários para playbacks
export type PlaybackType = 'html5' | 'hls' | 'dash' | 'unknown';

// Estados de reprodução
export enum PlaybackState {
  IDLE = 'idle',
  LOADING = 'loading',
  PLAYING = 'playing',
  PAUSED = 'paused',
  ENDED = 'ended',
  ERROR = 'error'
}

// Estados de rede (baseado em HTML5 MediaElement)
export enum NetworkState {
  NETWORK_EMPTY = 0,
  NETWORK_IDLE = 1,
  NETWORK_LOADING = 2,
  NETWORK_NO_SOURCE = 3
}

// Estados de pronto (baseado em HTML5 MediaElement)
export enum ReadyState {
  HAVE_NOTHING = 0,
  HAVE_METADATA = 1,
  HAVE_CURRENT_DATA = 2,
  HAVE_FUTURE_DATA = 3,
  HAVE_ENOUGH_DATA = 4
}

export interface PlaybackCapabilities {
  canPlay: boolean;
  supportedFormats: string[];
  features: {
    seek: boolean;
    volume: boolean;
    fullscreen: boolean;
    subtitles: boolean;
  };
}
