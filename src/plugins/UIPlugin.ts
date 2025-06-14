import Plugin from "./Plugin";
import { CoreInterface } from "../core/Interfaces";

class UIPlugin extends Plugin {
  protected core: CoreInterface;

  constructor(core: CoreInterface) {
    super(core);
    this.core = core;
  }

  render(): void {
 
  }
}

export default UIPlugin;
