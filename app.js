/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore, activePlayer,dice,gamePlaying;


initalizeGame();
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        var rand = randomScore();
        if(rand>1){
            //add number
            roundScore=changeCurrentScore(rand);
    
        }else{
            roundScore=0;
            scores=updateScore(activePlayer,roundScore,scores);
            const roundPlayer=changeRound(activePlayer);
            roundScore=roundPlayer[0];
            activePlayer=roundPlayer[1];
        }
    
    
    }
   


});

document.querySelector('.btn-hold').addEventListener('click',function(){
   if(gamePlaying){
    scores=updateScore(activePlayer,roundScore,scores);
    if(!terminateCheck(scores,activePlayer)){
        const roundPlayer=changeRound(activePlayer);
        roundScore=roundPlayer[0];
        activePlayer=roundPlayer[1];
    }
    hideDice();
   } 
});
document.querySelector('.btn-new').addEventListener( 'click',initalizeGame
);
function changeCurrentScore(rand) {
    roundScore += rand;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    return roundScore;
}

function randomScore() {
    var rand = Math.floor(Math.random() * 6) + 1;
    var dice = document.querySelector('.dice');
    dice.style.display = 'block';
    dice.src = 'dice-' + rand + '.png';
    return rand;
}

function initalizeGame() {
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    gamePlaying=true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';

    //remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //reset game to player one 
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    hideDice();
}

function hideDice() {
    var dice = document.querySelector('.dice');
    dice.style.display = 'none';
}

function changeRound(activePlayer) {

        document.getElementById('current-'+activePlayer).textContent=0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        roundScore=0;
        activePlayer=1-activePlayer;
        return [roundScore,activePlayer];


}

function terminateCheck(scores,activePlayer) {
    if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying=false;
        return true;
    }
    return false;

}

function updateScore(activePlayer,roundScore,scores) {
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    return scores;
}