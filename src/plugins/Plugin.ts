import { PluginInstance } from "./Interfaces";

class Plugin implements PluginInstance {
  protected core: any;
  public enabled: boolean = false;

  constructor(core: any) {
    this.core = core;
    this.enable(); // Habilita automaticamente ao criar
  }

  enable(): void {
    if (!this.enabled) {
      this.enabled = true;
      console.log("Plugin habilitado:", this.constructor.name);
      this.onEnable();
    }
  }

  disable(): void {
    if (this.enabled) {
      this.enabled = false;
      console.log("Plugin desabilitado:", this.constructor.name);
      this.onDisable();
    }
  }

  destroy(): void {
    this.disable();
    console.log("Plugin destruído:", this.constructor.name);
    this.onDestroy();
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // Métodos do ciclo de vida para subclasses implementarem
  public onEnable(): void {
    // Implementação nas subclasses
  }

  public onDisable(): void {
    // Implementação nas subclasses
  }

  public onDestroy(): void {
    // Implementação nas subclasses
  }
}

export default Plugin;
