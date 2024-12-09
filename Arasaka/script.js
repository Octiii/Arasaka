document.addEventListener('DOMContentLoaded', init, false);

//Makes sure the page loads before initializing any of the other events.

function init() {
    // Grabs DOM elements.
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = 0.1;
    const audioContainer = document.getElementById('audio-container');
    const audiosrc = document.getElementById('audiosrc');
    const playlist = document.getElementById('playlist');
    const tracks = document.getElementsByTagName('li'); 
    const image = document.getElementById('img');
    // Collects src data.
    const srcArray = [];
    let i = 0;

// Time stamps!-----------------------------------------------------------------------------


    // Add event listener to load the meta data to ensure timestamps are updated correctly.
    audioPlayer.addEventListener('loadedmetadata', updateDuration);

let duration = document.getElementById('duration');
    function updateDuration() {
        const currentTime = Math.floor(audioPlayer.duration);
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60; 
        duration.innerText = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        audioPlayer.removeEventListener('loadedmetadata', updateDuration);
    }


    // Time go up. 
    let currentDuration = document.getElementById('currentDuration');
    audioPlayer.addEventListener('timeupdate', function() {
	const currentTime = Math.floor(audioPlayer.currentTime);
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        const formattedTime = minutes + ":" + (seconds < 10 ? '0' : '' ) + seconds;
        currentDuration.innerText = formattedTime; 
    });







//Volume bar------------------------------------------------------------------------------------
	
	let isVolumeSliderActive = false;

	const volume = document.getElementById('volumeBar');	


	volume.addEventListener('mousedown', function() {
	isVolumeSliderActive = true;
});
	volume.addEventListener('mouseup', function() {
	isVolumeSliderActive = false;
});
	volume.addEventListener('mouseleave', function() {
	isVolumeSliderActive = false;
});

	volume.addEventListener("input", (e) => {
	console.log(e.target.value);
	audioPlayer.volume = e.target.value;
});

	let volumeValue = 0.1;
	volume.addEventListener('wheel', (e) => {
	e.preventDefault();
	volumeValue += (e.deltaY > 0 ? -0.01 : 0.01);
	volumeValue = parseFloat(volumeValue.toFixed(2));
	volumeValue = Math.max(0, Math.min(2, volumeValue));
	console.log(volumeValue);
	audioPlayer.volume = volumeValue;
	volume.value = volumeValue;
});
	



// Add Dragability to the audio container.------------------------------------------------------
    let audioContainerCoords;
    let mX, mY, wX, wY;
    let dragFlag = false;

    audioContainer.addEventListener('mousedown', function (e) {
        audioContainerCoords = audioContainer.getBoundingClientRect();
        mX = e.clientX;
        mY = e.clientY;
        wX = audioContainerCoords.x;
        wY = audioContainerCoords.y;
        dragFlag = true;
    });

    audioContainer.addEventListener('mouseup', function () {
        dragFlag = false; 
    });

    audioContainer.addEventListener('mousemove', function (e) {
        if (dragFlag && !isVolumeSliderActive) {
            let coordX = e.clientX - mX;
            let coordY = e.clientY - mY;
            audioContainer.style.position = 'absolute';
            audioContainer.style.left = wX + coordX + 'px';
            audioContainer.style.top = wY + coordY + 'px';
            // Update audioContainerCoords after moving
            audioContainerCoords = audioContainer.getBoundingClientRect();
            //console.log(audioContainerCoords);
        }
    });

    // Creates srcArray from taking the src data from the list items in the DOM.
    const tracksArray = Array.from(tracks);
    
    tracksArray.forEach(track => {
        const src = track.getAttribute('data-src');
        if (src) {
            srcArray.push(src);
        }
    });

    // Makes the song names clickable and also updates the song index e.g i.
    for (let track of tracks) {
        track.addEventListener('click', function() {
            audiosrc.src = this.getAttribute('data-src');
            audioPlayer.load();
            audioPlayer.play().catch(error => {
                console.error('Failed to play audio:', error);
            });
            i = srcArray.indexOf(track.getAttribute('data-src'));
            switchLogic(i);
        });
    }

    // Next, Previous buttons.
    const next = document.getElementById("next");
    next.addEventListener('click', nextClick);
    const previous = document.getElementById("previous");
    previous.addEventListener('click', previousClick);
    const play = document.getElementById("play");

    // Function to update the song independently of the click event, doing this inside the event has issues.
    function updateAudio() {
        audiosrc.src = srcArray[i];
        audioPlayer.load();
        audioPlayer.play().catch(error => {
            console.error('Failed to play audio:', error);
        });
	audioPlayer.addEventListener('loadedmetadata', updateDuration);
    }

    play.addEventListener('click', function() { 
        audioPlayer.play().catch(error => {
            console.error('Failed to play audio:', error);
        });
    });	
//--------------------------------Progress Bar-----------------------
    function updateProgressBar() {
  let barProgress = audioPlayer.currentTime;
  let barDuration = audioPlayer.duration;
  let barPercent = (barProgress / barDuration) *100;
  progressBar.style.width = `${barPercent}%`;
  requestAnimationFrame(updateProgressBar);
}

audioPlayer.addEventListener('play', () => {
  requestAnimationFrame(updateProgressBar);
});
//-------------------------------------------------------------------
    const stop = document.getElementById("stop");
    stop.addEventListener('click', function(){
        audioPlayer.pause();
    });

    // When the next button is clicked, move to the next song. If the current song is the last one warp around to the first song.
    function nextClick () {
        i = (i + 1) % srcArray.length;
        updateAudio();
        switchLogic(i);
    }

    // When the previous button is clicked, move to the previous song. If the current song is the first one warp around to the last song. 
    function previousClick () {
        i = (i - 1 + srcArray.length) % srcArray.length;
        updateAudio();
        switchLogic(i);
    }

    // Loads song ahead of the click events, because i update nonsense. 
    audiosrc.src = srcArray[i];
    audioPlayer.load();
    switchLogic(i);

    // Updates the image to the song, i is checked against the cases.
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
        }
    }
}






