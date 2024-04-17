
//Funzione per far partire il gioco(così non inizia subito al caricamento della pagina)
let btnstart = document.querySelector("#start")
function startGame(){
    clearInterval(aliensID)
    aliensID = setInterval(moveInvaders, 100)
}
btnstart.addEventListener("click",startGame)


//Creazione dinamica div(quadratini) per invaders, shooter, ecc)
let grid = document.querySelector(".grid")
let width = 20

for( let i = 0; i < width*width ; i++){
    let square = document.createElement("div")
    grid.appendChild(square)
}

//Trasfroma la nodelist in array per poterci applicare i vari metodi(ricorda che su una nodelist puoi fare solo il foreach)
let squares = Array.from(document.querySelectorAll(".grid div"))

//Creazione disegno shooter
let currentShooterPosition = 389
function drawShooter(){
    squares[currentShooterPosition].classList.add("shooter")
}
drawShooter()

//Movimento shooter
//(Lo shooter lo muove l'utente con i tasti freccia)
function moveShooter(e){
    squares[currentShooterPosition].classList.remove("shooter")
    switch(e.key){
        case "ArrowRight":
            if(currentShooterPosition % width < width - 1){
                currentShooterPosition = currentShooterPosition + 1
            break
            }
        case "ArrowLeft":
            if(currentShooterPosition % width !== 0){
                currentShooterPosition = currentShooterPosition -1
            break
            }
            
    }
    squares[currentShooterPosition].classList.add("shooter")
}
document.addEventListener("keydown", moveShooter)

//Creazione alieni-invaders
let aliensRemoved = []
let aliensID
let currentInvadersPosition = 4
let alienInvaders = [
    1, 2, 3, 4, 5, 6, 7, 8,9,10,
    21, 22, 23, 24, 25, 26, 27, 28,29,30,
    41, 42, 43, 44, 45, 46, 47, 48,49,50
    ]
function drawInvaders(){
    for( let i = 0; i < alienInvaders.length; i++){
        squares[currentInvadersPosition + alienInvaders[i]].classList.add("aliens")
    }
}
drawInvaders()

//Movimento alieni-ivaders
//(Gli alieni si muovono da soli, prima da sinistra a destra, poi da destra a sinistra, 
// scendendo giù di una riga a ogni inversione di direzione)
let leftedge = alienInvaders[0] % width === 0
let rightedge = alienInvaders[alienInvaders.length - 1] % width === width-1
let direction = 1

function moveInvaders(){
    if((leftedge && direction == -1) || (rightedge && direction == 1)){
        direction = width
    }else if(direction == width){
        if(leftedge){
            direction = 1
        }else if(rightedge){
            direction = -1
        }
    }
    for(let i=0; i<=alienInvaders.length-1; i++){
        squares[alienInvaders[i]].classList.remove("aliens")
    }
    for(let i=0; i<=alienInvaders.length-1; i++){
        alienInvaders[i] += direction
    }
    for(let i=0; i<=alienInvaders.length-1; i++){
        squares[alienInvaders[i]].classList.add("aliens")
    }

    drawInvaders()

    //Fine gioco-2 alternative: hai vinto-YOUWIN/hai perso-GAMEOVER
    if(squares[currentShooterPosition].classList.contains("aliens")){
        alert("GAME OVER!")
        clearInterval(aliensID)
    }else if(aliensRemoved.length === alienInvaders.length){
        alert("YOU WIN!")
        clearInterval(aliensID)
    }
}

//Funzione che fa sparare

function shoot(e){
    let currentLaserPosition = currentShooterPosition
    let laserID;
    let result = 0
    let score = document.querySelector("#score")

    function moveLaser(){
        squares[currentLaserPosition].classList.remove("laser")
        currentLaserPosition = currentLaserPosition - width //(fa spostare il laser di una riga sopra(ricorda direzione +1,-1, +w, -w))
        squares[currentLaserPosition].classList.add("laser")
        if(squares[currentLaserPosition].classList.contains("aliens")){
            squares[currentLaserPosition].classList.remove("aliens")
            squares[currentLaserPosition].classList.remove("laser")
            squares[currentLaserPosition].classList.add("boom")
            setTimeout(() => squares[currentLaserPosition].classList.remove("boom"), 200)
            clearInterval(laserID)
            let alienShot = alienInvaders.indexOf(currentLaserPosition)
            alienInvaders.splice(alienShot,1)
            aliensRemoved.push(alienShot)
            result++
            score.innerHTML = result
        }
    }
    if(e.key === "ArrowUp") {
        laserID = setInterval(moveLaser, 50)
    }
}
document.addEventListener("keydown", shoot)





