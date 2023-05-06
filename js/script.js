const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const scoreEl = document.querySelector("#pontuacao-score");
const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

let score = 0; // inicializa a pontuação

audioStart = new Audio('./audio/audio_theme.mp3')
audioGameOver = new Audio('./audio/audio_gameover.mp3')

const startGame = () => {
    pipe.classList.add('pipe-animation')
    start.style.display = 'none'

    //audio 
    audioStart.play()
}

const restartGame = () => {
    gameOver.style.display = 'none'
    pipe.style.left = ''
    pipe.style.right = '0'
    mario.src = "./images/mario.gif"
    mario.style.width = '90px'
    mario.style.bottom = '0'

    start.style.display = 'none'

    audioGameOver.pause()
    audioGameOver.currentTime = 0;

    audioStart.play()
    audioStart.currentTime = 0;

    score = 0; // reinicia a pontuação
    scoreEl.textContent = score; // atualiza o elemento de pontuação na tela
}

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 400);
}

const playGameOver = () => {
    audioGameOver.play()
}

const loop = () => {
    setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 58 && pipePosition > 0 && marioPosition < 55) {
            pipe.classList.remove('.pipe-animation')
            pipe.style.left = `${pipePosition}px`;

            mario.classList.remove('jump')
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './images/game-over.png';
            mario.style.width = '50px'
            mario.style.marginLeft = '29px'

            function stopAudioStart() {
                audioStart.pause()
            }
            stopAudioStart()

            audioGameOver.addEventListener('ended', playGameOver)
            audioGameOver.play()

            gameOver.style.display = 'flex'

            clearInterval(loop)
        } else if (pipePosition <= 0) {
            score++; // incrementa a pontuação
            scoreEl.textContent = score; // atualiza o elemento de pontuação na tela
        }
    }, 10)
}

loop()


/* keypress, é disparado quando uma tecla é pressionada e solta. 
   keydown, é disparado quando uma tecla é pressionada
   
   keypress só é acionado quando uma tecla que produz um caractere é pressionada,
    enquanto o evento keydown é acionado quando qualquer tecla é pressionada, incluindo as teclas de setas. 
     a tecla de seta para cima não produz um caractere, logo ela não é reconhecida pelo keypress. 
*/

document.addEventListener('keydown', e => {
    const tecla = e.key
    if (tecla === 'Enter') {
        startGame()
        restartGame()
    }
})

document.addEventListener('keydown', e => {
    const tecla = e.key
    if (tecla === ' ' || tecla === 'ArrowUp') {
        jump()
    }
})

document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump()
    }
})