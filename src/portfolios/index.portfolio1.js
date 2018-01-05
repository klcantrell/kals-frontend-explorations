import { p1Markup } from './html/portfolio1.markup';
import p1script from './js/portfolio1';
import p1styles from './css/portfolio1.css';

export default function p1() {
	return {
		html: p1Markup,
		script: p1script,
		styles: p1styles
	}
}