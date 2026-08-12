// ==========================================
// --- 1. MOBILE MENU TOGGLE ---
// ==========================================
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}


// ==========================================
// --- 2. THE SOUTHPAW CHALLENGE (PUZZLE) ---
// ==========================================
let puzzleState = [];
const board = document.getElementById('puzzle-board');
const winMessage = document.getElementById('win-message');

function initPuzzle() {
  if(!board) return; 
  
  if (winMessage) winMessage.classList.add('hidden');
  puzzleState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  
  for (let i = puzzleState.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [puzzleState[i], puzzleState[j]] = [puzzleState[j], puzzleState[i]];
  }
  
  if (!isSolvable(puzzleState)) {
    if (puzzleState[0] !== 0 && puzzleState[1] !== 0) {
      [puzzleState[0], puzzleState[1]] = [puzzleState[1], puzzleState[0]];
    } else {
      [puzzleState[2], puzzleState[3]] = [puzzleState[3], puzzleState[2]];
    }
  }
  
  renderPuzzle();
}

function isSolvable(state) {
  let inversions = 0;
  for (let i = 0; i < state.length - 1; i++) {
    for (let j = i + 1; j < state.length; j++) {
      if (state[i] !== 0 && state[j] !== 0 && state[i] > state[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
}

function renderPuzzle() {
  board.innerHTML = '';
  puzzleState.forEach((tileNumber, index) => {
    const tile = document.createElement('div');
    
    if (tileNumber === 0) {
      tile.className = 'w-full h-full bg-transparent rounded-lg';
    } else {
      tile.className = 'w-full h-full bg-[#e29578] text-white text-3xl font-bold flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#d17b5c] transition transform hover:scale-[0.96] shadow-sm select-none';
      tile.textContent = tileNumber;
      tile.onclick = () => moveTile(index);
    }
    board.appendChild(tile);
  });
}

function moveTile(index) {
  const emptyIndex = puzzleState.indexOf(0);
  
  const validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - 3,
    emptyIndex + 3
  ];

  if (emptyIndex % 3 === 0 && index === emptyIndex - 1) return;
  if ((emptyIndex + 1) % 3 === 0 && index === emptyIndex + 1) return;

  if (validMoves.includes(index)) {
    [puzzleState[index], puzzleState[emptyIndex]] = [puzzleState[emptyIndex], puzzleState[index]];
    renderPuzzle();
    checkWin();
  }
}

function checkWin() {
  const winningState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const isWinner = puzzleState.every((val, index) => val === winningState[index]);
  
  if (isWinner && winMessage) {
    winMessage.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', initPuzzle);


// ==========================================
// --- 3. MEDIA PAGE: GALLERY FILTERING ---
// ==========================================
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.gallery-filter-btn');

  buttons.forEach(btn => {
    btn.classList.remove('bg-[#006d77]', 'text-white');
    btn.classList.add('bg-white', 'text-gray-600');
    
    if(btn.getAttribute('onclick').includes(category)) {
      btn.classList.remove('bg-white', 'text-gray-600');
      btn.classList.add('bg-[#006d77]', 'text-white');
    }
  });

  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
      item.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
    } else {
      item.style.display = 'none';
    }
  });
}


// ==========================================
// --- 4. MEDIA PAGE: VIDEO PLAYLIST ---
// ==========================================
const videoSources = [
  "images/video1.mp4", 
  "images/video2.mp4", 
  "images/video3.mp4"
];

function playVideo(index, btnElement) {
  const player = document.getElementById('mainPlayer');
  if(!player) return;

  const source = player.querySelector('source');
  source.src = videoSources[index];
  player.load();
  player.play();

  const buttons = document.querySelectorAll('.playlist-btn');
  buttons.forEach(btn => {
    btn.classList.remove('bg-white/10', 'border-[#e29578]');
    btn.classList.add('bg-transparent', 'border-transparent');
    
    const iconContainer = btn.querySelector('.bg-black, .bg-gray-800');
    if(iconContainer) {
        iconContainer.classList.remove('bg-black');
        iconContainer.classList.add('bg-gray-800');
    }
  });

  btnElement.classList.remove('bg-transparent', 'border-transparent');
  btnElement.classList.add('bg-white/10', 'border-[#e29578]');
  
  const activeIcon = btnElement.querySelector('.bg-gray-800');
  if(activeIcon) {
      activeIcon.classList.remove('bg-gray-800');
      activeIcon.classList.add('bg-black');
  }
}


// ==========================================
// --- 5. ABOUT PAGE: GOOGLE SHEETS FORM ---
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('storyForm');
  const successBox = document.getElementById('formSuccessMessage');
  
  if (!form) return; 

  form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Submitting...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    
    // Live published Google macro endpoint connection string
    const scriptURL = 'https://script.google.com/macros/s/AKfycby-XfqP9QnO1FqljLEngmbzM90afrUaItS57XgFeolDpbMkYdMvQnYQOZ_a1bkKQgL_cw/exec';

    fetch(scriptURL, { 
      method: 'POST', 
      body: formData 
    })
    .then(response => {
      form.classList.add('hidden');
      if (successBox) successBox.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error submitting story data:', error);
      alert('Something went wrong. Please check your internet connection and try again!');
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;
    });
  });
});