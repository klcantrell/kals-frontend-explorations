import portfolio1 from '../html/portfolio1.html';
import portfolio2 from '../html/portfolio2.html';
import p1script from '../html/portfolio scripts/portfolio1';
import p2script from '../html/portfolio scripts/portfolio2';

export const PortfolioModel = {
	portfolio1: {
		page: 1,
		info: "Sup",
		description: 'Page 1 stuff...sup',
		content: portfolio1,
		script: p1script
	},
	portfolio2: {
		page: 2,
		info: "Yo",
		description: 'Page 2 stuff, yo',
		content: portfolio2,
		script: p2script
	}
};