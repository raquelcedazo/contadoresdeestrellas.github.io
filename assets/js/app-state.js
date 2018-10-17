function initAppState() {
    step1();
}

function showState(className) {
    const divs = document.querySelectorAll('.app-controls>div');
    divs.forEach(div => {
        div.style.display = 'none';
    })
    document.querySelector(`.app-controls .${className}`).style.display = 'inherit';
}

function writeMsg(text, error = false) {
    const msg = document.getElementById('message');
    msg.classList.remove('error');
    const oldText = msg.innerHTML;
    msg.innerHTML = text;
    if (error) {
        msg.classList.add('error');
        setTimeout(() => {
            writeMsg(oldText);
            msg.classList.remove('error');
        }, 5000)
    }
}

function step1() {
    points = {
        'A': undefined,
        'B': undefined
    }
    showState('see-one');
    writeMsg('Cuando veas un meteoro, clickea el dibujo de la derecha')
    clearCanvas();
    document.querySelector('.app canvas').classList.add('hide');
    if (player !== undefined) {
        player.playVideo();
    }
}

function step2() {
    writeMsg('Pon el vídeo exactamente cuando aparece el meteoro usando los botones de &#9194; y &#9193;')
    showState('draw');
    document.querySelector('.app canvas').classList.remove('hide');
    player.pauseVideo(1);
}

function step3() {
    showState('edit-arrow');
    writeMsg('Cambia los parámetros del meteoro y finaliza')

    document.querySelector('.app canvas').classList.remove('hide');
    player.pauseVideo(1);
}