// Sound file
const sound = new Audio("static/mp3/bubble_pop.mp3");
const soundtrack = new Audio("static/mp3/soundtrack.mp3");
const ring = new Audio("static/mp3/ring.mp3");

const desktop = document.getElementById("desktop");

const backBtn = document.getElementById("back-btn");
const closeBtn = document.getElementById("close-btn");
const startBtn = document.getElementById("start-btn");
const closeTimerBtn = document.getElementById("close-timer-btn");

const windowElement = document.getElementById("window");

const startPage = document.getElementById("start-page");
const menuPage = document.getElementById("menu-page");
const timerPage = document.getElementById("timer-page");

const timer = document.getElementById("timer");
const timerButton = document.getElementById("timer-page-content-button");

let timerInterval;
let images = [
  "static/img/chick-1.png",
  "static/img/chick-2.png",
  "static/img/chick-3.png",
  "static/img/chick-4.png",
  "static/img/chick-3.png",
  "static/img/chick-2.png",
  "static/img/chick-1.png"
];
let currentImageIndex = 0;
const sliderImage = document.getElementById("slider-image");
let imageInterval;

desktop.addEventListener("click", () => {
  sound.play();
  soundtrack.play();
  soundtrack.loop = true;
  windowElement.style.opacity = 1;
  windowElement.style.pointerEvents = "all";

  startPage.style.display = "block";
  menuPage.style.display = "none";
  timerPage.style.display = "none";

  stopTimer();
});

closeBtn.addEventListener("click", () => {
  sound.play();
  windowElement.style.opacity = 0;
  windowElement.style.pointerEvents = "none";
  
  soundtrack.pause();
  soundtrack.currentTime = 0;
});

// Drag functionality
const titleBar = document.getElementById("title-bar");
let isDragging = false;
let offsetX, offsetY;

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - windowElement.offsetLeft;
  offsetY = e.clientY - windowElement.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    windowElement.style.left = e.clientX - offsetX + "px";
    windowElement.style.top = e.clientY - offsetY + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

backBtn.addEventListener("click", () => {
  sound.play();

  if (startPage.style.display == "none" && timerPage.style.display == "none") {
    startPage.style.display = "block";
    menuPage.style.display = "none";
    timerPage.style.display = "none";
  }
  else if (startPage.style.display == "none" && menuPage.style.display == "none") {
    startPage.style.display = "none";
    menuPage.style.display = "block";
    timerPage.style.display = "none";

    stopTimer();
  }
});

startBtn.addEventListener("click", () => {
  sound.play();
  startPage.style.display = "none";
  menuPage.style.display = "block";
});

closeTimerBtn.addEventListener("click", () => {
  startPage.style.display = "block";
  menuPage.style.display = "none";
  timerPage.style.display = "none";

  sound.play();
  stopTimer();
});

function startTimer(secs) {
  sound.play();
  ring.pause();
  ring.currentTime = 0;

  menuPage.style.display = "none";
  timerPage.style.display = "inherit";
  timer.style.display = "inherit";
  timerButton.style.display = "none";

  images = [
    "static/img/chick-1.png",
    "static/img/chick-2.png",
    "static/img/chick-3.png",
    "static/img/chick-4.png",
    "static/img/chick-3.png",
    "static/img/chick-2.png",
    "static/img/chick-1.png"
  ];

  imageInterval = setInterval(changeImage, 175);
  clearInterval(timerInterval);
  document.title = "Egg Timer";

  document.getElementById("timer-page-title").innerText = "Your egg is ready in...";
  timer.innerText = formatTime(secs);

  function updateTimer() {
    secs -= 1;

    if (secs < 0) {
      ring.play();
      ring.loop = true;
      clearInterval(timerInterval);

      images = [
        "static/img/egg-1.png",
        "static/img/egg-2.png",
        "static/img/egg-3.png",
        "static/img/egg-4.png",
        "static/img/egg-3.png",
        "static/img/egg-2.png",
        "static/img/egg-1.png"
      ];

      document.getElementById("timer-page-title").innerText = "Your egg is done!";
      document.title = "Your egg is done!- Egg Timer";
      timer.innerText = "00:00";
      timer.style.display = "none";
      timerButton.style.display = "inherit";

      return;
    }
    document.title = `Your egg is ready in ${formatTime(secs)} - Egg Timer`;
    timer.innerText = formatTime(secs);
  }

  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.title = "Egg Timer";
  ring.pause();
  ring.currentTime = 0;
  clearInterval(imageInterval);
}

function formatTime(secs) {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  sliderImage.src = images[currentImageIndex];
}