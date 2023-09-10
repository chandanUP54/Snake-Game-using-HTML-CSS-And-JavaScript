//constants
let inputDir = { x: 0, y: 0 }
const foodMusic = new Audio("food.mp3")
const gameOverMusic = new Audio("gameover.mp3")
const gameMusic = new Audio("music.mp3")
const moveMusic = new Audio('move.mp3')

let score = 0;
let speed = 2
let lastPaintTime = 0;

let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 10, y: 12 }


//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 1 / speed) {
        return;
    }
    lastPaintTime=ctime
    gameEngine()
}

function isCollide(snakeArr) {  //logic if collid 
   //if you bump into yourself
   for (let i = 1; i < snakeArr.length; i++) {
    if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y)
    return true;
   }
   //if you bump to yourself 
   if((snakeArr[0].x>=18 || snakeArr[0].x<=0) || (snakeArr[0].y>=18 || snakeArr[0].y<=0)){
    return true;
   }
}

function gameEngine() {
    gameMusic.play()
    //part 1: updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverMusic.play()
        gameMusic.pause()
        inputDir = { x: 0, y: 0 }
        alert("Game Over !!")
        snakeArr = [{ x: 13, y: 15 }];
        gameMusic.play()
        score = 0;
    }
  //if yu have eated the food then increment the score and regenerate the food
  if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
    foodMusic.play()
    score+=1
    scoreBox.innerHTML="Score: "+score
    snakeArr.unshift({x: snakeArr[0].x+inputDir.x , y: snakeArr[0].y+inputDir.y})
    let a=2;
    let b=16;
    food={x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())}
  }
  //moving the snake
  for (let i=snakeArr.length-2; i >= 0; i--) {
    snakeArr[i+1]={...snakeArr[i]}
  }
 snakeArr[0].x += inputDir.x;
 snakeArr[0].y += inputDir.y;
    //part 2: display the snake and food 

    //display the snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    //display the food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)

}


//Main Logic start here 
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    moveMusic.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0
            inputDir.y = 1
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1
            inputDir.y = 0
            break;
        default:
            break;

    }
})