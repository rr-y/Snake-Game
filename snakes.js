
function init()
{
	canvas = document.getElementById('mycanvas');
	pen = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;
	food = getRandomFood();
	game_over = false;
	score = 5;

	snake = {
			init_length : 5,
			color : "aqua",
			cells : [],
			direction : "right",

			createSnake : function() {

				for(var i = this.init_length-1; i>=0;i--)
					this.cells.push({x:i,y:1,});
			},

			drawSnake : function() {

				for(var i =0; i < this.cells.length ; i++)
					{
					pen.fillStyle = "red";
					pen.strokeStyle = "black";
					pen.lineWidth = 5;

					pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
					pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
					}
				},

			updateSanke : function(){

					var headX = this.cells[0].x;
					var headY = this.cells[0].y;

					if(headX < 0 || headX > w/10 || headY <0 || headY > h/10)
					{
						 alert("Your Score: "+score); 
						 game_over = true
					}

					if(headX == food.x && headY == food.y)
					{
						food = getRandomFood();
						score++;
					}
					
					else
						this.cells.pop();


					// newHeadX = headX+1;
					// newHeadY = headY;


					if(this.direction == "right")
					{
						nextX = headX+1;
						nextY = headY;
					}

					else if(this.direction == "left")
					{
						nextX = headX-1;
						nextY = headY;
					}

					else if(this.direction == "up")
					{
						nextX = headX;
						nextY = headY-1;
					}


					else 
					{					
						nextX = headX;
						nextY = headY+1;
					}

					
					this.cells.unshift({x:nextX,y:nextY,});


				},


			};	

	
	snake.createSnake();

	//Adding event listener

    function keyPressed(e)
    {
    	console.log("Key Presssed");
    	console.log(e);

    	if(e.key == "ArrowLeft")
    		snake.direction = "left";


    	else if(e.key == "ArrowRight")
    		snake.direction = "right";

    	else if(e.key == "ArrowUp")
    		snake.direction = "up";

    	else
    		snake.direction = "down";

    	
    	


    }

	document.addEventListener('keydown',keyPressed);


}


function update()
{
	snake.updateSanke();

}

function draw()
{

	pen.clearRect(0,0,w,h);
	snake.drawSnake();


	// food

	pen.fillStyle = food.color;
	pen.fillRect(food.x*10,food.y*10,10,10);

	pen.fillStyle = "white";
	pen.font = "14px , Roboto";
	pen.fillText("Score: "+score,10,10)


	
}


function gameloop()
{
	draw();
	update();

	if(game_over == true)
		clearInterval(f);

}


//Getting food;

function getRandomFood()
{
	var foodX = Math.round(Math.random()*(w-10)/10);
	var foodY = Math.round(Math.random()*(h-10)/10);

	foodColors = ["red","yellow","green","aqua","coral"];
	var i = Math.round(Math.random()*foodColors.length);

	var food = {
		x : foodX,
		y : foodY,
		color : foodColors[i],
	}

	return food;
}





// start of the game
init();

// set interval
var f = setInterval(gameloop,200);


