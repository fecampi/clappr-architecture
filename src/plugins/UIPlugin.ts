import Plugin from "./Plugin";
import { UIPluginInstance } from "./Interfaces";

class UIPlugin extends Plugin {
  protected core: any;
  public element: HTMLElement | null = null;

  constructor(core: any) {
    super(core);
    this.core = core;
  }

  render(): HTMLElement | void {
    // Método abstrato a ser implementado nas subclasses
    console.log("Renderizando UIPlugin:", this.constructor.name);
  }

  public onEnable(): void {
    super.onEnable();
    const renderedElement = this.render();
    if (renderedElement instanceof HTMLElement) {
      this.element = renderedElement;
    }
  }

  public onDisable(): void {
    super.onDisable();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }

  public onDestroy(): void {
    super.onDestroy();
    this.element = null;
  }

  getElement(): HTMLElement | null {
    return this.element;
  }
}

export default UIPlugin;
