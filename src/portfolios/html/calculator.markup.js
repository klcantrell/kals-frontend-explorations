import { html } from '../../js/utils';

export const calculatorMarkup = html`
  <section>
    <div class="scene">
      <div class="object">
        <figure class="front-side">
          <div class="display">
            <p id="output">0</p>
            <p id="queue"></p>
          </div>
          <div class="nums-ops">
            <div class="left-side">
              <p class="clear top-ops">AC</p>
              <p class="top-ops">/</p>
              <p class="top-ops">X</p>
              <p class="number">1</p>
              <p class="number">2</p>
              <p class="number">3</p>
              <p class="number">4</p>
              <p class="number">5</p>
              <p class="number">6</p>
              <p class="number">7</p>
              <p class="number">8</p>
              <p class="number">9</p>
              <p class="number" id="zero">0</p>
              <p class="number">.</p>
            </div>
            <div class="right-side">
              <p id="minus">-</p>
              <p id="plus">+</p>
              <p id="equals">=</p>
            </div>
          </div>
        </figure>
        <figure class="back-side">
          <div class="back-texture"></div>
        </figure>
        <figure class="left-side-3D"></figure>
        <figure class="right-side-3D"></figure>
      </div>
    </div>
  </section>
`;