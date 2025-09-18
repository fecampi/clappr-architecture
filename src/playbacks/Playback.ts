import BaseObject from "../base/BaseObject";
import { PlaybackOptions, PlaybackInstance, PlaybackState, ReadyState, NetworkState } from "./Interfaces";
import { MediaType } from "../enums/MediaType";

class Playback extends BaseObject implements PlaybackInstance {
  protected core: any;
  public duration: number = 0;
  public currentTime: number = 0;
  public volume: number = 1;
  public muted: boolean = false;
  public paused: boolean = true;
  public buffered: TimeRanges | null = null;
  public played: TimeRanges | null = null;
  public seekable: TimeRanges | null = null;
  public readyState: ReadyState = ReadyState.HAVE_NOTHING;
  public networkState: NetworkState = NetworkState.NETWORK_EMPTY;
  public state: PlaybackState = PlaybackState.IDLE;
  public mediaType: MediaType = MediaType.UNKNOWN;

  constructor(core: any) {
    super();
    this.core = core;
    this.initialize();
  }

  protected initialize(): void {
    this.bindEvents();
  }

  protected bindEvents(): void {
    this.listenTo(this.core, "player:play", this.onPlay.bind(this));
    this.listenTo(this.core, "player:pause", this.onPause.bind(this));
    this.listenTo(this.core, "player:stop", this.onStop.bind(this));
  }

  load(src: string): void {
    console.log("Carrega a mídia (implementação específica na subclasse)");
    this.trigger("playback:load", src);
  }

  play(): void {
    console.log("Inicia a reprodução da mídia");
    this.trigger("playback:play");
  }

  pause(): void {
    console.log("Pausa a reprodução da mídia");
    this.trigger("playback:pause");
  }

  stop(): void {
    console.log("Para a reprodução da mídia");
    this.trigger("playback:stop");
  }

  seek(time: number): void {
    console.log("Buscando para tempo:", time);
    this.currentTime = time;
    this.trigger("playback:seek", time);
  }

  setVolume(volume: number): void {
    console.log("Definindo volume para:", volume);
    this.volume = Math.max(0, Math.min(1, volume));
    this.trigger("playback:volumechange", this.volume);
  }

  mute(): void {
    console.log("Mutando playback");
    this.muted = true;
    this.trigger("playback:volumechange", this.volume);
  }

  unmute(): void {
    console.log("Desmutando playback");
    this.muted = false;
    this.trigger("playback:volumechange", this.volume);
  }

  protected onPlay(): void {
    console.log("Evento de play recebido no Playback");
    this.paused = false;
    this.state = PlaybackState.PLAYING;
    this.trigger("playback:play");
  }

  protected onPause(): void {
    console.log("Evento de pause recebido no Playback");
    this.paused = true;
    this.state = PlaybackState.PAUSED;
    this.trigger("playback:pause");
  }

  protected onStop(): void {
    console.log("Evento de stop recebido no Playback");
    this.trigger("playback:stop");
  }
}

export default Playback;
