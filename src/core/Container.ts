import UIPlugin from "../plugins/UIPlugin";

class Container {
  element: HTMLElement;
  playback: any; // Playback associado a este container

  constructor() {
    console.log("[Container] Container criado");
    this.element = document.createElement("div");
    this.element.className = "player-container";
    console.log("[Container] Elemento criado:", this.element);
    this.playback = null;
  }


  addUIPlugin(plugin: UIPlugin): void {
    console.log("[Container] Adicionando plugin UI ao container:", plugin.constructor.name);
    const pluginElement = (plugin as any).render();
    console.log("[Container] Elemento do plugin:", pluginElement);
    if (pluginElement instanceof HTMLElement) {
      this.element.appendChild(pluginElement);
      console.log("[Container] Plugin adicionado ao container DOM");
    } else {
      console.warn("[Container] O render do plugin não retornou um HTMLElement");
    }
  }

  removeUIPlugin(plugin: UIPlugin): void {
    const el = plugin.render?.();
    if (el !== null && el !== undefined && this.element.contains(el)) {
      console.log("[Container] Removendo plugin UI do container");
      this.element.removeChild(el);
    }
  }

  setPlayback(playback: any): void {
    console.log("[Container] Definindo playback:", playback?.constructor?.name);
    this.playback = playback;
  }

  getPlayback(): any {
    return this.playback;
  }
}

export default Container;
