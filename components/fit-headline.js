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

    const hero = this.closest('.hero-page') ?? this.parentElement;
    const available = hero.clientWidth * 0.9;   // leave a little margin

    // 1. Start from the CSS-defined subtitle size
    subtitle.style.fontSize = '';
    let targetWidth = subtitle.getBoundingClientRect().width;
    if (targetWidth === 0) return;

    // 2. If it's too wide for the hero, shrink it proportionally
    if (targetWidth > available) {
      const current = parseFloat(getComputedStyle(subtitle).fontSize);
      subtitle.style.fontSize = current * (available / targetWidth) + 'px';
      targetWidth = subtitle.getBoundingClientRect().width;
    }

    // 3. Fit the top line to the subtitle's width (as before)
    const baseline = 100;
    topLine.style.fontSize = baseline + 'px';
    const measuredWidth = topLine.getBoundingClientRect().width;
    if (measuredWidth === 0) return;
    topLine.style.fontSize = baseline * (targetWidth / measuredWidth) + 'px';

    const subSize = parseFloat(getComputedStyle(subtitle).fontSize);
    hero.style.setProperty('--sub-size', subSize + 'px');
  }
}

customElements.define('fit-headline', FitHeadline);