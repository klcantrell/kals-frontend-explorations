import { html } from '../../js/utils';
import logo from '../imgs/logo.png?sizes=400w+200w';

export const p2Markup = html`
	<div class="background single-column">
		<p>I'm portfolio 2's external html</p>
		<img class="logo" 
			srcset='${logo.srcSet}'
			src='${logo.sources['400w']}'
			sizes="(max-width: 700px) 200px, 400px" alt="meteor">
		<button id="p2btn" class="cool-btn">Yo</button>
	</div>
`;