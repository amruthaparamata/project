// app.js
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const repeatButton = document.getElementById('repeatButton');
    const songList = document.getElementById('songList').getElementsByTagName('li');
    console.log(songList);
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    let shuffledIndexes = [];

    function loadSong(songIndex) {
        const songElement = songList[songIndex];
        audioPlayer.src = songElement.getAttribute('data-audio');
        currentSongIndex = songIndex;
        updateNowPlaying(songIndex);
        audioPlayer.play();
        isPlaying = true;
        playButton.textContent = 'Pause';
        
    }

    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        isPlaying = !audioPlayer.paused;
        playButton.textContent = isPlaying ? 'Pause' : 'Play';
    }

    function playNext() {
        if (isShuffle) {
            shuffleAndPlay();
        } else {
            let nextSongIndex = (currentSongIndex + 1) % songList.length;
            loadSong(nextSongIndex);
        }
    }

    function playPrev() {
        if (isShuffle) {
            shuffleAndPlay();
        } else {
            let prevSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
            loadSong(prevSongIndex);
        }
    }

    function shuffleAndPlay() {
        if (shuffledIndexes.length <= 1 || currentSongIndex === shuffledIndexes[shuffledIndexes.length - 1]) {
            // Reshuffle without the last song to avoid immediate repetition
            shuffledIndexes = [...Array(songList.length).keys()].sort(() => Math.random() - 0.5);
            if (shuffledIndexes[0] === currentSongIndex) {
                // Ensure the first song in the shuffled list is not the currently playing song
                let swapWith = shuffledIndexes.length - 1;
                [shuffledIndexes[0], shuffledIndexes[swapWith]] = [shuffledIndexes[swapWith], shuffledIndexes[0]];
            }
        }
        currentSongIndex = shuffledIndexes.shift(); // Get the first element from the shuffled list
        loadSong(currentSongIndex);
    }

    // Event listeners
    playButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', playNext);
    prevButton.addEventListener('click', playPrev);

    // Add functionality to shuffle button
    shuffleButton.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleButton.classList.toggle('active', isShuffle);

        if (isShuffle) {
            shuffleAndPlay();
        }
    });

    // Add functionality to repeat button
    repeatButton.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatButton.classList.toggle('active', isRepeat);
    });

    // This function will be called when the song has ended
    audioPlayer.addEventListener('ended', () => {
        if (isRepeat) {
            loadSong(currentSongIndex);
        } else {
            playNext();
        }
    });

    // Add click event to all songs in the song list
    for (let i = 0; i < songList.length; i++) {
        songList[i].addEventListener('click', function() {
            loadSong(parseInt(this.getAttribute('data-index'), 10));
        });
    }
    // Assuming you already have code that plays the music
function updateNowPlaying(songIndex) {
    // let songData = songsData[songIndex];
    let songData = songList[songIndex];
    let player = document.getElementById('audioPlayer');
    let nowPlayingCover = document.getElementById('nowPlayingCover');
    let nowPlayingTitle = document.getElementById('nowPlayingTitle');
    console.log(songData);
    console.log(nowPlayingCover);
    console.log(nowPlayingTitle);
    player.src = songData.getAttribute('data-audio');
    nowPlayingTitle.textContent = songData.textContent;
}


    // Load the first song by default
    loadSong(0);
});
