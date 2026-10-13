class Navbar extends HTMLElement {
  constructor(){
    super();
  }

  connectedCallback(){
    this.innerHTML = `<div class="logo">
      <a href="#home">
        <img src="../assets/blondies_logo.svg">
      </a>
    </div>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#order">Order</a></li>
        <li><a href="#lore">Lore</a></li>
      </ul>
    </nav>`
  }
}

customElements.define('nav-bar', Navbar);