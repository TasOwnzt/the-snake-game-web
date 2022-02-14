let imgBg = undefined;

const imgFood = new Image();
imgFood.src = "/rsc/imgs/apple.png";

// Cria uma factory de coordenadas
const Points = (x, y)=>{return {x, y}}

const getSpeed = ()=> parseInt(document.getElementById('speedGame').value);

const updateScore = (value)=> document.getElementById('score').textContent = value;

const updadeApples = (value)=> document.getElementById('countApple').textContent = value;

function backDefault(){
	reset = null;
	snake = [new Actor(ctx, 'snake', sizeOfSquad, undefined, circle,
						randomColor?getRandomItem(['lightgreen', 'lightgray', 'lightblue', 'pink']): undefined)];

	document.getElementById('speedGame').value = speed;

	reset = setInterval(init, 1000 / speed); // Frequência de atualização dos frames por segundo
}

const updatePhase = (value)=> {
	document.getElementById('phase').textContent = value;

	switch(value){
		case 1:
			speed = 10;
			if(phaseChanged) backDefault();
			break
		case 2:
			speed = 15;
			if(phaseChanged) backDefault();
			break;
		case 3:
			speed = 20;
			if(phaseChanged) backDefault();
			break;
	}
}

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Verifica se dois objetos se colidiram
const checkHitObject = (obj1, obj2) => (obj1.point.x == obj2.point.x && obj1.point.y == obj2.point.y)? true: false;

const changeThemeBackground = (element) => {
	(element.classList.contains('bg-light'))? element.classList.replace('bg-light', 'bg-black'):
											  element.classList.replace('bg-black', 'bg-light');
}

// Move o objeto de acordo com a velocidade
function move(obj, speed){
	if(direction === 'right')
		obj.x += speed;
	if(direction === 'left')
		obj.x -= speed;
	if(direction === 'up')
		obj.y -= speed;
	if(direction === 'down')
		obj.y += speed;
}

// Verifica se o objeto saiu do container e o retorna para dentro da area
function checkHitBorder(obj, widthBorder, heightBorder){
	if(direction === 'right' && obj.point.x + obj.size > widthBorder)
		obj.point.x = -sizeOfSquad;
	if(direction === 'left' && obj.point.x < 0)
		obj.point.x = widthBorder;
	if(direction === 'up' && obj.point.y < 0)
		obj.point.y = heightBorder;
	if(direction === 'down' && obj.point.y >= heightBorder)
		obj.point.y = -sizeOfSquad;
}

// Mantém a direção inicial quando o objeto sair do limite e ao mesmo tempo houver mudança de direção
function checkChangeDirection(obj){
	if(obj.point.x + obj.size > canvas.width && (direction == 'up' || direction == 'down'))
		direction = 'right';
	if(obj.point.x < 0 && (direction == 'up' || direction == 'down'))
		direction = 'left';
	if(obj.point.y < 0 && (direction == 'left' || direction == 'right'))
		direction = 'up';
	if(obj.point.y >= canvas.height && (direction == 'left' || direction == 'right'))
		direction = 'down';
}

function drawBackground(context, grade=false, img){
	// Limpa a tela
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Desenha o background
	if(img){
		context.drawImage(img, 0, 0, canvas.width, canvas.height);
	} else {
		context.fillStyle = colorBg;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	// Adiciona uma grade ao background
	if(grade){
		for(var i=1; i <= totalSquads; i++){
			for(var j=1; j <= totalSquads; j++){
				context.strokeRect(0, 0, i * sizeOfSquad, j * sizeOfSquad);
			}
		}
	}
}

class Actor{
	constructor(context, id, size,
				point = undefined || Points(Math.floor(totalSquads / 2) * size, Math.floor(totalSquads / 2) * size),
				circle=false,
				color= undefined || 'lightgreen',
				img){
		this.ctx = context;
		this.id = id;
		this.point = point;
		this.color = color;
		this.circle = circle;
		this.size = size;
		this.img = img;
	}

	draw() {
		this.ctx.save();

		let radialgradient = this.ctx.createRadialGradient(this.point.x, this.point.y, 5, this.point.x, this.point.y, 100);
		radialgradient.addColorStop(0, this.color);
		radialgradient.addColorStop(1, this.color.replace('light', ''));

		this.ctx.fillStyle = radialgradient;

		this.ctx.shadowColor = this.color;
		if(this.circle){
			this.ctx.shadowBlur = 20;
			this.ctx.beginPath();
			this.ctx.arc(this.point.x + (this.size / 2), this.point.y + (this.size / 2), (this.size / 2) , 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.closePath();
		} else{
			this.ctx.shadowBlur = 5;

			if(this.id === 'food' && this.img){
				this.ctx.drawImage(this.img, (this.img.width > this.size)?this.point.x - (this.size / 2):this.point.x, this.point.y);
			} else {
				this.ctx.fillRect(this.point.x, this.point.y, this.size, this.size);
			}
		}

		// Limpa a sombra
		this.ctx.shadowBlur = 0;
		this.ctx.shadowColor = 'rgba(0,0,0,0)';
		this.ctx.restore();
	}
}

// Altera o tema da Página
function toggleDarkLight() {
	const switchTheme = document.getElementById('switch-theme');
	const dialog = document.getElementById("dialog");
	
	if(document.getElementsByTagName('i')[0].classList.contains('bi-toggle-off')){
		switchTheme.innerHTML = '<i class="bi bi-toggle-on fs-2 me-4"></i>';
		changeThemeBackground(document.body);

		if(dialog) // Apenas fará a alteração do background se o objeto existir
			changeThemeBackground(document.getElementById("dialog"));
	}
	else {
		switchTheme.innerHTML = '<i class="bi bi-toggle-off fs-2 me-4"></i>';
		changeThemeBackground(document.body);
		if(dialog)
			changeThemeBackground(document.getElementById("dialog"));
	}
}

function playTheGame(){
	direction = getRandomItem(['right', 'left', 'up', 'down']);
	//init();
	reset = setInterval(init, 1000 / speed); // Frequência de atualização dos frames por segundo
	document.querySelector('.modal').classList.replace('d-flex', 'd-none');
}

function gameOver(){
	const modal = document.querySelector('.modal');
	modal.classList.replace('d-none', 'd-flex');
	document.querySelector('.dialog h3').textContent = 'Game Over!!!';
	document.querySelector('.dialog .description-modal').textContent = `Você obteve ${score} pontos.`;
	document.querySelector('.dialog button').textContent = 'Repetir';

	// Define para o estado incial
	reset = null;
	snake = [new Actor(ctx, 'snake', sizeOfSquad, undefined, circle,
						 randomColor?getRandomItem(['lightgreen', 'lightgray', 'lightblue', 'pink']): undefined)];

	// Zera os pontos obtidos
	score = 0;
	counterApple = 0;
	phase = 1;

	updateScore(score);
	updadeApples(counterApple);
	updatePhase(phase);
}