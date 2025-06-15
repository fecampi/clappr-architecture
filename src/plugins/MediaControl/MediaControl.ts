import UIPlugin from "../UIPlugin/HTML/UIPlugin";
import { CoreInterface } from "../../core/Interfaces";

class MediaControl extends UIPlugin {
  core: CoreInterface;
  private statusTextElement: HTMLElement | null = null;

  constructor(core: CoreInterface) {
    super(core);
    this.core = core;
    this.bindEvents();
  }

  create() {
    const row = this.add.container({
      styles: {
        display: "flex",
        gap: "10px",
        marginTop: "20px",
      },
    });

    row.add.button({
      text: "Play",
      onClick: () => {
        this.core.trigger("player:play");
        this.updateStatus("Play pressionado");
      },
      styles: {
        margin: "10px",
        padding: "8px 16px",
        fontSize: "14px",
      },
    });

    row.add.button({
      text: "Pause",
      onClick: () => {
        this.core.trigger("player:pause");
        this.updateStatus("Pause pressionado");
      },
      styles: {
        margin: "10px",
        padding: "8px 16px",
        fontSize: "14px",
      },
    });

    row.add.button({
      text: "Stop",
      onClick: () => {
        this.core.trigger("player:stop");
        this.updateStatus("Stop pressionado");
      },
      styles: {
        margin: "10px",
        padding: "8px 16px",
        fontSize: "14px",
      },
    });

    row.add.button({
      text: " ",
      onClick: () => {
        this.updateStatus("Mosaic");
      },
      styles: {
        margin: "10px",
        padding: "8px 16px",
        fontSize: "14px",
        backgroundColor: "transparent", 
        border: "2px solid #007BFF",
        borderRadius: "4px", 
      },
    });

    this.statusTextElement = this.add.text({
      text: "Status: pronto para tocar",
      as: "p",
      styles: {
        color: "black",
        fontWeight: "bold",
        marginTop: "20px",
      },
    });
  }

  bindEvents(): void {
    this.core.on("player:play", this.onPlay.bind(this));
    this.core.on("player:pause", this.onPause.bind(this));
  }

  onPlay(): void {
    console.log("Evento de play recebido");
  }

  onPause(): void {
    console.log("Evento de pause recebido");
  }

  updateStatus(text: string) {
    if (this.statusTextElement) {
      this.statusTextElement.textContent = `Status: ${text}`;
    }
  }
}

export { MediaControl };
