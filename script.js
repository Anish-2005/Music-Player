let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://c.saavncdn.com/265/Lutt-Putt-Gaya-From-Dunki-Hindi-2023-20231211171015-500x500.jpg',
        name : 'Lutt Putt Gaya',
        artist : 'Pritam, Arijit Singh, IP Singh, Swanand Kirkire',
        music : 'music/lutt.mp3'
    },
    {
        img : 'https://c.saavncdn.com/439/Nikle-The-Kabhi-Hum-Ghar-Se-From-Dunki-Hindi-2023-20231211171011-500x500.jpg',
        name : 'Nikle The Kabhi Hum Ghar Se',
        artist : 'Pritam, Sonu Nigam, Javed Akhtar',
        music : 'music/nikle.mp3'
    },
    {
        img : 'https://c.saavncdn.com/621/Banda-From-Dunki-Hindi-2023-20231218171036-500x500.jpg',
        name : 'Banda',
        artist : 'Pritam, Diljit Dosanjh, Kumaar',
        music : 'music/banda.mp3'
    },
    {
        img : 'https://www.cinejosh.com/newsimg/newsmainimg/dunki-drop-5-o-maahi-song-promo-released_b_1112230923.jpg',
        name : 'O Maahi',
        artist : 'Pritam, Arijit Singh, Irshad Kamil',
        music : 'music/o.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/3ZqkYzSnv3c/maxresdefault.jpg',
        name : 'Main Tera Rasta Dekhunga',
        artist : 'Pritam, Vishal Mishra, Shreya Ghoshal,',
        music : 'music/main.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/7p4EW7RIcl4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCRlyAFnujhCB0qIYzrHIB4uI7Row',
        name : 'Waheguru',
        artist : 'Shekhar Ravjiani, Ajay Bijli',
        music : 'music/waheguru.mp3'
    },
    {
        img : 'https://c.saavncdn.com/153/Fighter-Hindi-2024-20240123121002-500x500.jpg',
        name : 'Mitti[From "Fighter"]',
        artist : 'Suresh Wadkar, Shekhar Ravjiani ',
        music : 'music/mitti.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/YHIPqIwtNuA/sddefault.jpg',
        name : 'Vande Mataram[From "Fighter"]',
        artist : 'Vishal Dadlani, Shekhar Ravjiani',
        music : 'music/vande.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/SjjRtXbTAMw/hqdefault.jpg',
        name : 'Dil Chah Raha Hai',
        artist : 'Vishal Mishra & Shilpa Rao',
        music : 'music/dil.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/KeqdY-MDLIg/sddefault.jpg',
        name : 'Saajan Ve',
        artist : 'Darshan Raval',
        music : 'music/saajan.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/5NosYGbaOio/maxresdefault.jpg',
        name : 'Chandni Raat',
        artist : 'Ali Sethi',
        music : 'music/chandni.mp3'
    },
    {
        img : 'https://c.saavncdn.com/337/Jhumka-Oriya-2023-20231209195005-500x500.jpg',
        name : 'Jhumka',
        artist : 'Bijay Anand Sahu',
        music : 'music/jhumka.mp3'
    },
    {
        img : 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhck22fc9m-kJvz7HqCytrGu_twDcyU2r9A8ZoTBfdehKEq7dDXbNdLkc29EliONxNGA_9iyYSoNqLZwx-d3qNu7VY1C0IBlqSx7g1gaFrKIJmc6pcc9_gl9ReSvlbc2VjsSImzjjv4Qp_L1zwuO0it2Di7isej0dmlUIdGJTAHOC1mP8wudwyDWDioImk/w1200-h630-p-k-no-nu/Jiya-Tui-Chara-From-Biye-Bibhrat-Bengali-2023.jpg',
        name : 'Jiya Tui Chara',
        artist : ' Arijit Singh',
        music : 'music/jiya.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/-DPN72QhjH8/sddefault.jpg',
        name : 'Quismat ki hawa',
        artist : 'Bhagwan Dada',
        music : 'music/kismat.mp3'
    },
    {
        img : 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimveo2skonTC23au3iQ2B1Sn_NmzI7TpfcetTJDW2V2hDpgvrf43mr3wQK_jofCQHznrq-2GgGRbW-pm8H8h1kYZOdEBPLAcK2SXbPMOo6QPgB1FnuUMOcCNHoG-DP-K9uJPB1gjcRT-euM7IJ_C79Ljik-coLvLUptw_sA64vYFyOcmq1sNZ_LU7615Y/s791/dil%20baane%20waalya%20lyrics.JPG',
        name : 'Dil Banaane Waaleya',
        artist : 'Arijit Singh',
        music : 'music/dilb.mp3'
    },
]

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
