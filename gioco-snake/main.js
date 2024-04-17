document.addEventListener('DOMContentLoaded', ()=>{

let squares = document.querySelectorAll('.grid div')
let btnStart = document.querySelector('#start')
let scoreDisplay = document.querySelector('#scoredisplay')


let currentPosition = 0
let applePosition = 0
let currentSnake = [2,1,0]
let direction = 1
let width = 10
let score = 0
let interval = 0
let intervaltime = 0


//Funzione che assegna ai tasti un movimento del serpente

function moveSnake(e){

    squares[currentPosition].classList.remove('snake')

    if(e.key === 'ArrowRight'){
        direction = 1
    }else if(e.key === 'ArrowLeft'){
        direction = -1
    }else if(e.key === 'ArrowUp'){
        direction = -width
    }else if(e.key === 'ArrowDown'){
        direction = +width
    }

}

//Eventi che fanno partire il gioco
document.addEventListener('keydown', moveSnake)
btnStart.addEventListener('click', startGame)

//Funzione che fa partire il gioco/resetta il gioco

function startGame(){
    currentSnake.forEach( index => squares[index].classList.remove('snake'))
    squares[applePosition].classList.remove('apple')
    clearInterval(interval)
    randomApple()
    currentSnake = [2,1,0]
    currentSnake.forEach( index => squares[index].classList.add('snake'))
    direction = 1
    currentPosition = 0
    score = 0
    scoreDisplay.innerHTML = score
    intervaltime = 500
    interval = setInterval(snakeOutcomes, intervaltime)
}

//Funzione che genere una mela in una posizione random della griglia
//La condizione nel while serve a evitare che la mela venga generata in un punto dove c'è già il serpente

function randomApple(){
    do {
        applePosition = Math.floor(Math.random() * squares.length)
    } while (squares[applePosition].classList.contains('snake')) 
    squares[applePosition].classList.add('apple')
}

//Funzioni che gestiscono i movimenti del serpente

function snakeOutcomes(){

    // Funzione che gestisce i casi in cui si perde il gioco(Quando il serpente colpisce i bordi o se stesso)
    //(Abbastanza complicati da implementare con i calcoli dei metodi degli array...)
    if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
      ) {
        alert("GAME OVER!")
        currentSnake.forEach( index => squares[index].classList.remove('snake'))
        squares[applePosition].classList.remove('apple')
        return clearInterval(interval)
        
      }
    

    //Funzione che assegna punti se il serpente prende la mela(oltre ad aumentare il punteggio, allunga la coda del serpente)
    let tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.innerHTML = score
        clearInterval(interval)
        intervaltime = 500
        interval = setInterval(snakeOutcomes, intervaltime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

function switchLevel(){
    if(score === 3){
        if (
            (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
          ) {
            alert("GAME OVER!")
            currentSnake.forEach( index => squares[index].classList.remove('snake'))
            squares[applePosition].classList.remove('apple')
            return clearInterval(interval)
            
          }
        
    
        //Funzione che assegna punti se il serpente prende la mela(oltre ad aumentare il punteggio, allunga la coda del serpente)
        let tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)
    
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.innerHTML = score
            clearInterval(interval)
            intervaltime = 100
            interval = setInterval(snakeOutcomes, intervaltime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }
}
switchLevel();

})




