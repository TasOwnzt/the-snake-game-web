// Cria uma factory de coordenadas
const apple = new Image();

function Points(x, y){
	return {x, y};
}

function toggleDarkLight() {
	const switchTheme = document.getElementById('switch-theme');

	if(document.getElementsByTagName('i')[0].classList.contains('bi-toggle-off')){
		switchTheme.innerHTML = '<i class="bi bi-toggle-on fs-2 me-4"></i>';
		changeThemeBackground('dark');
	}
	else {
		switchTheme.innerHTML = '<i class="bi bi-toggle-off fs-2 me-4"></i>';
		changeThemeBackground('light');
	}
}

function changeThemeBackground(theme){
	const backgroundTheme = document.body;

	if(theme === "dark"){
		backgroundTheme.style.color = 'var(--text-dark-mode)';
		backgroundTheme.style.backgroundImage = "var(--bg-dark-mode)";
	} else {
		backgroundTheme.style.color = 'var(--txt-color)';
		backgroundTheme.style.backgroundImage = "var(--bg-color)";
	}
}

function createModal(){
	/* const child = document.getElementById('game');
	const modal = document.createElement('div');
	modal.classList.add('modal');
	/* modal.style.background = 'black';
	modal.style.opacity = 0.5;
	modal.style.width = parent.width;
	modal.style.height = parent.height;
	modal.style.display = 'flex';
	modal.style 
	modal.appendChild(child); */

}

function updateScore(value){
	document.getElementById('score').textContent = value;
}

function updadeApples(value){
	document.getElementById('countApple').textContent = value;
}

function activateGrade(ctx){
	for( var i=0; i <= totalSquads; i++){
		for( var j=0; j <= totalSquads; j++){
			ctx.strokeRect(0, 0, i * BOX_SIZE, j * BOX_SIZE);
		}
	}
}

function criarBG(ctx, cor){
	ctx.fillStyle = cor;
	ctx.fillRect(0, 0, totalSquads * BOX_SIZE, totalSquads * BOX_SIZE); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (ctx, actor){
	for(i = 0; i < actor.length; i++){
		ctx.fillStyle = "green";
		ctx.fillRect(actor[i].x, actor[i].y, BOX_SIZE, BOX_SIZE);
	}
}

function drawFood(ctx, actor){
	apple.src = './rsc/imgs/apple.svg';
	apple.onload = () => {
		ctx.drawImage(apple, actor.x, actor.y);
	};
	/* context.fillStyle = "red";
	context.fillRect(food.x, food.y, BOX_SIZE, BOX_SIZE); */
}

function changeSpeed(evt){
	speed = evt.target.value;
	jogo = setInterval(iniciarJogo, speed);
	console.log(jogo);
}

function changeDirection(direction, x, y) {
	switch(direction) {
		case 'right': 
			x += BOX_SIZE;
			break;
		case 'left':
			x -= BOX_SIZE;
			break;
		case 'up':
			y -= BOX_SIZE;
			break;
		case 'down':
			y += BOX_SIZE;
			break;
	}
}