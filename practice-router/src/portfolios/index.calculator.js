import { calculatorMarkup } from './html/calculator.markup';
import calculatorScript from './js/calculator';
import styles from './css/calculator.css';

export default function calculator() {
	return {
		html: calculatorMarkup,
		script: calculatorScript,
		styles: styles
	}
}