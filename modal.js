const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
  .wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0;
  visibility: hidden;
  transform: scale(1.1);
  transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
  z-index: 1;
}
.visible {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
}
.modal {
  font-family: Helvetica;
  font-size: 14px;
  padding: 10px 10px 5px 10px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 2px;
  min-width: 300px;
}
.title {
  font-size: 18px;
}
.button-container {
  text-align: right;
}
button {
  min-width: 80px;
  background-color: #848e97;
  border-color: #848e97;
  border-style: solid;
  border-radius: 2px;
  padding: 3px;
  color:white;
  cursor: pointer;
}
button:hover {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>

<div class='wrapper visible'>
  <div class='modal'>
    <span class='title'>Titulo</span>
    <div class='content'>
      <slot></slot>
    </div>
    <div class='button-container'>
      <button class='cancel'>Cancel</button>
      <button class='ok'>Okay</button>
    </div>
  </div>
</div>
`

class Modal extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({"mode": "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes () {
    return ["title", "visible"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.shadowRoot.querySelector(".title").textContent = newValue;
    } else if (name === "visible") {
      if (newValue === null) {
        this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
      } else {
        this.shadowRoot.querySelector(".wrapper").classList.add("visible");
      }
    }
  }

  connectedCallback () {
    const cancelButton = this.shadowRoot.querySelector(".cancel");
    cancelButton.addEventListener("click", e => {
      this.removeAttribute("visible");
    });
    const okButton = this.shadowRoot.querySelector(".ok");
    okButton.addEventListener("click", e => {
      this.removeAttribute("visible");
    });
  }

  disconectedCallback() {
    const cancelButton = this.shadowRoot.querySelector(".cancel");
    cancelButton.removeEventListener();
    const okButton = this.shadowRoot.querySelector(".ok");
    okButton.removeEventListener();
  }
}

window.customElements.define("mi-modal", Modal);