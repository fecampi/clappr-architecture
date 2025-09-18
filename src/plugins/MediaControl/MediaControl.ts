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
    this.core.on("playback:play", this.onPlay.bind(this));
    this.core.on("playback:pause", this.onPause.bind(this));
  }

  render(): HTMLElement {
    console.log("Renderizando controles de mídia");

    const playPauseButton = document.createElement("button");
    playPauseButton.innerText = "Play/Pause";
    playPauseButton.addEventListener("click", this.togglePlayPause.bind(this));

    // Armazenar referência ao elemento
    this.element = playPauseButton;

    return playPauseButton;
  }

  protected onEnable(): void {
    super.onEnable();
    console.log("MediaControl habilitado");
  }

  protected onDisable(): void {
    super.onDisable();
    console.log("MediaControl desabilitado");
  }

  protected onDestroy(): void {
    super.onDestroy();
    console.log("MediaControl destruído");
  }

  togglePlayPause(): void {
    console.log("Play/Pause button clicked");
    if (this.core.isPlaying()) {
      this.core.pause();
    } else {
      this.core.play();
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
