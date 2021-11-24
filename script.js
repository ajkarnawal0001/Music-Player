const canvas = document.getElementById("myCanvas")
const context  = canvas.getContext("2d")

const width = 1000;
const height = 200;
canvas.width = width
canvas.height= height

context.fillStyle = "lightPink"
let arr = Array.from({length: 1000}, () => Math.floor(Math.random() * 100));
for(let i=0;i<arr.length;i=i+9){
    arr[i] = -arr[i]
    i++
}
console.log(arr)
for(let i=0;i<arr.length;i++){
    context.fillRect(i,100,5,-arr[i])
    i = i+5
}
    // context.fillRect(100,10,10,100)

const musicContainer = document.querySelector('.music-container')
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// song titles

const songs = ['Pehchandi Ni','summer','Mainu Nai Pehchaandi']

// keep tract of songs

let songIndex = 0

// loading a song

loadSong(songs[songIndex])

// put song details on ui

function loadSong(song){
    title.innerText = song
    audio.src = `music/${song}.mp3`// it match song with name
}

//  Event listners

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}
function prevSong(){
    songIndex--
    if(songIndex<0){
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++
    if(songIndex > songs.length-1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

playBtn.addEventListener("click",()=>{
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    console.log(progressPercent)
    progress.style.width = `${progressPercent}%`;
  }

  function setProgress(e){
    const width = this.clientWidth;
    // console.log(width)
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width)*duration
  }
// change song next and previous

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener("click",setProgress)