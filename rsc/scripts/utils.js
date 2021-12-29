// Cria uma factory de coordenadas
const apple = new Image();

function Points(x, y){
    return {x, y};
}

function updateScore(value){
    document.getElementById('score').textContent = value;
}

function updadeApples(value){
    document.getElementById('countApple').textContent = value;
}

function activateGrade(ctx){
	for( var i=0; i <= 16; i++){
		for( var j=0; j <= 16; j++){
			ctx.strokeRect(0, 0, i * BOX_SIZE, j * BOX_SIZE);
		}
	}
}

function criarBG(ctx){
	ctx.fillStyle = 'lightgreen';
	ctx.fillRect(0, 0, 16 * BOX_SIZE, 16 * BOX_SIZE); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (ctx, actor){
	for(i = 0; i < actor.length; i++){
		ctx.fillStyle = "green";
		ctx.fillRect(actor[i].x, actor[i].y, BOX_SIZE, BOX_SIZE);
	}
}

function drawFood(ctx, actor){
	apple.onload = () => {
		ctx.drawImage(apple, actor.x, actor.y);
	};
	apple.src = './rsc/imgs/apple.svg';
	/* context.fillStyle = "red";
	context.fillRect(food.x, food.y, BOX_SIZE, BOX_SIZE); */
}