export type UITextOptions = {
  as?: keyof HTMLElementTagNameMap; // tag HTML (h1, h2, p, span, etc)
  text: string;
  className?: string;
  id?: string;
  styles?: Partial<CSSStyleDeclaration>;
};

class UIText {
  private _element: HTMLElement;

  constructor(options: UITextOptions) {
    const { as = "span", text, className, id, styles } = options;

    this._element = document.createElement(as);
    this._element.textContent = text;

    if (className) this._element.className = className;
    if (id) this._element.id = id;
    if (styles) Object.assign(this._element.style, styles);
  }

  get element(): HTMLElement {
    return this._element;
  }

  destroy(): void {
    this._element.remove();
  }
}

export { UIText };
