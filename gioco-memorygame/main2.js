document.addEventListener('DOMContentLoaded', ()=>{

    //Array oggetti immagini

    let gameCards = [
        {
            name: "fries",
            img: "/media/fries.png"
        },
        {
            name: "fries",
            img: "/media/fries.png"
        },
        {
            name: "hotdog",
            img: "/media/hotdog.png"
        },
        {
            name: "hotdog",
            img: "/media/hotdog.png"
        },
        {
            name: "pizza",
            img: "/media/pizza.png"
        },
        {
            name: "pizza",
            img: "/media/pizza.png"
        },
        {
            name: "milkshake",
            img: "/media/milkshake.png"
        },
        {
            name: "milkshake",
            img: "/media/milkshake.png"
        },
        {
            name: "cheeseburger",
            img: "/media/cheeseburger.png"
        },
        {
            name: "cheeseburger",
            img: "/media/cheeseburger.png"
        },
        {
            name: "ice-cream",
            img: "/media/ice-cream.png"
        },
        {
            name: "ice-cream",
            img: "/media/ice-cream.png"
        }
    ]

    //Metodo per randomizzare la sequenza delle immagini nella griglia, altrimenti avrebbero sempre la stessa posizione a ogni nuovo caricamento della pagina.

    gameCards.sort(()=> 0.5 - Math.random())

    //Funzione crea griglia

    let grid = document.querySelector('.grid')

    function createGrid(){
        for(let i=0; i<gameCards.length; i++){
            let cardImg = document.createElement('img')
            cardImg.setAttribute('src', '/media/blank.png')
            cardImg.setAttribute('data-id', i)
            grid.appendChild(cardImg)
            cardImg.addEventListener('click', flipCard)
        }
    }

    //Funzione mostra immagine

    let chosenCards = [] //array con i nomi delle immagini(quindi 6 nomi ripetuti 2 volte)
    let chosenCardsId =[] //array con le singole ID di ogni elemento/img, quindi 12 ID

    function flipCard(){
        let cardId = this.getAttribute('data-id')
        this.setAttribute('src', gameCards[cardId].img)
        chosenCards.push(gameCards[cardId].name)
        chosenCardsId.push(cardId)
        if(chosenCards.length == 2){
            setTimeout(checkMatch, 500)
        }
    }

    //Funzione verifica corrispondenza immagini

    let matchedImg = [] //array dove vanno le coppie di nomi combacianti che sono stati flippati/trovati
    let score = document.querySelector('#score')

    //Prova per inserire un numero massimo di tentativi per fare match

    let currentAttemps = 5
    let lose = document.querySelector('#lose')
    function decreaseAttemps(){
        currentAttemps--
        if(currentAttemps < 0){
            alert("Numero di tentativi falliti, GAME OVER")
            cards.removeEventListener('click', flipCard)
        }
    }

    function checkMatch(){
        let cards = document.querySelectorAll('img')
        const chosenImg1 = chosenCards[0]
        const chosenImg2 = chosenCards[1]
        const chosenImgId1 = chosenCardsId[0]
        const chosenImgId2 = chosenCardsId[1]

        if(chosenImgId1 === chosenImgId2){
            alert("Hai cliccato 2 volte sulla stessa immagine!")
            cards[chosenImgId1].setAttribute('src', '/media/blank.png')
            cards[chosenImgId2].setAttribute('src', '/media/blank.png')
        }else if(chosenImg1 === chosenImg2){
            alert("Hai fatto un match, bravo!")
            cards[chosenImgId1].setAttribute('src', '/media/white.png')
            cards[chosenImgId2].setAttribute('src', '/media/white.png')
            cards[chosenImgId1].removeEventListener('click', flipCard)
            cards[chosenImgId2].removeEventListener('click', flipCard)
            matchedImg.push(chosenCards)
        }else{
            alert("Non hai fatto match, riprova!")
            cards[chosenImgId1].setAttribute('src', '/media/blank.png')
            cards[chosenImgId2].setAttribute('src', '/media/blank.png')
            decreaseAttemps()
            lose.innerHTML = currentAttemps
        }
        chosenCards = []
        chosenCardsId = []

        score.innerHTML = matchedImg.length
        if(matchedImg.length === gameCards.length/2){
            alert("Complimenti, hai compleato il gioco")
        }
    }
        
    createGrid();

})