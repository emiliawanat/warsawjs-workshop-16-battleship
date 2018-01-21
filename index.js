'use strict';

const gameboardArray = [{
	name: 'Gameboard 1',
	array: [
		[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
		[1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}, {
	name: 'Gameboard 2',
	array: [
		[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
		[1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}, {
	name: 'Gameboard 3',
	array: [
		[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
		[1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}];

class BaseElement {
	createElement() {
		console.log("Not implemented here!");
	}

	setElement() {
		this.elementState = {
			element: this.createElement()
		}

		this.initialize();

		return this.getElement();
	}

	getElement() {
		return this.elementState.element;
	}

	initialize() {

	}
}

class Cell extends BaseElement {
	constructor({isShip, gameboard}) {
		super();

		this.isShip = isShip; // true/false
		this.gameboard = gameboard;
		this.state = 'unknown';
		this.onClick = this.fireTorpedo;
	}

	createElement() {
		const element = document.createElement('div');
		element.addEventListener('click', this.onClick.bind(this));

		return element;
	}

	setState(state) {
		this.state = state;
		this.refresh();
	}

	fireTorpedo() {
		if(this.isShip) {
			if (this.state !== 'unknown') {
				return false;
			}

			this.gameboard.score++;

			while (gameResult.firstChild) {
				gameResult.removeChild(gameResult.firstChild)
			}

			gameResult.append(`${this.gameboard.score}/${this.gameboard.totalScore}`);

			this.setState('hit');
		} else {
			this.setState('miss');
		}
	}

	refresh() {
		this.getElement().className = `cell-${this.state}`;
	}

	initialize() {
		this.refresh();
	}
}

class Gameboard extends BaseElement {
	constructor(size) {
		super();

		this.cells = [];
		this.rowNumber = size;
		this.columnNumber = size;
		this.fleet = gameboardArray[Math.floor(Math.random() * gameboardArray.length)];
		this.score = 0;
		this.totalScore = this.getTotalScore(this.fleet);

		for (let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
			for (let columnIndex = 0; columnIndex < this.columnNumber; columnIndex++) {
				this.cells.push(new Cell({
					isShip: this.fleet.array[rowIndex][columnIndex] === 1 ? true : false,
					gameboard: this
				}));
			}
		}

		gameResult.append(`${this.score}/${this.totalScore}`);
	}

	createElement() {
		const gameboard = document.createElement('div');
		gameboard.className = 'gameboard';

		for (let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
			const row = document.createElement('div');
			row.className = 'board-row';
			
			for (let columnIndex = 0; columnIndex < this.columnNumber; columnIndex++) {
				const cell = this.cells[rowIndex * this.columnNumber + columnIndex];

				row.appendChild(cell.setElement());
			}

			gameboard.appendChild(row);
		}

		return gameboard;
	}

	getTotalScore(fleet) {
		let total = 0;

		fleet.array.forEach(row => {
			total += row.filter(x => {return x === 1}).length;
		});

		return total;
	}
}

const gameboardContainer = document.getElementById('gameboardContainer');
const gameResult = document.getElementById('gameResult');
const gameboard = new Gameboard(10);
gameboardContainer.appendChild(gameboard.setElement());