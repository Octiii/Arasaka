/*The whole code wont work if you dont have this, this is rodicoulos, the click events don't work beacause the page loads to fast? What a buch of bullshit work around nonsence. 40 years of internet history and issues like this have never bean fixed. */ 
document.addEventListener('DOMContentLoaded', init, false);

//Makes sure the page loads before initialising any of the other events. 
function init() {
//Grabs DOM elements 
const audioPlayer = document.getElementById('audioPlayer');
const audiosrc = document.getElementById('audiosrc');
const playlist = document.getElementById('playlist');
const tracks = document.getElementsByTagName('li'); 
const image = document.getElementById('img');
//Collect src data
const tracksArr = [];
const srcArray = [];



const tracksArray = Array.from(tracks);
//Creates srcArray from taking the src data from the list items in the DOM. 
tracksArray.forEach(track => {
	const src = track.getAttribute('data-src');
	if (src) {
      srcArray.push(src);
    }
});

let i = 0;
//Makes the song names clickable and also updates the song index e.g i.
    for (let track of tracks) {
	track.addEventListener('click', function() {
	 audiosrc.src = this.getAttribute('data-src');
	 audioPlayer.volume = 0.1;
	 audioPlayer.load();
	 audioPlayer.play();
	 console.log(srcArray);
	 console.log(track.getAttribute('data-src'));
	 console.log(srcArray.indexOf(track.getAttribute('data-src')));
	 i = srcArray.indexOf(track.getAttribute('data-src'));
	 switchLogic(i);
	});
};



//Next, Previous buttons.
const next = document.getElementById("next");
next.addEventListener('click', nextClick);
const previous = document.getElementById("previous");
previous.addEventListener('click', previousClick); 
//Function to update the song independently of the click event, doing this inside the event has issues.
function updateAudio() {
	audiosrc.src = srcArray[i];
	audioPlayer.load();
    	audioPlayer.play();
	audioPlayer.volume = 0.1;
};


//When click make next song go, if las song make first go.
function nextClick () {
	i++;
	if (i >= srcArray.length) {
		i = 0; 
}
	updateAudio();
	switchLogic(i);
};

//When click make previous song go, if first song make last go. 
 function previousClick () {
     i--;
     if (i < 0) {
	i = srcArray.length - 1;
} 
	updateAudio();
	switchLogic(i);
};
//Loads song ahead of the click events, because i update nonsence. 
audiosrc.src = srcArray[i];
audioPlayer.load();
switchLogic(i);

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
	 console.log('AAAAAAAH!')
};
};

};

