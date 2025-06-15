import { UIButton, UIButtonOptions } from "./UIButton";
import { UIText, UITextOptions } from "./UIText";

class UIContainer {
  private element: HTMLDivElement;
  private children: Array<{ destroy?: () => void }> = [];

  constructor(options?: {
    className?: string;
    styles?: Partial<CSSStyleDeclaration>;
  }) {
    this.element = document.createElement("div");
    if (options?.className) this.element.className = options.className;
    if (options?.styles) Object.assign(this.element.style, options.styles);


    this.add = {
      button: (options: UIButtonOptions) => {
        const btn = new UIButton(options);
        this.element.appendChild(btn.element);
        this.children.push(btn);
        return btn.element;
      },
      text: (options: UITextOptions) => {
        const txt = new UIText(options);
        this.element.appendChild(txt.element);
        this.children.push(txt);
        return txt.element;
      },
      append: (...elements: HTMLElement[]) => {
        elements.forEach(el => this.element.appendChild(el));
      }
    };
  }

  public readonly add: {
    button: (options: UIButtonOptions) => HTMLButtonElement;
    text: (options: UITextOptions) => HTMLElement;
    append: (...elements: HTMLElement[]) => void;
  };

  public get domElement(): HTMLDivElement {
    return this.element;
  }

  public destroy(): void {
    for (const child of this.children) {
      child?.destroy?.();
    }
    this.element.remove();
    this.children = [];
  }
}

export { UIContainer };
