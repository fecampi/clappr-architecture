import Plugin from "../../Plugin";
import { CoreInterface } from "../../../core/Interfaces";
import { UIButton, UIButtonOptions } from "./components/UIButton";
import { UIText, UITextOptions } from "./components/UIText";
import { UIContainer } from "./components/UIContainer";

interface FocusableComponent {
  element: HTMLElement;
  focus?: () => void;
  destroy?: () => void;
}

class UIPlugin extends Plugin {
  protected core: CoreInterface;
  protected components: FocusableComponent[] = [];
  protected container: HTMLElement;

  public add = {
    button: (props: UIButtonOptions): HTMLElement => {
      const playPauseButton = new UIButton(props);
      this.components.push(playPauseButton);
      return playPauseButton.element;
    },
    component: (component: FocusableComponent): HTMLElement => {
      return this.addComponent(component);
    },
    text: (props: UITextOptions): HTMLElement => {
      const textComponent = new UIText(props);
      this.components.push(textComponent);
      return textComponent.element;
    },
    container: (props?: {
      className?: string;
      styles?: Partial<CSSStyleDeclaration>;
    }): UIContainer => {
      const container = new UIContainer(props);
      this.components.push({
        element: container.domElement,
        destroy: () => container.destroy(),
      });
      return container;
    },
  };

  constructor(core: CoreInterface) {
    super(core);
    this.core = core;

    this.container = document.createElement("div");
    this.container.className = "ui-container";
    document.body.appendChild(this.container);
  }

  private addComponent(component: FocusableComponent): HTMLElement {
    this.components.push(component);
    return component.element;
  }

  create(): void {}

  render(): void {
    if (typeof this.create === "function") {
      (this as any).create();
    }
    this.container.innerHTML = "";
    this.components.forEach((component) => {
      this.container.appendChild(component.element);
    });
  }

  destroy(): void {
    for (const component of this.components) {
      if (typeof component.destroy === "function") {
        component.destroy();
      }
    }

    this.container.remove();
    this.components = [];
  }
}

export default UIPlugin;
