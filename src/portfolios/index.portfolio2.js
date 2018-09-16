import { p2Markup } from './html/portfolio2.markup';
import p2script from './js/portfolio2';
import p2styles from './css/portfolio2.css';

export default function p2() {
	return {
		html: p2Markup,
		script: p2script,
		styles: p2styles
	}
}