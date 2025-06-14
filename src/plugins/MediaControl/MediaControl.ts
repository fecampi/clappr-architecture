import UIPlugin from "../UIPlugin";
import { CoreInterface } from "../../core/Interfaces";

class MediaControl extends UIPlugin {
  core: CoreInterface;

  constructor(core: CoreInterface) {
    super(core);
    this.core = core;
    this.bindEvents();
  }

  bindEvents(): void {
    this.core.on("player:play", this.onPlay.bind(this));
    this.core.on("player:pause", this.onPause.bind(this));
  }

  render(): void {
    console.log("Renderizando controles de mídia");

    const playPauseButton = document.createElement("button");
    playPauseButton.innerText = "Play/Pause";
    playPauseButton.addEventListener("click", this.togglePlayPause.bind(this));

    document.body.appendChild(playPauseButton);
  }

  togglePlayPause(): void {
    console.log("Play/Pause button clicked");
    if (this.core.isPlaying()) {
      this.core.pause();
      this.core.trigger("player:pause");
    } else {
      this.core.play();
      this.core.trigger("player:play");
    }
  }

  onPlay(): void {
    console.log("Evento de play recebido");
  }

  onPause(): void {
    console.log("Evento de pause recebido");
  }
}

export { MediaControl };
