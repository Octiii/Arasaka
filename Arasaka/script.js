document.addEventListener('DOMContentLoaded', init, false);


function init() {

const audioPlayer = document.getElementById('audioPlayer');
const audiosrc = document.getElementById('audiosrc');
const playlist = document.getElementById('playlist');
const tracks = document.getElementsByTagName('li'); 
//Collect src data
const tracksArr = [];
const srcArray = [];

const tracksArray = Array.from(tracks);

tracksArray.forEach(track => {
	const src = track.getAttribute('data-src');
	if (src) {
      srcArray.push(src);
    }
});

let i = 0;

    for (let track of tracks) {
	track.addEventListener('click', function() {
	 audiosrc.src = this.getAttribute('data-src');
	 audioPlayer.volume = 0.10;
	 audioPlayer.load();
	 audioPlayer.play();
	 console.log(srcArray);
	 console.log(track.getAttribute('data-src'));
	 console.log(srcArray.indexOf(track.getAttribute('data-src')));
	 i = srcArray.indexOf(track.getAttribute('data-src'));
	});
};

const next = document.getElementById("next");
next.addEventListener('click', nextClick);
const previous = document.getElementById("previous");
previous.addEventListener('click', previousClick); 





function nextClick () {
	audiosrc.src = srcArray[i];
	audioPlayer.load();
    	audioPlayer.play();
	audioPlayer.volume = 0.01;
	i++;
	console.log(i);
	console.log(tracks);
	if (i >= srcArray.length) {
		i = 0; 
}
};


 function previousClick () {
	console.log(i);
	i--;
	console.log(i);
     if (i < 0) {
	i = srcArray.length - 1;
} 
	audiosrc.src = srcArray[i];
	audioPlayer.load();
    	audioPlayer.play();
	audioPlayer.volume = 0.01;
};

};


