/*The whole code wont work if you dont have this, this is rodiqulos, the click events don't work beacause the page loads to fast? What a buch of bullshit work around nonsence. 40 years of internet history and issues like this have never bean fixed. */ 
document.addEventListener('DOMContentLoaded', init, false);

//Makes sure the page loads before initialising any of the other events. 
function init() {
//Grabs DOM elements.
const audioPlayer = document.getElementById('audioPlayer');
const audiosrc = document.getElementById('audiosrc');
const playlist = document.getElementById('playlist');
const tracks = document.getElementsByTagName('li'); 
const image = document.getElementById('img');
//Collects src data.
const tracksArr = [];
const srcArray = [];
let i = 0;

//Add Dragability to the audio container.

const audioContainer = document.getElementById('audio-container');

audioContainer.addEventListener('dragstart', (event) => {
  // Store the initial position
  event.dataTransfer.setData('text/plain', JSON.stringify({
    offsetX: event.offsetX,
    offsetY: event.offsetY
  }));
});

document.addEventListener('dragover', (event) => {
  event.preventDefault(); // Allow drop
});

document.addEventListener('drop', (event) => {
  event.preventDefault();
  const offset = JSON.parse(event.dataTransfer.getData('text/plain'));
  const x = event.clientX - offset.offsetX;
  const y = event.clientY - offset.offsetY;
  audioContainer.style.position = 'absolute';
  audioContainer.style.left = `${x}px`;
  audioContainer.style.top = `${y}px`;
});


const tracksArray = Array.from(tracks);
//Creates srcArray from taking the src data from the list items in the DOM. 
tracksArray.forEach(track => {
	const src = track.getAttribute('data-src');
	if (src) {
      srcArray.push(src);
    }
});

//Makes the song names clickable and also updates the song index e.g i.
    for (let track of tracks) {
	track.addEventListener('click', function() {
	 audiosrc.src = this.getAttribute('data-src');
	 audioPlayer.volume = 0.1;
	 audioPlayer.load();
	 audioPlayer.play();
	 i = srcArray.indexOf(track.getAttribute('data-src'));
	 switchLogic(i);
	});
};



//Next, Previous buttons.
const next = document.getElementById("next");
next.addEventListener('click', nextClick);
const previous = document.getElementById("previous");
previous.addEventListener('click', previousClick);
const play = document.getElementById("play");
play.addEventListener('click', function() { 
   
   audioPlayer.volume = 0.1;
   audioPlayer.play()
   
});
const stop = document.getElementById("stop");
stop.addEventListener('click', function(){
   audioPlayer.pause();
});

//Function to update the song independently of the click event, doing this inside the event has issues.
function updateAudio() {
	audiosrc.src = srcArray[i];
	audioPlayer.load();
    	audioPlayer.play();
	audioPlayer.volume = 0.1;
};

//When the next button is clicked, move to the next song.
//If the current song is the last one warp around to the first song.
function nextClick () {
//The index is incremented and the check to see if we need to wrap around are done at the same time!
//If i reaches the same number as the arrays length the modulus calculation automaticaly makes it 0. 
	i = (i + 1) % srcArray.length;
//Updates the audio source to the new index.
	updateAudio();
//Updates the picture to the current song. 
	switchLogic(i);
};

//When the previous button is cliked, move to the previous song.
//If the current song is the first one warp around to the last song. 
 function previousClick () {
//The index is decremented and the check to see if we need to wrap around are done at the same time!
     i = (i - 1 + srcArray.length) % srcArray.length;
//Updates the audio source to the new index.
	updateAudio();
//Updates the picture to the current song. 
	switchLogic(i);
};
//Loads song ahead of the click events, because i update nonsence. 
audiosrc.src = srcArray[i];
audioPlayer.load();
switchLogic(i);

//Updates the image to the song, i is cheked against the cases.
function switchLogic(i) {
switch (i) {
	case 0:
	 image.src ='Image/town.jpg';
	 break;
	case 1:
	 image.src ='Image/onestop.webp';
	 break;
	case 2:
	 image.src = 'Image/flourish.jpg';
	 break;
	default: 
	 console.log('The index is broken again!')
	 console.log(i);
};
};
};

