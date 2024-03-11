let deckId = ''
let winner = true
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  deckId = data.deck_id
    
})
.catch(err => {
  console.log(`error ${err}`)
});

document.querySelector('button').addEventListener('click', drawTwo)

let player1CardCount = 26
let player2CardCount = 26


function drawTwo(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    Number(localStorage.getItem('Player1'))
    Number(localStorage.getItem('Player2'))
  
    document.querySelector('#player1').src = data.cards[0].image
    document.querySelector('#player2').src = data.cards[1].image
    let player1Val = convertFaceCardsToNum(data.cards[0].value)
    let player2Val = convertFaceCardsToNum(data.cards[1].value)
    if(player1Val > player2Val){
      document.querySelector('#results').innerText = 'Player 1 wins the Hand'

      player1CardCount += 1
      document.querySelector('#cardCountPlayer1').innerText = player1CardCount
      player2CardCount -= 1
       
      localStorage.setItem('Player1', player1CardCount)
    }else if(player1Val < player2Val){
      document.querySelector('#results').innerText = 'Player 2 wins the Hand'
      
      player2CardCount += 1
      document.querySelector('#cardCountPlayer2').innerText = player2CardCount
      player1CardCount -= 1

      localStorage.setItem('Player2', player2CardCount)
     
    }else{
      document.querySelector('#results').innerText = 'Time for War'
       // $('h4:contains('Time for War')').add('button[id="warButton"]');
    }
    
    
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

}

function convertFaceCardsToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}

document.getElementById('warButton').addEventListener('click', timeForWar)

 function timeForWar(){
   const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`
   fetch(url)
   .then(res => res.json())
   .then(data => {
     console.log(data)
        
     document.querySelector('#player1').src = data.cards[0].image
     document.querySelector('#player2').src = data.cards[1].image
     let player1Val = convertFaceCardsToNum(data.cards[0].value)
     let player2Val = convertFaceCardsToNum(data.cards[1].value)
      //  player1CardCount += 4
      //  player2CardCount += 4
      
      if(player1Val < player2Val){
        document.querySelector('#results').innerText = 'Player 2 Wins War'
        player2CardCount += 4
        player1CardCount -= 4
    
      }else{
        document.querySelector('#results').innerText = 'Player 1 Wins War'
        player1CardCount += 4
        player2CardCount -= 4
    
      }
      
      
      //  document.querySelector('#cardCountPlayer1').innerText = player1CardCount
      //  document.querySelector('#cardCountPlayer2').innerText = player2CardCount
     
  
    })
      .catch(err => {
          console.log(`error ${err}`)
     });
  }
  
  
