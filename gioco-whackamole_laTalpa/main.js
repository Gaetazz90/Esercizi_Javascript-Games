
const squares = document.querySelectorAll('.square')
const grid = document.querySelector('.grid')
const mole = document.querySelector('.mole')

let score = document.querySelector('#score')
let time = document.querySelector('#time')

let btnStart = document.querySelector('#start')

//Funzione che assegna alla talpa una posizione random in una delle squares

let randomPosition;
let randomSquare;
let hitPosition = null;

function startGame(){
    
    function randomMole(){
        squares.forEach((square)=>{
            square.classList.remove('mole')
        })
        randomPosition = Math.floor(Math.random()*9)
        randomSquare = squares[randomPosition]
        randomSquare.classList.add('mole');
        hitPosition = randomSquare.id;
    }
    
    randomMole();
    
    //Funzione che muove successivamente la talpa in una posizione random ogni sec
    
    let timerID;
    
    function moveMole(){
        timerID = setInterval(randomMole, 1000)
    }
    
    moveMole();
    
    //Funzione che assegna un punteggio ogni volta che la talpa viene colpita
    
    let result = 0;
    
    function hitMole(){
        squares.forEach((square)=>{
            square.addEventListener('click', ()=>{
                if(square.id == hitPosition){
                    result++
                    score.innerHTML = result;
                    hitPosition = null;
                }
            })
            
        })
    }
    
    hitMole();
    
    //Funzione che stoppa la talpa e il gioco allo scadere del tempo
    
    function stopMole(){
        clearInterval(timerID)
    }
    
    
    //Funzione che fa scadere il tempo e quindi terminare il gioco
    
    
    //Funzione che setta il countdown e dove richiamerai anche lo stop di tutte le funzioni(quella che muove la talpa e il countdown)
    
    let timer = 10;
    
    function countDown(){
        timer--;
        time.innerHTML = timer;
        if(timer < 0){
            stopMole()
            stopCountDown()
            alert("GAME OVER, TEMPO SCADUTO!")
            alert("Il tuo punteggio finale è:" + result)
            
            time.innerHTML = " ";
            score.innerHTML = " ";        
            squares.forEach((square)=>{
                square.classList.remove('mole')
            })
            squares.forEach((square)=>{
                square.removeEventListener('click', ()=>{
                    if(square.id == hitPosition){
                        result++
                        score.innerHTML = result;
                        hitPosition = null;
                    }
                })
                
            })
    
        }
    }
    
    //Funzione che fa partire il countdown al caricamento della pagina
    
    let timerID2;
    
    function startCountDown(){
        timerID2 = setInterval(countDown, 1000)
    }
    startCountDown();
    
    //Funzione che stoppa il countdown(da richiamare nella funzione principale con l'if quando il timer arriva a 0)
    
    function stopCountDown(){
        clearInterval(timerID2)
    }
}

btnStart.addEventListener("click", startGame)



