import 'https://cdn.skypack.dev/construct-style-sheets-polyfill';


const styles = /*css*/`
.user-card {
  font-family: 'Arial', sans-serif;
  background: #f4f4f4;
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: slategrey 5px solid;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.user-card img {
  max-width: 100%;
  width: auto;
  height: 160px;
  object-fit: contain;
}

.user-card button {
  cursor: pointer;
  background: slategrey;
  color: #fff;
  border: 0;
  border-radius: 1px;
  padding: 5px 10px;
}

.info-wrapper {
  flex: 1;
  margin-left: 10%;
}
`

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);
console.log(sheet);
const template = document.createElement('template');
template.innerHTML = /*html*/`
  <div class="user-card">
    <img />
    <div class="info-wrapper">
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [sheet]
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if(this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);