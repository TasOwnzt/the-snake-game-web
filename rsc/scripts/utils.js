
// Cria uma factory de coordenadas
function Points(x, y){
    return {x, y};
}

function updateScore(value){
    document.getElementById('score').textContent = value;
}

function updadeApples(value){
    document.getElementById('countApple').textContent = value;
}