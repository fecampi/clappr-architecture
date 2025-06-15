import UIPlugin from "../plugins/UIPlugin/HTML/UIPlugin";

class Container {
  element: HTMLElement;

  constructor() {
    console.log("[Container] Container criado");
    this.element = document.createElement("div");
    this.element.className = "player-container";
    console.log("[Container] Elemento criado:", this.element);
  }


  addUIPlugin(plugin) {
    console.log("[Container] Adicionando plugin UI ao container:", plugin.constructor.name);
    const pluginElement = plugin.render();
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
}

export default Container;
