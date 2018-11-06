// This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var apiInfo = {
  videoId: 'L0hfNjhmTpc',
  moreInfo: [{
      title: 'Nombre de la lluvia',
      value: 'Perseidas'
    },
    {
      title: 'Fecha de captura',
      value: new Date()
    },
    {
      title: 'Coordenadas geográficas',
      value: '40.551124 -3.4908171'
    },
    {
      title: 'MALE',
      value: 715
    }
  ]
}

var videoId = "";

var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", url, true);
	xhr.responseType = "json";
	xhr.onload = function() {
		var status = xhr.status;
		if (status == 200 || status == 202) {
		     callback(null, xhr.response);
		} else {
		    callback(status);
		}
	};
	xhr.send();
};
function startVideo(internal_id,second){
  getJSON("http://vps190.cesvima.upm.es:1723/videos/"+internal_id,
		function(err,data){
			if (err!=null){
				alert("Error when getting video from our API");
			} else{

			  var url = data.url.split("=");
                          apiInfo.videoId = url[url.length-1];
                          apiInfo.moreInfo = [
                            {
                            title: 'Nombre del vídeo',
                            value: data.name
                            },
                            {
                              title:'Fecha de captura',
                              value: ""+data.date.day+"/"+data.date.month+"/"+data.date.year
                            },
                            {
                              title:'Coordenadas geográficas',
                              value: data.latitude+ " " + data.longitude
                            },
                            {
                              title: "MALE",
                              value: data.MALE
                            }];
                          moreInfo();
			  createPlayer(url[url.length-1],second);
			}
	});
}
function createPlayer(id, seconds){
  player = new YT.Player('player', {
    height: '540',
    width: '900',
    videoId: id,
    events: {
      'onReady': onPlayerReady
    },
    playerVars: {
      'rel': 0,
      'start': seconds
    }
  });
}
function onYouTubeIframeAPIReady() {
	console.log("IFRAME READY");
	getJSON("http://vps190.cesvima.upm.es:1723/challenge",
		function(err,data){
		if(err != null){
		alert("Error: + err");
		}
		else{
			console.log("Segundo: "+ data.second);
			videoId = data.id;
			startVideo(data.id,data.second);
			}
		});
}
/*function onYouTubeIframeAPIReady() {
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
}*/

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
