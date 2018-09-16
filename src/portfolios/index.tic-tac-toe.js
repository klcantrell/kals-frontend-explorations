import { tictactoeMarkup } from './html/tic-tac-toe.markup';
import ticTacToeScript from './js/tic-tac-toe';
import styles from './css/tic-tac-toe.css';

export default function ticTacToe() {
	return {
		html: tictactoeMarkup,
		script: ticTacToeScript,
		styles: styles
	}
}