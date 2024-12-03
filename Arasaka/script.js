/*The whole code wont work if you dont have this, this is rodiqulos, the click events don't work beacause the page loads to fast? What a buch of bullshit work around nonsence. 40 years of internet history and issues like this have never bean fixed. */ 
document.addEventListener('DOMContentLoaded', init, false);

//Makes sure the page loads before initialising any of the other events. 
function init() {
//Grabs DOM elements.
const audioPlayer = document.getElementById('audioPlayer');
const audioContainer = document.getElementById('audio-container');
const audiosrc = document.getElementById('audiosrc');
const playlist = document.getElementById('playlist');
const tracks = document.getElementsByTagName('li'); 
const image = document.getElementById('img');
//Collects src data.
const tracksArr = [];
const srcArray = [];
let i = 0;

//Add Dragability to the audio container.

let audioContainerCoords = audioContainer.getBoundingClientRect();
console.log(audioContainerCoords);
//Remeber to feed e into a function that will handle the event listner!
//Initial position of the mouse when the event is fiered, Mouse coordonates X and Y, mX and mY.
	let mX;
	let mY;
//Initial position of Audio player window coordonates, wX and WY.
	let wX;
	let wY;
//Function to update the coordonate variables for the initial position.
	let dragFlag = false;

audioContainer.addEventListener('mousedown', function (e) {
	mX = e.clientX;
	mY = e.clientY;
	wX = audioContainerCoords.x;
	wY = audioContainerCoords.y;
	console.log(audioContainerCoords);
	console.log(e);
	dragFlag = true;
});

audioContainer.addEventListener('mouseup', function () {
	dragFlag = false; 
});

audioContainer.addEventListener('mousemove', function (e) {
	if (dragFlag) {
	coordX = e.clientX - mX;
	coordY = e.clientY - mY;
	audioContainer.style.position = 'absolute';
	audioContainer.style.left = wX + coordX + 'px';
	audioContainer.style.top = wY + coordY + 'px';
	console.log(audioContainerCoords);
	console.log(e.clientX - mX);
	console.log(e.clientY - mY);
};

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

