const html = (literals, ...customs) => {
  let result = '';
  customs.forEach((custom, i) => {
    let lit = literals[i];
    if (Array.isArray(custom)) {
      custom = custom.join('');
    }
    result += lit;
    result += custom;
  });
  result += literals[literals.length - 1];
  return result;
};

const card = data => {
  return html`
    <div class="card">
      <h1>Page Info</h1>
      <p>This page is about ${data.description}</p>
      <div class="card__controls">
        <a href="#/portfolio/portfolio${data.page}">Learn more</a>
        <button id="closeCard">Close</button>
      </div>
    </div>
  `;
}


const portfolio = data => {
  return html`
    <div class="portfolio">
      <h1>Hey I'm Page ${data.page}</h1>
      <p>My info is ${data.info}</p>
      ${data.content}
      <button id="returnHome">Return</button>
    </div>
  `;
};

const home = () => {
  return html`
    <nav class="projectList">
        <a class="projectList__link" data-hash="#/cards/portfolio1">Portfolio Item 1</a>
        <a class="projectList__link" data-hash="#/cards/portfolio2">Portfolio Item 2</a>
    </nav>
    <section id="cardRoot" class="cardRoot cardRoot--hide">
    </section>
  `;
}

export { card, portfolio, home };