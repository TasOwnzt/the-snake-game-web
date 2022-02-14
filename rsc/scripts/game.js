const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

// Seta os valores iniciais das variáveis
let speed = getSpeed();
let counterApple = 0;
let score = 0;
let phase = 1;
const sizeOfSquad = 20;
const totalSquads = 25;
let colorBg = '#006400';

let reset = null;
let grade = false;
let circle = false;
let randomColor = false;
let phaseChanged  = false;

canvas.width = totalSquads * sizeOfSquad;
canvas.height = totalSquads * sizeOfSquad;

let snake = [new Actor(ctx, 'snake', sizeOfSquad, undefined, circle,
	randomColor ? getRandomItem(['lightgreen', 'lightgray', 'lightblue', 'pink']) : undefined)];
let direction = '';

const food = new Actor(ctx, 'food', sizeOfSquad,
	Points(Math.floor(Math.random() * totalSquads) * sizeOfSquad,
		Math.floor(Math.random() * totalSquads) * sizeOfSquad),
	false,
	undefined, imgFood);

updadeApples(counterApple);
updateScore(score);
updatePhase(phase);

function init() {
	// Cena de fundo
	drawBackground(ctx, grade, imgBg);

	// Desenha os objetos da cena
	food.draw();
	snake.forEach((item) => item.draw());

	// Verifica se o snake colidiu com sigo mesmo e encerra o jogo
	for (var i = 1; i < snake.length; i++) {
		if (snake[0].point.x == snake[i].point.x && snake[0].point.y == snake[i].point.y) {
			clearInterval(reset);
			gameOver()
		}
	}

	checkHitBorder(snake[0], canvas.width, canvas.height);

	// Faz o backup do última posição
	let point = Points(snake[0].point.x, snake[0].point.y);

	checkChangeDirection(snake[0]);

	move(point, snake[0].size);

	console.log(speed);
	if (checkHitObject(snake[0], food)) {
		// Gera uma nova posição aleatória
		food.point = Points(Math.floor(Math.random() * totalSquads) * sizeOfSquad,
			Math.floor(Math.random() * totalSquads) * sizeOfSquad);
		food.img.src = getRandomItem(['/rsc/imgs/2 apples.png', '/rsc/imgs/apple.png']);

		// Adiona os pontos e a quantidade de maças comidas
		counterApple++;
		score += getRandomItem([25, speed]);

		if (counterApple == 5) {
			phase = 2;
			phaseChanged = true;
		} else if (counterApple == 10) {
			phase = 3;
			phaseChanged = true;
		} else if(speed == 20 && counterApple == 15) {
			phase = 1
			phaseChanged = true;
		}

	} else
		snake.pop() // Retira sempre o último elemento da lista

	snake.unshift(new Actor(ctx, 'snake', sizeOfSquad, point, circle,
		randomColor ? getRandomItem(['lightgreen', 'lightgray', 'lightblue', 'pink']) : undefined)); // Adiona sempre um novo elemento no início

	updadeApples(counterApple);
	updateScore(score);
	updatePhase(phase);

	phaseChanged = false;
}