import { html } from '../../js/utils';
import cloud from '../imgs/cloud.jpg?sizes=400w+200w';

export const p1Markup = html`
	<div class="background single-column">
		<p>I'm portfolio 1's external html</p>
		<img class="heroPic" 
			srcset='${cloud.srcSet}'
			src='${cloud.sources['400w']}'
			sizes="(max-width: 700px) 200px, 400px" alt="cloud strife">
		<button id="p1btn" class="cool-btn">Sup</button>
	</div>
`;