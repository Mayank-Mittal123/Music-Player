let wrapper = document.querySelector(".wrapper"),
    musicimage = wrapper.querySelector("img"),
    musicname = wrapper.querySelector(".name"),
    musicartist = wrapper.querySelector(".artists"),
    playpausebtn = wrapper.querySelector(".play-pause"),
    prevbtn = wrapper.querySelector("#prev"),
    nextbtn = wrapper.querySelector("#next"),
    maudio = wrapper.querySelector("#m-audio"),
    progressarea = wrapper.querySelector(".progress-area"),
    progressbar = wrapper.querySelector(".progressbar"),
    start = wrapper.querySelector(".current-time"),
    end = wrapper.querySelector(".max-duration"),
    musiclist = wrapper.querySelector(".music-list"),
    menulistbtn = wrapper.querySelector("#menu-list"),
    closemusicbtn = wrapper.querySelector("#close");
    let leftbtn = document.querySelector("#leftbtn");
    console.log(leftbtn)

let musicall = [
    {
        id: "music-1",
        name: "Ami Tomake",
        artist: "MC-Headshot",
        img: "./images/Ami-tomake.jpg",
        link: "./musicname/Ami-Tomake_320(PagalWorldl).mp3"
    },
    {
        id: "music-2",
        name: "Dasi Na Mere Baare",
        artist: " Goldy Desi Crew",
        img: "./images/Dasi an mere bare.jpg",
        link: "./musicname/Dasi Na Mere Baare - Goldy Desi Crew - 320Kbps.mp3"
    },
    {
        id: "music-3",
        name: "Joker",
        artist: "Hardy Sandhu",
        img: "./images/joker.jpg",
        link: "./musicname/Joker - Hardy Sandhu (PagalWorld.com) - 320Kbps.mp3"
    },
    {
        id: "music-4",
        name: "Khaab",
        artist: "Hardy Sandhu",
        img: "./images/Khaab.jpg",
        link: "./musicname/Khaab.mp3"
    },
    {
        id: "music-5",
        name: "Tere Dil Se Na Kabhi Khelunga",
        artist: "Dharia",
        img: "./images/King.jpg",
        link: "./musicname/Tere-Dil-Se-Na-Kabhi-Khelunga_320(PaglaSongs).mp3"
    },
    {
        id: "music-6",
        name: "Tu Hai Kahan",
        artist: "Diljit Dosanjh",
        img: "./images/tu h kahan.jpg",
        link: "./musicname/Tu Hai Kahan Aur 320 Kbps.mp3"
    },
    {
        id: "music-7",
        name: "Waalian",
        artist: "Harnoor",
        img: "./images/Waalian.jpg",
        link: "./musicname/Waalian - Harnoor.mp3"
    }
];

let musicIndex = 0;
window.addEventListener("load", function () {
    loadMusic(musicIndex);
    playingSong();
})
// load Music function
function loadMusic(indexNumb) {
    musicimage.src = musicall[indexNumb].img;
    maudio.src = musicall[indexNumb].link;
    musicname.innerHTML = musicall[indexNumb].name;
    musicartist.innerHTML = musicall[indexNumb].artist;
}
// play Music function
function playMusic() {
    wrapper.classList.add("paused")
    musicimage.classList.add("rotate");
    playpausebtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    maudio.play();
}
// pause Music function
function pauseMusic() {
    wrapper.classList.remove("paused")
    musicimage.classList.remove("rotate");
    playpausebtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    maudio.pause();
}
// play or music button event
playpausebtn.addEventListener("click", function () {
    if (wrapper.classList.contains("paused")) {
        pauseMusic();
    }
    else {
        playMusic();
    }

})
//prev button event
prevbtn.addEventListener("click", function () {
    prevMusic();
})
// prev music function
function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musicall.length - 1;
    }
    loadMusic(musicIndex);
    playMusic();
}
//next button event
nextbtn.addEventListener("click", function () {
    nextMusic();
})
// next music function
function nextMusic() {
    musicIndex++;
    if (musicIndex > musicall.length - 1) {
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
}
maudio.onloadedmetadata = function () {
    //update music total duration
    progressbar.max = maudio.duration;
    progressbar.value = maudio.currentTime;

    setInterval(() => {
        let min = Math.floor(maudio.duration / 60);
        let sec = Math.floor(maudio.duration % 60);
        let curMin = Math.floor(maudio.currentTime / 60);
        let curSec = Math.floor(maudio.currentTime % 60);

        if (sec < 10) { //if sec is less than 10 then add 0 before it
            sec = "0" + sec;
        }
        if (curSec < 10) {
            curSec = "0" + curSec;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (curMin < 10) {
            curMin = "0" + curMin;
        }

        let total_duration= min + ":" + sec;
        start.innerHTML = curMin + ":" + curSec;
        if(maudio.duration){
            end.innerHTML =   `${total_duration}`;
        }
    }, 1000);
};

//  update progressbar width according to music current time
maudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressbar.style.width = `${progressWidth}%`;
});

// update playing song current width according to the progress bar width
progressarea.addEventListener("click", (e) => {
    let progressWidth = progressarea.clientWidth; //getting width of porgress bar
    let poffsetX = e.offsetX; //getting offset x value
    let songDuration = maudio.duration; //getting song total duration

    maudio.currentTime = (poffsetX / progressWidth) * songDuration;
    playMusic();
})

// When music ended
maudio.addEventListener("ended", () => {
    nextMusic();
})

// Show the music list
menulistbtn.addEventListener("click", () => {
    musiclist.classList.toggle("show");
})
leftbtn.addEventListener("click", () => {
    musiclist.classList.remove("show");
})

// Close button in music list
closemusicbtn.addEventListener("click", () => {
    menulistbtn.click();
})

const ultag = wrapper.querySelector("ul")
// create li tags according to array length for list
for (let i = 0; i < musicall.length; i++) {
    let litag = `<li  li-index="${i}">
    <div class="row">
        <span>${musicall[i].name}</span>
        <p>${musicall[i].artist}</p>
    </div>
    <audio  class="${musicall[i].id}" src="${musicall[i].link}" type="audio/mp3"></audio>
    <span id="${musicall[i].id}" class="audio-duration m-list">02:49</span>
</li>`
    ultag.insertAdjacentHTML("beforeend", litag);

    let liaudiodurationtag = ultag.querySelector(`#${musicall[i].id}`)
    let liaudiotag = ultag.querySelector(`.${musicall[i].id}`)
    liaudiotag.addEventListener("loadeddata", () => {
        let duration = liaudiotag.duration;
        let min = Math.floor(duration / 60);
        let sec = Math.floor(duration % 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        liaudiodurationtag.innerHTML = min + ":" + sec;
    })
    
}

//play particular song from the list
let litags = ultag.querySelectorAll("li")
function playingSong() {
    for (let j = 0; j < litags.length; j++) {
        let audioTag = litags[j].querySelector(".audio-duration");
        if (litags[j].classList.contains("playing")) {
            litags[j].classList.remove("playing")
            audioTag.innerHTML="";
        }
        if (litags[j].getAttribute("li-index") == musicIndex) {
            litags[j].classList.add("playing");
            audioTag.innerHTML = `<iconify-icon icon="streamline:music-equalizer" style="color: #72a2ea;" width="20" height="20"></iconify-icon>`
        }
        // adding on click attribute in all li
        litags[j].setAttribute("onclick", "clicked(this)");
    }
}

// play song on click li
function clicked(element) {
    //getting li index of particular clicked li tag
    let getliindex = element.getAttribute("li-index");
    musicIndex = getliindex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}



