let canvas = document.getElementById("game"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....

// Variáveis de controle
const BOX_SIZE = 32; // Mantem o valor
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
let speed = 100;
let counterApple = 0;
let score = 0;
let gradeActivated = false;
let totalSquads = 16;
let resolution = 0;


snake[0] = Points(8 * BOX_SIZE, 8 * BOX_SIZE);
let food = Points(Math.floor(Math.random() * 15 + 1) * BOX_SIZE,
				  Math.floor(Math.random() * 15 + 1) * BOX_SIZE);

const directions = ["right", "left", "up", "down"];
// A direção inicial será aleatória
let direction = directions[Math.floor(Math.random() * 4)];

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
	if(event.keyCode == 37 && direction != 'right') direction = 'left';
	if(event.keyCode == 38 && direction != 'down') direction = 'up';
	if(event.keyCode == 39 && direction != 'left') direction = 'right';
	if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){
	if(snake[0].x > 15*BOX_SIZE && direction == "right") snake[0].x = 0;
	if(snake[0].x < 0 && direction == 'left') snake[0].x = totalSquads * BOX_SIZE;
	if(snake[0].y > 15*BOX_SIZE && direction == "down") snake[0].y = 0;
	if(snake[0].y < 0 && direction == 'up') snake[0].y = totalSquads * BOX_SIZE;
	
	for(i = 1; i < snake.length; i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			canvas.style.opacity = 0;
			clearInterval(jogo);
			alert('Game Over :(');
		}
	}

	criarBG(context, 'gray');
	// O usuário deverá optar se deseja que seja exibido o jogo com grade ou sem
	if (gradeActivated)
		activateGrade(context);

	criarCobrinha(context, snake);
	drawFood(context, food);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(direction == "right") snakeX += BOX_SIZE;
	if(direction == "left") snakeX -= BOX_SIZE;
	if (direction == "up") snakeY -= BOX_SIZE;
	if(direction == "down") snakeY += BOX_SIZE;
	// changeDirection(direction, snakeX, snakeY);

	if(snakeX != food.x || snakeY != food.y){
		snake.pop(); //pop tira o último elemento da lista
	}else{
		food.x = Math.floor(Math.random() * 15 +1) * BOX_SIZE;
		food.y = Math.floor(Math.random() * 15 +1) * BOX_SIZE;
		counterApple++;
		score += 10;
	}

	snake.unshift(Points(snakeX, snakeY)); //método unshift adiciona como primeiro quadradinho da cobrinha

	// Atualiza dos dados a serem exibidos
	updateScore(score);
	updadeApples(counterApple);
}
iniciarJogo();
//createModal();
//let jogo = setInterval(iniciarJogo, speed);