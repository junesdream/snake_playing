let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//
let rows = 20;
let cols = 20;
let snake = [{ x: 19, y: 3 }];

let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;

//Variable der Richtung von Bewegung der Schlange
let direction = "LEFT";

//Wenn Essen eingesammelt sind, soll die Schlange wachsen
//Diese Variable soll boolisch gesetzt werden. Diese Vaariable soll "true" gesetzte werden, wenn wir unser Essen einsammeln
let foodCollected = false;

placeFood();

//Geschwindigkeit, Interval der Bewegung von Schlangen-Rechtecken 
setInterval(gameLoop, 300);

//Eventlistner von Keydown Tasten 
document.addEventListener("keydown", kyeDown);

draw();

//Spielfeld
function draw() {
	ctx.fillStyle = "black";
	// (X-Achse, Y-Achse, width, height ) / fillRect(x, y, width, height)
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//alternative ctx.fillRect(50, 200, 720, 480);

	ctx.fillStyle = "white";
	snake.forEach((part) => add(part.x, part.y));

	ctx.fillStyle = "lime";
	add(food.x, food.y);

	requestAnimationFrame(draw);
}

//Bedingunen das Spiele zu enden, wann soll das Spiel zu Ende sein?
//1. Wenn die Schlange sich selber beißt, 2. Wenn die Schlange gegen die Wand stießt
function testsGameOver() {

    let firstPart = snake[0]; 
    let otherParts = snake.slice(1); 
    let dublicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);
   //. Schlang läuft gegen die Wand 
   if(snake[0].x < 0 || 
    snake[0].x > cols - 1 || 
    snake[0].y < 0 ||
    snake[0].y > rows - 1 ||
    dublicatePart
    ) {
       placeFood(); 
       snake = [{ x: 19, y: 3}];
       direction = 'LEFT';
   }
}


//Funktion der Platzierunbg des Futters
function placeFood() {
	let randomX = Math.floor(Math.random() * cols);
	let randomY = Math.floor(Math.random() * rows);
	food = { x: randomX, y: randomY };
}

//Funtion des Schlangen-Rechtecken
function add(x, y) {
	ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

//Schlange updaten: Schlaage besteht aus mehrere JSON -> 0{x: 5, y:5}, 1{x: 6, y:5}, 2{x:7, y:5}, 3{x:8, y:5}, Schlang bewegt sich immer nach links. ALle dieser Teile sollen upgedatet werden 
//i = 3
function shiftSnake(){
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart =  snake[i -1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

//Bewegung der Schlange, variable direction zeigt sich die Richtung der Bewegung von Schlange
//Die Funktion wird von oben nach unten ausgeführt
function gameLoop() {
    testsGameOver();
	//Wenn die Funktion im nächsten Mal ausgeführt wird, dann verschiebt der 0.Teil der Schlange wieder.
	//Bevor das 0. Teil der Schlange eins nach liks verschiebt, ein weiteres Teil mit den gleichen Koordinaten ganz am Anfang in Array einfügen
	if (foodCollected) {
		snake = [{ x: snake[0].x, y: snake[0].y }, ...snake];
		// Soweit die Schlange Essen eingesammt hat, dann sollte die Variable in false gesetzt werden.
		foodCollected = false;
	}

	//Schlange updaten:
	shiftSnake();

	if (direction == "LEFT") {
		snake[0].x--;
	}
	if (direction == "RIGHT") {
		snake[0].x++;
	}
	if (direction == "UP") {
		snake[0].y--;
	}
	if (direction == "DOWN") {
		snake[0].y++;
	}
	//0.stelle von der Schlange, davon X Koordinate ist gleich voon X Koordinate von Fodd ist und von y.Koord. ist gleich Food von Y Koord. ist, wird dann in { ausgeführt}
	if (snake[0].x == food.x && snake[0].y == food.y) {
		//Futter einsammeln
		foodCollected = true;

		//Futter wird neu platziert, wenn die Schlange Futter einsammelt
		placeFood();
	}
}

//Funktion der Keydowntastaturen 
function kyeDown(e) {
	if (e.keyCode == 37) {
		direction = "LEFT";
	}
	if (e.keyCode == 38) {
		direction = "UP";
	}
	if (e.keyCode == 39) {
		direction = "RIGHT";
	}
	if (e.keyCode == 40) {
		direction = "DOWN";
	}
}  

