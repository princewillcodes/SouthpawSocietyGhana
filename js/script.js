/* =========================
   1. MOBILE NAVIGATION
========================= */

function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('active');
}


/* =========================
   2. MAIN VIDEO PLAYER (Playlist)
   Easy to edit: just add videos
========================= */

const videoPlaylist = [
  {file: "images/video1.mp4",title: "Community Outreach Engagement"},
  {file: "images/video2.mp4",title: "World Lefties Day Celebration"},
  {file: "images/video3.mp4",title: "School Workshop Awareness"}
];

let currentVideoIndex = 0;

const player = document.getElementById('mainPlayer');
const titleLabel = document.getElementById('videoTitle');

function changeVideo(direction) {
  currentVideoIndex += direction;

  if (currentVideoIndex >= videoPlaylist.length) {
    currentVideoIndex = 0;
  }

  if (currentVideoIndex < 0) {
    currentVideoIndex = videoPlaylist.length - 1;
  }

  const nextVideo = videoPlaylist[currentVideoIndex];
  player.src = nextVideo.file;
  titleLabel.textContent = nextVideo.title;
  player.play();
}


/* =========================
   3. IMAGE GALLERY SLIDER
========================= */

const images = [
  { src: "images/gallery1.jpg", caption: "Public Advocacy Engagement" },
  { src: "images/gallery2.jpg", caption: "Public Advocacy Engagement" },
  { src: "images/gallery3.jpg", caption: "Public Advocacy Engagement" },
  { src: "images/gallery4.jpg", caption: "Meet the Team" },
  { src: "images/gallery5.jpg", caption: "School Workshop" },
  { src: "images/gallery6.jpg", caption: "School Workshop" },
  { src: "images/gallery7.jpg", caption: "School Workshop" },
  { src: "images/gallery8.jpg", caption: "Community Engagement" },
  { src: "images/gallery9.jpg", caption: "Community Engagement" }
];

let currentIndex = 0;

const slideImage = document.getElementById("slide-image");
const slideCaption = document.getElementById("slide-caption");

function updateSlide() {
  slideImage.src = images[currentIndex].src;
  slideCaption.textContent = images[currentIndex].caption;
}

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlide();
});

const dotsContainer = document.getElementById("galleryDots");

function createDots() {
  dotsContainer.innerHTML = "";
  images.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === currentIndex) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

/* Call once on load */
createDots();

/* Update dots when slide changes */
function updateSlide() {
  slideImage.src = images[currentIndex].src;
  slideCaption.textContent = images[currentIndex].caption;
  updateDots();
}

let startX = 0;

slideImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slideImage.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // Swipe left → next
      currentIndex = (currentIndex + 1) % images.length;
    } else {
      // Swipe right → prev
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
    updateSlide();
  }
});
