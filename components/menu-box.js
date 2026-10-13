class ItemBox extends HTMLElement {
  constructor(imgPath, title, subtitle, description){
    super();
    this.imgPath = imgPath;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
  }

  connectedCallback(){
    this.innerHTML = ``
  }
}

customElements.define('item-box', ItemBox);