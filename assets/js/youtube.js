// This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '540',
        width: '900',
        videoId: 'L0hfNjhmTpc',
        events: {
            'onReady': onPlayerReady
        },
        playerVars: {
            'rel': 0
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}


function writeFrameMsg(text) {
    const msg = document.getElementById('frame-msg');
    msg.innerHTML = text;
    setTimeout(() => {
        msg.innerHTML = '';
    }, 4000)
}

function nextFrame() {
    writeFrameMsg('Has avanzado')
    player.seekTo(player.getCurrentTime() + 1 / FPS)
}

function prevFrame() {
    writeFrameMsg('Has retrocedido')
    player.seekTo(player.getCurrentTime() - 1 / FPS)
}