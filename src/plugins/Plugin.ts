import {CoreInterface} from "../core/Interfaces"

class Plugin {
  protected core: CoreInterface;

  constructor(core: CoreInterface) {
    this.core = core;
  }

  enable(): void {
    console.log("Habilita o plugin");
  }
}

export default Plugin;
