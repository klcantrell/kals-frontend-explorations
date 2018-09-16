import { html } from './utils';

const card = data => {
  return html`
    <div class="card">
      <h1>Page Info</h1>
      <p>This page is about ${data.description}</p>
      <div class="card__controls">
        <a href="#/portfolio/${data.name}">Learn more</a>
        <button id="closeCard">Close</button>
      </div>
    </div>
  `;
}


const portfolio = data => {
  return html`
    <style>${data.styles.toString()}</style>
    <div class="portfolio">
      <h1>Hey I'm Page ${data.name}</h1>
      <div class="portfolio__controls">
        <p>My info is ${data.info}</p>
        <button id="returnHome">Return</button>
      </div>
      ${data.html}
    </div>
  `;
};

const home = () => {
  return html`
    <nav class="projectList">
        <a class="projectList__link" data-hash="#/cards/p1">Fake Portfolio Item 1</a>
        <a class="projectList__link" data-hash="#/cards/p2">Fake Portfolio Item 2</a>
        <a class="projectList__link" data-hash="#/cards/p3">Tic Tac Toe</a>
        <a class="projectList__link" data-hash="#/cards/p4">Calculator</a>
    </nav>
    <section id="cardRoot" class="cardRoot cardRoot--hide">
    </section>
  `;
}

export { card, portfolio, home };