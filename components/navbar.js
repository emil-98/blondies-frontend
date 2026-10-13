class Navbar extends HTMLElement {
  constructor() {
    super();
    this._onKeydown = this._onKeydown.bind(this);
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="logo">
        <a href="#home">
          <img src="../assets/blondies_logo.svg" alt="Blondies">
        </a>
      </div>
      <button class="menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>
      <nav id="nav-links">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#order">Order</a></li>
          <li><a href="#lore">Lore</a></li>
        </ul>
      </nav>`;

    this._btn = this.querySelector('.menu-toggle');

    this._btn.addEventListener('click', () =>
      this._setOpen(!this.classList.contains('open')));

    // close the menu after choosing a link
    this.querySelectorAll('nav a').forEach((a) =>
      a.addEventListener('click', () => this._setOpen(false)));

    document.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._onKeydown);
  }

  _onKeydown(e) {
    if (e.key === 'Escape') this._setOpen(false);
  }

  _setOpen(open) {
    this.classList.toggle('open', open);
    this._btn?.setAttribute('aria-expanded', String(open));
  }
}

customElements.define('nav-bar', Navbar);