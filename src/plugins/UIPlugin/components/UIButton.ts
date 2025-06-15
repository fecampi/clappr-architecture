export type UIButtonOptions = {
  text: string;
  onClick: () => void;
  className?: string;
  id?: string;
  styles?: Partial<CSSStyleDeclaration>;
};

class UIButton {
  private button: HTMLButtonElement;
  private onClick: () => void; 

  constructor(options: UIButtonOptions) {
    const { text, onClick, className, id, styles } = options;

    this.button = document.createElement("button");
    this.button.innerText = text;

    this.onClick = onClick; 
    this.button.addEventListener("click", this.onClick);

    if (className) this.button.className = className;
    if (id) this.button.id = id;
    if (styles) Object.assign(this.button.style, styles);
  }

  get element(): HTMLButtonElement {
    return this.button;
  }

  destroy(): void {
    this.button.removeEventListener("click", this.onClick);
    this.button.remove();
  }
}

export { UIButton };
