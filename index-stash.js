import 'https://cdn.skypack.dev/construct-style-sheets-polyfill';

/** Demo code */
const bgPurple = new CSSStyleSheet();
const everythingTomato = new CSSStyleSheet();

bgPurple.replace(`h1 { background: purple; }`);
everythingTomato.replace(`* { color: tomato; }`);


document.adoptedStyleSheets = [everythingTomato, bgPurple];

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const color = document.querySelector('[name="selectTextColor"]').value || '#000000';
  const fontFamily = document.querySelector('[name="font"]').value || 'Times New Roman';
  
  everythingTomato.replace(`
    * {
      color: ${color};
      font-family: "${fontFamily}";
    }
  `).then(console.log);
});


class TestEl extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [bgPurple];
  }
  
  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>
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
        <p>Lorem Ipsum</p>
      </div>

      <div class='button-container'>
        <button class='cancel'>Cancel</button>
        <button class='ok'>Okay</button>
      </div>
    </div>
  </div>`;
    
    setTimeout(() => {
      this.shadowRoot.adoptedStyleSheets = [];
    }, 3000)
  }
}

customElements.define('test-el', TestEl);

// const c = new TestEl
// document.body.appendChild(c);
