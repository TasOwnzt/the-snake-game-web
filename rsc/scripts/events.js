addEventListener('keydown', (evt) => {
	switch(evt.keyCode){
		case 39:
			direction = 'right';
			break;
		case 37:
			direction = 'left';
			break;
		case 38:
			direction = 'up';
			break;
		case 40:
			direction = 'down';
			break;
	}
})

// Irá modificar a variável caso haja uma mudança no checkbox
document.querySelector("#gradeEnable").addEventListener('change', (event) => grade = event.target.checked);

document.querySelector("#circle").addEventListener('change', (event) => circle = event.target.checked);

document.querySelector("#randomColor").addEventListener('change', (event) => randomColor = event.target.checked);

// Altera a velocidade de jogo
const changeSpeed = (evt) => speed = parseInt(evt.target.value);

document.querySelectorAll(".toggleBg").forEach((item) => {
	item.addEventListener('click', (event) => {
		const target = event.target;
		let time = null;

		switch(target.name){
			case 'color':		// altera para a cor escolhida pelo usuário
				clearTimeout(time);
				target.addEventListener('change', (evt) => {
					time = setTimeout(() => {
						colorBg = evt.target.value;
						imgBg = undefined;
					}, 1500);
				});
				break;
			case 'img1':
				imgBg = (imgBg == undefined)? new Image(): imgBg;
				imgBg.src = target.src;
				break;
			case 'img2':
				imgBg = (imgBg == undefined)? new Image(): imgBg;
				imgBg.src = target.src;
				break;
		}
	});
})