class FitHeadline extends HTMLElement {
  connectedCallback() {
    this._measure = this._measure.bind(this);
    (document.fonts?.ready ?? Promise.resolve()).then(this._measure);
    window.addEventListener('resize', this._measure);
    this._resizeObserver = new ResizeObserver(this._measure);
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._measure);
    this._resizeObserver?.disconnect();
  }

  _measure() {
    const topLine = this.querySelector('.top-line');
    const subtitle = this.querySelector('.subtitle');
    if (!topLine || !subtitle) return;

    const targetWidth = subtitle.getBoundingClientRect().width;
    if (targetWidth === 0) return;

    const baseline = 100;
    topLine.style.fontSize = baseline + 'px';
    const measuredWidth = topLine.getBoundingClientRect().width;
    if (measuredWidth === 0) return;

    topLine.style.fontSize = baseline * (targetWidth / measuredWidth) + 'px';
  }
}

customElements.define('fit-headline', FitHeadline);