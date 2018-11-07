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
  writeMsg('Cuando veas un meteoro, pincha en el siguiente botón');
    clearCanvas();
    document.querySelector('.app canvas').classList.add('hide');
    if (player !== undefined) {
        player.playVideo();
    }
}

function step2() {
  writeMsg('Pon el vídeo exactamente cuando aparece el meteoro usando los botones de &#9194; y &#9193; y marca con el ratón el punto inicial');
    showState('draw');
    document.querySelector('.app canvas').classList.remove('hide');
    player.pauseVideo(1);
}

function step3() {
    showState('edit-arrow');
  writeMsg('Cambia los parámetros de color y anchura del meteoro y pincha en ENVIAR');

    document.querySelector('.app canvas').classList.remove('hide');
    player.pauseVideo(1);
}
function sendJSON(data){
var http = new XMLHttpRequest();
var url = 'http://vps190.cesvima.upm.es:1723/meteors';
http.open('POST', url, true);
//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/json');

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
                }
               }
             http.send(JSON.stringify(data));
}
function sendData(){
	console.log(points);
	console.log("videoId: "+ videoId);
	var data  = {
		color : document.getElementById('colorInput').value,
		origin: {x:points.A.x, y:points.A.y,time:points.A.second},
		end: {x:points.B.x, y:points.B.y,time:points.B.second},
		video_id: videoId
	};
	sendJSON(data);
	step1();
}

