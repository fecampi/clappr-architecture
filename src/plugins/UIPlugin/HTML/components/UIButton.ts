export type UIButtonOptions = {
  text: string;
  onClick: () => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  className?: string;
  id?: string;
  styles?: Partial<CSSStyleDeclaration>;
};

class UIButton {
  private button: HTMLButtonElement;
  private onClick: () => void;
  private onFocus?: (e: FocusEvent) => void;
  private onBlur?: (e: FocusEvent) => void;

  constructor(options: UIButtonOptions) {
    const { text, onClick, onFocus, onBlur, className, id, styles } = options;

    this.button = document.createElement("button");
    this.button.innerText = text;

    this.onClick = onClick;
    this.onFocus = onFocus;
    this.onBlur = onBlur;

    this.button.addEventListener("click", this.onClick);

    if (this.onFocus) {
      this.button.addEventListener("focus", this.onFocus);
    }

    if (this.onBlur) {
      this.button.addEventListener("blur", this.onBlur);
    }

    if (className) this.button.className = className;
    if (id) this.button.id = id;
    if (styles) Object.assign(this.button.style, styles);
  }

  get element(): HTMLButtonElement {
    return this.button;
  }

  destroy(): void {
    this.button.removeEventListener("click", this.onClick);

    if (this.onFocus) {
      this.button.removeEventListener("focus", this.onFocus);
    }

    if (this.onBlur) {
      this.button.removeEventListener("blur", this.onBlur);
    }

    this.button.remove();
  }
}

export { UIButton };
