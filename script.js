// getting the canvas by id

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d"); // work on 2d
const width = 1000;
const height = 150;
canvas.width = width;
canvas.height = height;

// This is use for creating a random numbers in array to bake bars with different size negative and positive

context.fillStyle = "lightPink";
let arr = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100));
for (let i = 0; i < arr.length; i = i + 9) {
  arr[i] = -arr[i];
  i++;
}
console.log(arr);
for (let i = 0; i < arr.length; i++) {
  context.fillRect(i, 100, 5, -arr[i]); // creating a reactangle in canvas with bar (size depend on random number)
  // i+5 is giving a disdance in between
  i = i + 5;
}

// getting all element by query and Id's
const musicContainer = document.querySelector(".music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");

// song titles

const songs = [
  "Kar Har Maidan Fateh",
  "Believer",
  "Soorma Anthem",
  "Pehchandi Ni",
];

// keep tract of songs which have on my music folder

let songIndex = 0;

// loading a first song by index = 0

loadSong(songs[songIndex]);

// put song details on ui

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`; // it match song with name
}

// pthis function play a song on click on play butten change the classs name to play

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

// this function pause a song on click on pause butten change the classs name to pause
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// Move to previous song by decreament the index number
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Move to the next song by increament the index number
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// updating the progress accorting to song percentage
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  console.log(progressPercent);
  progress.style.width = `${progressPercent}%`;
}

// set progress on progress bar's according to width by clicking anywhere in bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//  adding Events to envoking a functions

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);
