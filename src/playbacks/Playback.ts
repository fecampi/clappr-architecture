import BaseObject from "../base/BaseObject";
import { CoreInterface } from "../core/Interfaces";

class Playback extends BaseObject {
  protected core: BaseObject & CoreInterface;

  constructor(core: BaseObject & CoreInterface) {
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

  protected onPlay(): void {
    console.log("Evento de play recebido no Playback");
    this.trigger("playback:play");
  }

  protected onPause(): void {
    console.log("Evento de pause recebido no Playback");
    this.trigger("playback:pause");
  }

  protected onStop(): void {
    console.log("Evento de stop recebido no Playback");
    this.trigger("playback:stop");
  }
}

export default Playback;
