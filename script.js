
/* Main JavaScript file for The Snake */

/* I didn't use jQuery for some reasons.
*  First of all, snake is a live game so jQuery will make it slower.
*  jQuery makes the app slower, but easier to program,
*  so sometimes better to use JavaScript than jQuery.  */

window.onload = function() {

	// The canvas board variables.
	var board = document.getElementById('board');
    var ctx = board.getContext('2d');
	
	var delay = 60; // The delay time between frames.
	
	// Snake Variables :
	var posX = 300; // The X Position of the snake.
	var posY = 180; // The Y Position of the snake.
	
	var dir = 'right'; // The direction of the snake.
	
	var size = 20; // The size of each part of the snake.
	var snake_length = 4; // The length of the snake (number of parts in his body).
	
	var snakeBody = new Array(); /* Array of the Snake's body positions (the past head positions), 
								  * of course the head not in this array.                           */
	
	// Food Variables :
	var food_posX; // The X Position of the food.
	var food_posY; // The Y Position of the food.
	
	var ifFood = false; // Checks if there is a food.
	
	var move = { // JSON of The keycodes of the arrow keys.
		up     : 38,
		down   : 40,
		left   : 37,
		right  : 39
	};
	
	main();
	
	function main() {
		document.onkeydown = KeyCheck; // Checks if the user is pressing a key.
		UpdatePastPositon();
		
		if(dir == 'up') { posY = posY - size; }
		else if(dir == 'down') { posY = posY + size; }
		else if(dir == 'left') { posX = posX - size; }
		else if(dir == 'right') { posX = posX + size; }
		
		clearBoard(ctx); // Clearing the Board.
		drawSnake(posX, posY, size, ctx);  // Drawing the snake's next move.
	
		if(posX == -20 || posX == 800 || posY == -20 || posY == 600) {
			history.go(0); // If the snake's head touches the border board, the page will refreshed.
		}
		
		for(var i = 0; i < snakeBody.length; i++) {
			if(snakeBody[i][0] == posX && snakeBody[i][1] == posY) {
				history.go(0);
			}
		}
		
		if(ifFood && posX == food_posX && posY == food_posY) {
			snake_length += 2;
			ifFood = false;
		}

		if(!ifFood) {
			food_posY = RandomPosition('height');
			food_posX = RandomPosition('width');
			ifFood = true;
		}
		FoodCreator(food_posX, food_posY, ctx, size); // Drawing the food.
		
		idle(); // Idling so the game won't be fast as hell.
	}
	
	function drawSnake(posX, posY, size, ctx) { // Drawing the snake's next move.
		ctx.fillStyle = '#262626'; // Drawing the snake's head.
		ctx.fillRect(posX, posY, size, size);
		
		for(var i = 0; i < snakeBody.length; i++) { // A loop that loops through the snake's body and draw each of it.
			ctx.beginPath();
			ctx.rect(snakeBody[i][0], snakeBody[i][1], size, size);
			ctx.fillStyle = '#262626';
			ctx.fill();
			ctx.lineWidth = 2;
			ctx.strokeStyle = '#F2F2F2';
			ctx.stroke();
		}
	}

	function UpdatePastPositon() { // Updating the Past Head Position to position there the body.
		snakeBody.push( [ posX, posY ] )
		
		if(snakeBody.length > snake_length) {
			snakeBody.splice(0,1);
		}
	}
	
	function RandomPosition(axis) { // Generate Random Position.
		var checkVaild = false;
		
		if(axis == 'width') {
			var x = Math.round( Math.floor( Math.random() * ( (board.width) - ( size - 1 ) ) ) / size ) * size;
			return x;
		}
		
		else if(axis == 'height') {
			var y = Math.round( Math.floor( Math.random() * ( (board.height) - ( size - 1 ) ) ) / size ) * size;
			return y;
		}
	}
	
	function FoodCreator(food_posX, food_posY, ctx, size) {
		ctx.fillStyle = '#B30000';
		ctx.fillRect(food_posX, food_posY, size, size); // Drawing the food.
	}
	
	function clearBoard(ctx) {
		ctx.clearRect(0, 0, board.width, board.height); // Making a rech of eraser.
	}
	
	function KeyCheck(e) { // Check which key the user clicks.
		var KeyID = (window.event) ? event.keyCode : e.keyCode;
		
		switch(KeyID) {
			case move.up:
			if(dir != 'down' && dir != 'up') {
				dir = 'up';
			}
			break;
			
			case move.down:
			if(dir != 'up' && dir != 'down') {
				dir = 'down';
			}
			break;
			
			case move.left:
			if(dir != 'right' && dir != 'left') {
				dir = 'left';
			}
			break;

			case move.right:
			if(dir != 'left' && dir != 'right') {
				dir = 'right';
			}
			break;
			
			case 32:        // 32 It's the keycode of spacebar.
			history.go(0); // If the user click spacebar the page will refreshed.
			break;
		}
	}
	
	function idle() {
		setTimeout(main, delay); // Delay between frames, you can go drink coffe now :)
	}
}