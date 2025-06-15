import Plugin from "../../Plugin";
import { CoreInterface } from "../../../core/Interfaces";

interface FocusableComponent {
  element: any; 
  focus?: () => void;
  destroy?: () => void;
}

class UINativePlugin extends Plugin {
  protected core: CoreInterface;
  protected components: FocusableComponent[] = [];
  protected container: any; 
  public add = {
    button: (props: any): any => {
      const playPauseButton = {
        element: { type: "UIButton", props },
        destroy: () => {},
      };
      this.components.push(playPauseButton);
      return playPauseButton.element;
    },
    component: (component: FocusableComponent): any => {
      return this.addComponent(component);
    },
    text: (props: any): any => {
      const textComponent = {
        element: { type: "UIText", props },
        destroy: () => {},
      };
      this.components.push(textComponent);
      return textComponent.element;
    },
    container: (props?: {
      className?: string;
      styles?: Partial<Record<string, any>>;
    }): any => {
      const container = {
        domElement: { type: "UIContainer", props },
        destroy: () => {},
      };
      this.components.push({
        element: container.domElement,
        destroy: container.destroy,
      });
      return container;
    },
  };

  constructor(core: CoreInterface) {
    super(core);
    this.core = core;

    this.container = {
      className: "ui-container-mock",
      children: [] as any[],
      appendChild: (child: any) => {
        this.container.children.push(child);
      },
      remove: () => {
        this.container.children = [];
      },
    };
  }

  private addComponent(component: FocusableComponent): any {
    this.components.push(component);
    return component.element;
  }

  create(): void {}

  render(): void {
    if (typeof this.create === "function") {
      (this as any).create();
    }
    this.container.children = [];
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

export default UINativePlugin;
